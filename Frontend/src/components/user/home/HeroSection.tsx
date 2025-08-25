import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section min-h-screen relative overflow-hidden flex items-centermb-3">
      {/* Background Image - Full Clear */}
      <div className="absolute inset-0">
        <img
          src="/assets/heroSectionImage.jpg"
          alt="Professional business woman"
          className="hero-bg-image w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen">
            {/* Left Content */}
            <div className="lg:col-span-7 xl:col-span-6 pt-16 sm:pt-20 lg:pt-0">
              <div className="rounded-2xl p-6 sm:p-8 lg:p-10max-w-2xl mx-auto lg:mx-0">
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4 sm:space-y-6">
                    <h1 className="hero-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                      Empowering Workforces
                      <br />
                      Transforming Organisation
                    </h1>

                    <p className="hero-subtext text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                      Corporate Training counselling <br />
                      Solution Tailored To Modern <br />
                      Business
                    </p>
                  </div>

                  <div className="pt-4 sm:pt-6">
                    <a
                      href="/book-session"
                      className="hero-cta-btn inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 lg:px-16 lg:py-4 rounded-2xl font-semibold text-sm sm:text-base lg:text-lg tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Book A Session
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Space for image visibility */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6">
              {/* This space allows the background image to be fully visible */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
