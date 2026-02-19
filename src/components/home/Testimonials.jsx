import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";

const Testimonials = () => {
    const testimonials = [
        {
          id: 1,
          name: "Rahul Sharma",
          role: "CMA Final, Rank 12",
          company: "Manufacturing & Costing Professional",
          content:
            "The structured evaluation system and expert feedback helped me clearly identify my weak areas. The detailed analysis, practical suggestions, and exam-focused approach played a major role in my CMA Final success.",
          rating: 5,
          avatar: "RS",
          color: "green",
        },
        {
          id: 2,
          name: "Priya Patel",
          role: "CMA Intermediate, Group I Topper",
          company: "Articleship Student",
          content:
            "The structured evaluation system and expert feedback helped me clearly identify my key weak areas. The detailed analysis, practical suggestions, and exam-focused approach played a major role in my CMA preparation journey.",
          rating: 5,
          avatar: "PP",
          color: "purple",
        },
        {
          id: 3,
          name: "Amit Kumar",
          role: "CMA Foundation Student",
          company: "Commerce Undergraduate",
          content:
            "The structured evaluation system and expert feedback helped me clearly identify my weak areas. The detailed analysis, practical suggestions, and exam-focused approach made learning simple and effective for beginners.",
          rating: 5,
          avatar: "AK",
          color: "emerald",
        },
        {
          id: 4,
          name: "Dr. Neha Gupta",
          role: "CMA Faculty & Paper Evaluator",
          company: "15+ Years Academic Experience",
          content:
            "The structured evaluation system and expert feedback helped students clearly identify their weak areas. The detailed analysis, practical suggestions, and exam-focused approach ensure systematic and continuous improvement.",
          rating: 5,
          avatar: "NG",
          color: "pink",
        },
        {
          id: 5,
          name: "Sanjay Mehta",
          role: "Parent of CMA Aspirant",
          company: "Chartered Accountant",
          content:
            "The structured evaluation system and expert feedback helped my child clearly identify weak areas. The detailed analysis, practical suggestions, and exam-focused approach gave us confidence in her preparation journey.",
          rating: 5,
          avatar: "SM",
          color: "orange",
        },
        {
          id: 6,
          name: "Anjali Desai",
          role: "Working Professional & CMA Aspirant",
          company: "Finance Manager – FMCG Sector",
          content:
            "The structured evaluation system and expert feedback helped me clearly identify my weak areas. The detailed analysis, practical suggestions, and exam-focused approach made balancing work and studies much easier.",
          rating: 5,
          avatar: "AD",
          color: "indigo",
        },
      ];
      

  const colorMap = {
    blue: "from-[#137952]/80 to-[#137952]",
    purple: "from-purple-500 to-purple-600",
    emerald: "from-emerald-500 to-emerald-600",
    pink: "from-pink-500 to-pink-600",
    orange: "from-orange-500 to-orange-600",
    indigo: "from-indigo-500 to-indigo-600",
  };

  return (
    <section className="py-20  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#137952]/10 rounded-full mb-4">
            <span className="text-[#137952] text-sm font-medium">
              Success Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by 10,000+ CMA Aspirants
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our students, parents, and industry experts about their
            transformative learning experiences.
          </p>
        </div>

        {/* Continuous Carousel */}
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          speed={6000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1.1 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
          className="pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white rounded-2xl border border-gray-200  p-6 transition-shadow duration-300 h-full">

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "{t.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${
                      colorMap[t.color]
                    } rounded-full flex items-center justify-center text-white font-bold mr-4`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-600">{t.role}</div>
                    {t.company && (
                      <div className="text-xs text-gray-500">{t.company}</div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

     

      </div>
    </section>
  );
};

export default Testimonials;
