import { Clock, Info, Lock, MapPin } from "lucide-react";
import Button from "../components/ui/Button";
import PageTransition from "../components/ui/PageTransition";
import ScrollReveal from "../components/ui/ScrollReveal";

const EventDetails = () => {
  // TODO: check authentication status
  return (
    <PageTransition className="bg-white txt-wedding-black pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            Event Details
          </h1>
          <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
            We are honored to have you join us. Here is everything you need to
            know about our special day.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 relative">
          {/* Vertical Divider (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2"></div>

          {/* Ceremony */}
          <div className="md:pr-16 text-center md:text-right">
            <ScrollReveal delay={0.2}>
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-wedding-black mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-serif mb-2">The Ceremony</h2>
              <p className="text-wedding-gold font-medium uppercase tracking-widest text-sm mb-6">
                4:00 PM
              </p>

              <div className="space-y-4 text-gray-600 font-light text-lg">
                <p className="font-medium text-black">
                  {/* TODO */}
                  Name of the Church
                </p>
                <p>Address 1</p>
                <p>Address 2</p>
                <div className="pt-4">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-wedding-black hover:text-wedding-gold transition-colors border-b border-black hover:border-wedding-gold pb-0 5"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View Map
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Reception - Conditional Rendering */}
          <div className="md:pl-16 text-center md:text-left">
            <ScrollReveal delay={0.4}>
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-wedding-black mb-6">
                <Info className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-serif mb-2">The Reception</h2>
              <p className="text-wedding-gold font-medium uppercase tracking-widest text-sm mb-6">
                6:00 PM - Midnight
              </p>

              {/* TODO - Check for authentication */}
              <div className="bg-gray-50 p-8 rounded-sm border border-gray-100 flex flex-col items-center">
                <Lock className="w-6 h-6 text-gray-400 mb-3" />
                <p className="text-gray-900 font-medium mb-2">
                  Private Event Details
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Please enter your invitation code to view reception details.
                </p>
                {/* TODO - link to invite page */}
                {/* <Link to="/invite"> */}
                <Button variant="outline" size="sm">
                  Unlock Access
                </Button>
                {/* </Link> */}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Additional Info */}
        <ScrollReveal
          delay={0.6}
          className="mt-24 max-w-2xl mx-auto text-center bg-gray-50 p-12 rounded-sm"
        >
          <h3 className="text-2xl font-serif mb-4">Dress Code</h3>
          <p className="text-gray-600 text-lg font-light mb-8">
            Black Tie Optional. We ask that men wear tuxedos or dark suits and
            women wear evening gowns or cocktail dresses.
          </p>

          <h3 className="text-2xl font-serif mb-4">Accomodations</h3>
          <p className="text-gray-600 text-lg font-light">
            A block of rooms has been reserved at the Grand Budapest Hotel.
            Please mention the "Aaron-Gupte Wedding" when booking.
          </p>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
};

export default EventDetails;
