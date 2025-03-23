"use client";

import { Fragment } from "react";
import HomepageButtonControls from "@/components/homepage-button-controls";
import Slider from "react-slick";

// Import slick-carousel CSS files
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Slider settings for react-slick
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};

export default function HomeContent({ user, profileInfo }) {
  return (
    <Fragment>
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Light overlay in light mode, secondary color overlay in dark mode */}
        <div className="absolute inset-0 bg-black opacity-60 dark:bg-[#1c3424] dark:opacity-80"></div>
        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between h-full px-6 lg:px-20">
          <div className="w-full lg:w-1/2 text-center lg:text-left text-white space-y-6">
            <h2 className="text-xl font-light tracking-wide uppercase">
              One Stop Solution to Find Jobs
            </h2>
            <h1 className="text-4xl lg:text-7xl font-extrabold leading-tight">
              Build Your Best Job Community Today.
            </h1>
            <div className="mt-6">
              <HomepageButtonControls user={user} profileInfo={profileInfo} />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Job Opportunities"
              className="rounded-lg shadow-2xl object-cover max-h-96"
            />
          </div>
        </div>
      </section>

      {/* Featured Jobs / Slider Section */}
      <section className="py-16 bg-gradient-to-r from-[#faecd2] to-[#a4c868] dark:from-[#1c3424] dark:to-[#a4c868]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Featured Jobs
          </h2>
          <Slider {...sliderSettings}>
            <div className="px-4">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Job Opportunity 1"
                className="w-full h-72 object-cover rounded-xl shadow-md"
              />
            </div>
            <div className="px-4">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Job Opportunity 2"
                className="w-full h-72 object-cover rounded-xl shadow-md"
              />
            </div>
            <div className="px-4">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Job Opportunity 3"
                className="w-full h-72 object-cover rounded-xl shadow-md"
              />
            </div>
          </Slider>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#faecd2] dark:bg-[#1c3424] rounded-xl shadow-lg p-8">
              <p className="text-gray-600 dark:text-gray-300 italic">
                "This job portal has completely transformed the way I search and apply for jobs. Fantastic experience!"
              </p>
              <p className="mt-4 font-bold text-gray-800 dark:text-white">- Alex D.</p>
            </div>
            <div className="bg-[#faecd2] dark:bg-[#1c3424] rounded-xl shadow-lg p-8">
              <p className="text-gray-600 dark:text-gray-300 italic">
                "A seamless solution for employers and job seekers alike. I love the intuitive interface!"
              </p>
              <p className="mt-4 font-bold text-gray-800 dark:text-white">- Maria S.</p>
            </div>
            <div className="bg-[#faecd2] dark:bg-[#1c3424] rounded-xl shadow-lg p-8">
              <p className="text-gray-600 dark:text-gray-300 italic">
                "I landed my dream job using this portal. The process is quick, secure, and efficient."
              </p>
              <p className="mt-4 font-bold text-gray-800 dark:text-white">- John K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Cards Section */}
      <section className="py-16 bg-gradient-to-r from-[#faecd2] to-[#a4c868] dark:from-[#1c3424] dark:to-[#a4c868]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Post Jobs Easily
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our intuitive platform simplifies job postings, ensuring you reach the right candidates.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Apply with Confidence
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enjoy a secure, streamlined application process designed for your success.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Connect with Top Companies
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Build meaningful connections with industry leaders and secure your dream career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#1c3424] text-gray-300 py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-white">JobPortal</h3>
            <p className="text-gray-400">Connecting talent with opportunity.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="/about" className="hover:text-white transition-colors">
              About Us
            </a>
            <a href="/contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-500">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>
      </footer>
    </Fragment>
  );
}
