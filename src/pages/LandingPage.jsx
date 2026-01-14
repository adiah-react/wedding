import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import CountdownTimer from "../components/ui/CountdownTimer";
import PageTransition from "../components/ui/PageTransition";
const LandingPage = () => {
  // Wedding date: June 20, 2026
  const weddingDate = new Date("2026-06-20T16:00:00");

  return (
    <PageTransition className="bg-wedding-black text-white">
      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative px-4 overflow-hidden">
        {/* Background Elements - Subtle texture or gradient could go here */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50" />

        <div className="z-10 text-center space-y-8 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-wedding-grey text-lg md:text-xl italic font-serif tracking-wide"
          >
            &quot;Twho souls, one heart&quot;
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight leading-none"
          >
            Rhiannon{" "}
            <span className="text-wedding-gold text-4xl md:text-6xl align-middle mx-2">
              &
            </span>{" "}
            Rashaad
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center space-y-6"
          >
            <p className="text-wedding-grey text-xl tracking-[0.2em] uppercase font-light">
              June 20, 2026 &bull; San Fernando?
            </p>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pt-4"
            >
              <CountdownTimer targetDate={weddingDate} />
            </motion.div>

            <div className="pt-8">
              {/* <Link to="/details">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  Event Details
                </Button>
              </Link> */}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow"
        >
          <ChevronDown className="text-wedding-grey w-8 h-8 opacity-70" />
        </motion.div>
      </section>

      {/* Introduction / Teaser Section */}
      <section className="py-24 px-6 bg-white text-wedding-black">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              We're Getting Married
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              We invite you to join us as we celebrate our love and new
              beginning. Please join us for an evening of romance, laughter and
              joy.
            </p>
            <div className="mt-10">
              {/* <Link to="/story">
                <Button variant="secondary">Read Our Story</Button>
              </Link> */}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default LandingPage;
