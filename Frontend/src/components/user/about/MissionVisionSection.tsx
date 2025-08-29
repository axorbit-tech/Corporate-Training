import React from "react";

const MissionVisionSection: React.FC = () => {
  return (
    <section className="mission-vision-section bg-white py-16 sm:py-20 lg:py-24 lg:px-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
          {/* Mission and Vision Container */}
          <div className="flex flex-col md:flex-row lg:flex-col gap-6 sm:gap-8 lg:gap-10 flex-1">
            {/* Mission Card */}
            <div className="mission-card bg-green-50 rounded-tr-4xl p-6 sm:p-8 lg:p-10 shadow-sm flex-1">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="mission-heading text-xl sm:text-2xl font-bold text-blue-500">
                  Mission
                </h3>
                <p className="mission-text text-sm sm:text-base text-gray-800 leading-relaxed text-justify">
                  Our mission is to empower professionals and organisations with
                  the right guidance, tools, and mindset to achieve lasting
                  success. We are committed to helping individuals reduce
                  stress, improve focus, and build the confidence they need to
                  excel in their roles. For businesses, our mission is to create
                  healthier workplaces that encourage collaboration,
                  accountability, and long-term growth. Through counselling,
                  training, and continuous support, we strive to make
                  professional and personal balance a reality for everyone we
                  work with.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="vision-card bg-green-50 rounded-bl-4xl p-6 sm:p-8 lg:p-10 shadow-sm flex-1">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="vision-heading text-xl sm:text-2xl font-bold text-blue-500">
                  Vision
                </h3>
                <p className="vision-text text-sm sm:text-base text-gray-800 leading-relaxed text-justify">
                  Our vision is to redefine the way companies and individuals
                  approach well-being and performance. We aim to be a trusted
                  partner in fostering positive change, where success is
                  measured not only by results but also by the well-being and
                  satisfaction of people. By combining proven strategies with a
                  people-first approach, we envision workplaces that are more
                  resilient, more productive, and more human. In this future,
                  professionals feel valued, teams work with purpose, and
                  organisations thrive with balance and integrity at their core.
                </p>
              </div>
            </div>
          </div>

          {/* Image Card */}
          <div className="image-card shadow-sm rounded-lg overflow-hidden flex-1 lg:max-w-sm">
            <img
              src="/assets/aboutpageImage3.jpg"
              alt="Urban cityscape representing our mission and vision"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
