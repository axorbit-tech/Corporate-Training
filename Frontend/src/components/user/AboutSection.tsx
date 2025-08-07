import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section className="about-section bg-white py-16 sm:py-20 lg:py-16 mx-10">
      <div className="text-center my-8">
        <span className="about-main-heading text-blue-500 font-bold text-3xl tracking-wider">
          About Us
        </span>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Side - About Us Label + Image */}
          <div className="order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              {/* About Us Label */}

              {/* Image */}
              <div className="relative">
                <img
                  src="/assets/aboutSectionImage.jpg"
                  alt="Professional handshake representing partnership and collaboration"
                  className="about-image w-xl h-auto rounded-2xl shadow-lg max-h-96 lg:max-h-[500px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6 sm:space-y-8">
              {/* Main Heading */}
              <h2 className="about-main-heading text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                We Can Support You In Achieving The Results You're Looking For.
                Together we will argue consectetur tell us
              </h2>

              {/* Subheading */}
              {/* <h3 className="about-subheading text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </h3> */}

              {/* Body Text */}
              <p className="about-body-text text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Sed ut perspiciatis unde omnis iste
                natus error sit voluptatem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
