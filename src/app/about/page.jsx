"use client";

import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faecd2] to-white dark:from-[#1c3424] dark:to-gray-900 text-[#1c3424] dark:text-[#faecd2]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
            About Us
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Crafting a better future through innovation, passion, and collaboration.
          </p>
        </header>

        {/* Vision, Mission & Goals */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="p-6 border rounded-xl shadow-lg bg-white dark:bg-gray-800 transition transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold mb-3">Our Vision</h2>
            <p className="text-lg leading-relaxed">
              To revolutionize the job market by connecting talented professionals with the opportunities that ignite their potential.
            </p>
          </div>
          <div className="p-6 border rounded-xl shadow-lg bg-white dark:bg-gray-800 transition transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold mb-3">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              To build an intuitive platform that bridges the gap between companies and professionals, making career growth accessible to all.
            </p>
          </div>
          <div className="p-6 border rounded-xl shadow-lg bg-white dark:bg-gray-800 transition transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold mb-3">Our Goals</h2>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Empower users with innovative tools and opportunities.</li>
              <li>Continuously enhance our platform based on user feedback.</li>
              <li>Foster a community of growth, learning, and collaboration.</li>
            </ul>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Team Member 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center transition transform hover:scale-105">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Nayam Khandre"
                className="w-32 h-32 mx-auto rounded-full mb-6 border-4 border-[#a4c868]"
              />
              <h3 className="text-2xl font-semibold mb-1">Nayam Khandre</h3>
              <p className="text-lg font-medium text-[#a4c868] mb-3">Founder</p>
              <p className="text-base leading-relaxed">
                With over a decade in the industry, Nayam steers our vision and innovation, ensuring we remain ahead of the curve.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center transition transform hover:scale-105">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Nayan Somku"
                className="w-32 h-32 mx-auto rounded-full mb-6 border-4 border-[#a4c868]"
              />
              <h3 className="text-2xl font-semibold mb-1">Nayan Somku</h3>
              <p className="text-lg font-medium text-[#a4c868] mb-3">Partner</p>
              <p className="text-base leading-relaxed">
                Expert in business development, Nayan drives our strategic growth, ensuring the platform meets the evolving market demands.
              </p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center transition transform hover:scale-105">
              <img
                src="https://randomuser.me/api/portraits/men/76.jpg"
                alt="Aniket Dhurve"
                className="w-32 h-32 mx-auto rounded-full mb-6 border-4 border-[#a4c868]"
              />
              <h3 className="text-2xl font-semibold mb-1">Aniket Dhurve</h3>
              <p className="text-lg font-medium text-[#a4c868] mb-3">Partner</p>
              <p className="text-base leading-relaxed">
                With his technological expertise, Aniket crafts the technical backbone of our platform, ensuring seamless user experiences.
              </p>
            </div>
          </div>
        </section>

        <footer className="bg-[#1c3424] text-gray-300 py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 md:block flex justify-center items-center flex-col">
            <h3 className="text-2xl font-bold text-white">JobPortal</h3>
            <p className="text-gray-400">Connecting talent with opportunity.</p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
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
      </div>
    </div>
  );
}
