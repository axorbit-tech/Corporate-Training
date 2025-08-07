import React from 'react'

const MissionVisionSection: React.FC = () => {
  return (
    <section className="mission-vision-section bg-white py-16 sm:py-20 lg:py-24 lg:px-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          
          {/* Mission Card */}
          <div className="mission-card bg-green-50 rounded-tr-4xl p-6 sm:p-8 lg:p-10 shadow-sm h-[350px] sm:h-[400px] lg:h-[450px]">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="mission-heading text-xl sm:text-2xl font-bold text-blue-500">
                Mission
              </h3>
              <p className="mission-text text-sm sm:text-base text-gray-800 leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit
                <br />
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="vision-card bg-green-50 rounded-bl-4xl p-6 sm:p-8 lg:p-10 shadow-sm h-[350px] sm:h-[400px] lg:h-[450px]">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="vision-heading text-xl sm:text-2xl font-bold text-blue-500">
                Vision
              </h3>
              <p className="vision-text text-sm sm:text-base text-gray-800 leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit
              <br />
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit
             
              </p>
            </div>
          </div>

          {/* Image Card */}
          <div className="image-card md:col-span-2 lg:col-span-1 overflow-hidden shadow-sm h-[350px] sm:h-[400px] lg:h-[450px]">
            <img
              src="/assets/aboutpageImage3.jpg"
              alt="Urban cityscape representing our mission and vision"
              className="mission-vision-image w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionVisionSection