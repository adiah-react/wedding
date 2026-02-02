// INVITATION SERVICES

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

const INVITATIONS_COLLECTION = "invitations";

export const validateInvitationCode = async (code) => {
  try {
    const normalizedCode = code.trim().toUpperCase();
    const docRef = doc(db, INVITATIONS_COLLECTION, normalizedCode);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { code: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error validating invitation code:", error);
    return null;
  }
};

export const getAllInvitations = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, INVITATIONS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      code: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return [];
  }
};

export const createInvitation = async (invitation) => {
  try {
    const docRef = doc(db, INVITATIONS_COLLECTION, invitation.code);
    await setDoc(docRef, {
      ...invitation,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error("Error creating invitation:", error);
    return false;
  }
};

export const updateInvitationRSVP = async (code, guestRSVPs) => {
  try {
    const docRef = doc(db, INVITATIONS_COLLECTION, code);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return false;

    const invitation = docSnap.data();
    const updatedGuests = invitation.guests.map((guest) => {
      const update = guestRSVPs.find((r) => r.guestId === guest.id);
      if (update) {
        return {
          ...guest,
          rsvpStatus: update.status,
          dietaryNotes: update.dietaryNotes,
        };
      }
      return guest;
    });

    await updateDoc(docRef, {
      guests: updatedGuests,
      updatedAt: Timestamp.now(),
    });

    return true;
  } catch (error) {
    console.error("Error updating RSVP:", error);
    return false;
  }
};

export const deleteInvitation = async (code) => {
  try {
    await deleteDoc(doc(db, INVITATIONS_COLLECTION, code));
    return true;
  } catch (error) {
    console.error("Error deleting invitation:", error);
    return false;
  }
};

// GUESTBOOK SERVICES
const GUESTBOOK_COLLECTION = "guestbook";

export const getGuestbookMessages = async () => {
  try {
    const q = query(
      collection(db, GUESTBOOK_COLLECTION),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
    }));
  } catch (error) {
    console.error("Error fetching guestbook messages:", error);
    return [];
  }
};

export const addGuestbookMessage = async (guestName, message) => {
  try {
    const docRef = await addDoc(collection(db, GUESTBOOK_COLLECTION), {
      guestName,
      message,
      createdAt: Timestamp.now(),
    });

    return {
      id: docRef.id,
      guestName,
      message,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error adding guestbook message:", error);
    return null;
  }
};

export const subscribeToGuestbook = (callback) => {
  const q = query(
    collection(db, GUESTBOOK_COLLECTION),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
    }));
    callback(messages);
  });
};

// HONEYMOON FUND SERVICES

const HONEYMOON_ITEMS_COLLECTION = "honeymoonItems";
const CONTRIBUTIONS_COLLECTION = "contributions";

export const getHoneymoonItems = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, HONEYMOON_ITEMS_COLLECTION),
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching honeymoon items:", error);
    return [];
  }
};

export const getContributions = async () => {
  try {
    const q = query(
      collection(db, CONTRIBUTIONS_COLLECTION),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
    }));
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return [];
  }
};

export const addContribution = async (itemId, guestName, amount, message) => {
  try {
    // Add contribution record
    const docRef = await addDoc(collection(db, CONTRIBUTIONS_COLLECTION), {
      itemId,
      guestName,
      amount,
      message: message || "",
      createdAt: Timestamp.now(),
    });

    // Update honeymoon item's current amount
    const itemRef = doc(db, HONEYMOON_ITEMS_COLLECTION, itemId);
    await updateDoc(itemRef, { currentAmount: increment(amount) });

    return {
      id: docRef.id,
      itemId,
      guestName,
      amount,
      message,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error adding contribution:", error);
    return null;
  }
};

export const subscribeToHoneymoonItems = (callback) => {
  return onSnapshot(
    collection(db, HONEYMOON_ITEMS_COLLECTION),
    (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(items);
    },
  );
};

// ADMIN AUTHENTICATION SERVICES

export const adminLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error("Admin login error:", error);
    return null;
  }
};

export const adminLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Admin logout error:", error);
  }
};

export const subscribeToAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};
