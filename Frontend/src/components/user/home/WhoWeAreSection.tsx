const WhoWeAreSection = () => {
  return (
    <section className="bg-gray-50 py-16 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-2">
                Who We Are
              </h2>
              {/* Blue underline */}
              <div className="w-16 h-1 bg-blue-500 mx-auto mb-8"></div>

              <p className="text-gray-700 text-base leading-relaxed mb-8 text-center">
                We are a team of licensed counselors, certified mentors, and
                mental wellness experts committed to helping employees thrive —
                personally and professionally. Our programs are designed to
                reduce burnout, enhance performance, and foster a culture of
                care and support in your organization.
              </p>
            </div>

            {/* Learn More Button */}
            <div className="text-center">
              <button className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white px-12 py-4 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto">
                LEARN MORE ABOUT US
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
