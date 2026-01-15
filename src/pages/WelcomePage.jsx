import { motion } from "framer-motion";
import { Calendar, CheckCircle, MapPin, Users } from "lucide-react";
import { Link } from "react-router";
import Button from "../components/ui/button";
import PageTransition from "../components/ui/PageTransition";
import { useInvitation } from "../hooks/useInvitation";

const WelcomePage = () => {
  const { invitation, hasFullAccess } = useInvitation();
  if (!invitation) return null;
  return (
    <PageTransition className="min-h-screen bg-wedding-black text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <p className="text-wedding-gold text-sm tracking-[0.3em] uppercase mb-6">
            Welcome
          </p>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-right">
            {invitation.groupName}
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto mb-12">
            We are so excited to celebrate with you. You have been invited to
            {hasFullAccess
              ? "our full wedding celebration"
              : "our wedding ceremony"}
            .
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition-colors">
            <Calendar className="w-8 h-8 text-wedding-gold mx-auto mb-4" />
            <h3 className="font-serif text-xl mb-2">August 24, 2024</h3>
            <p className="text-sm text-gray-400">Save the date</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition-colors">
            <MapPin className="w-8 h-8 text-wedding-gold mx-auto mb-4" />
            <h3 className="font-serif text-xl mb-2">Somewhere South</h3>
            <p className="text-sm text-gray-400">In a Church</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition-colors">
            <Users className="w-8 h-8 text-wedding-gold mx-auto mb-4" />
            <h3 className="font-serif text-xl mb-2">
              {invitation.guests.length} Guest
              {invitation.guests.length > 1 ? "s" : ""}
            </h3>
            <p className="text-sm text-gray-400">Included in this invite</p>
          </div>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.8,
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
        >
          {/* TODO - create rsvp page and route */}
          {/* <Link to='/rsvp' className="group"> */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition-colors h-full flex flex-col items-center">
            <CheckCircle className="w-8 h-8 text-wedding-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-serif text-xl mb-2">RSVP Now</h3>
            <p className="text-sm text-gray-400">Let us know if you can join</p>
          </div>
          {/* </Link> */}
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.7,
            duration: 0.8,
          }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Link to="/details">
            <Button
              variant="primary"
              size="lg"
              className="w-full md:w-auto min-w-[200px]"
            >
              View Event Details
            </Button>
          </Link>
          <Link to="/story">
            <Button
              variant="outline"
              size="lg"
              className="w-full md:w-auto min-w-[200px] border-white text-white hover:bg-white hover:text-black"
            >
              Read Our Story
            </Button>
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default WelcomePage;
