import { Calendar, Coffee, Diamond, Heart } from "lucide-react";
import PageTransition from "../components/ui/PageTransition";
import ScrollReveal from "../components/ui/ScrollReveal";

const milestones = [
  {
    id: 1,
    title: "First Met",
    date: "Summer 2018",
    description:
      "It started with a chance encounter at a mutual friend's gallery opening. A conversation about abstract art turned into hours of talking about everything under the sun.",
    icon: <Heart className="w-6 h-6 text-white" />,
  },
  {
    id: 2,
    title: "First Date",
    date: "Fall 2018",
    description:
      "We met for coffee at The Daily Press. One cup turned into three, and before we knew it, the shop was closing. We walked through the park until sunset.",
    icon: <Coffee className="w-6 h-6 text-white" />,
  },
  {
    id: 3,
    title: "The Proposal",
    date: "Winter 2023",
    description:
      "Under the snowy lights of the city where we first met, James got down on one knee. It was the easiest 'Yes' of Sarah's life.",
    icon: <Diamond className="w-6 h-6 text-white" />,
  },
  {
    id: 4,
    title: "The Big Day",
    date: "Summer 2024",
    description:
      "We can't wait to celebrate the beginning of our forever with all of our favorite people. The best is yet to come.",
    icon: <Calendar className="w-6 h-6 text-white" />,
  },
];

const OurStory = () => {
  return (
    <PageTransition className="bg-white text-wedding-black pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Our Story</h1>
          <div className="w-24 h-0.5 bg-wedding-gold mx-auto"></div>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200 hidden md:block"></div>

          <div className="space-y-24">
            {milestones.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                } gap-8 md:gap-0`}
              >
                {/* Content Side */}
                <div className="flex-1 w-full md:w-1/2 p-0 md:px-12 text-center md:text-left">
                  <ScrollReveal delay={0.2}>
                    <div
                      className={`flex flex-col ${
                        index % 2 === 0 ? "md:items-start" : "md:items-end"
                      }`}
                    >
                      <span className="text-wedding-gold font-medium tracking-widest uppercase text-sm mb-2 block">
                        {item.date}
                      </span>
                      <h3 className="text-3xl font-serif mb-4">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed font-light text-lg">
                        {item.description}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Center Icon (Desktop only) */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-wedding-black rounded-full items-center justify-center z-10 border-4 border-white shadow-lg">
                  {item.icon}
                </div>

                {/* Image Side */}
                <div className="flex-1 w-full md:w-1/2 flex justify-center">
                  <ScrollReveal delay={0.4}>
                    <div className="relative group overflow-hidden rounded-sm shadow-xl">
                      <div className="w-full md:w-[400px] h-[300px] bg-gray-100 relative overflow-hidden">
                        {/* TODO - Place holder for actual images with black & white filter */}
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 filter-bw">
                          <span className="font-serif italic">
                            Photo: {item.title}
                          </span>
                        </div>

                        {/* Overlay Effect */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>

                        {/* Decorative border */}
                        <div className="absolute inset-4 border border-white/30 pointer-events-none"></div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default OurStory;
