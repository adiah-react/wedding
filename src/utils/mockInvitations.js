export const MOCK_INVITATIONS = [
  {
    code: "WED2026",
    groupName: "The Smith Family",
    accessLevel: "full",
    guests: [
      { id: "1", name: "John Smith", rsvpStatus: "pending" },
      { id: "2", name: "Jane Smith", rsvpStatus: "pending" },
    ],
  },
  {
    code: "CEREMONY",
    groupName: "Sarah Jones",
    accessLevel: "ceremony",
    guests: [{ id: "3", name: "Sarah Jones", rsvpStatus: "pending" }],
  },
  {
    code: "VIPGUEST",
    groupName: "James Wilson & Partner",
    accessLevel: "full",
    guests: [
      { id: "4", name: "James Wilson", rsvpStatus: "pending" },
      { id: "5", name: "Guest", rsvpStatus: "pending" },
    ],
  },
];

export const validateInvitationCode = (code) => {
  const normalizedCode = code.trim().toUpperCase();
  return MOCK_INVITATIONS.find((inv) => inv.code === normalizedCode) || null;
};
