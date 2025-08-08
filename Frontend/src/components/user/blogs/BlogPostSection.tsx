import React from "react";
import BlogPostCard from "./BlogPostCard";

const BlogPostsSection: React.FC = () => {
  const blogPosts = [
    {
      author: "Admin",
      date: "Mar 23, 2025",
      title: "Miracle no-knead bread",
      excerpt:
        "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading, Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....",
      image: "/assets/blog-hero-image.jpg",
      link: "/blog/miracle-no-knead-bread",
    },
    {
      author: "Admin",
      date: "Mar 20, 2025",
      title: "Corporate Wellness Strategies",
      excerpt:
        "Discover effective strategies for implementing comprehensive wellness programs in your organization that boost employee satisfaction and productivity....",
      image: "/assets/blog-hero-image.jpg",
      link: "/blog/corporate-wellness-strategies",
    },
    {
      author: "Admin",
      date: "Mar 18, 2025",
      title: "Leadership in Remote Teams",
      excerpt:
        "Learn how to effectively lead and manage remote teams with proven techniques that enhance communication and maintain team cohesion....",
      image: "/assets/blog-hero-image.jpg",
      link: "/blog/leadership-remote-teams",
    },
    {
      author: "Admin",
      date: "Mar 15, 2025",
      title: "Stress Management Techniques",
      excerpt:
        "Explore practical stress management techniques that can be easily implemented in busy work environments to improve mental health and performance....",
      image: "/assets/blog-hero-image.jpg",
      link: "/blog/stress-management-techniques",
    },
  ];

  return (
    <section className="blog-posts-section bg-gray-50 py-16 sm:py-20 lg:px-10 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="blog-posts-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Latest Blog Posts
          </h2>
          <p className="blog-posts-subheading text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest insights, tips, and strategies for
            corporate training and workplace wellness.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {blogPosts.map((post, index) => (
            <BlogPostCard
              key={index}
              index={index}
              author={post.author}
              date={post.date}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
              link={post.link}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center my-10">
          <button className="bg-gradient-to-r border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer px-16 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            ALL POSTS
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogPostsSection;
