// app/contact/page.jsx
import { createContactAction } from "@/actions/contactActions";
import Link from "next/link";

function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-300 dark:border-gray-600 pt-8 text-center">
      <p className="text-sm mb-4">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </p>
      <a
        href="/"
        className="inline-block px-8 py-3 bg-[#a4c868] hover:bg-[#1c3424] text-white font-semibold rounded-md transition-colors"
      >
        Back to Home
      </a>
    </footer>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faecd2] to-white dark:from-[#1c3424] dark:to-gray-900 text-[#1c3424] dark:text-[#faecd2] flex flex-col">
      <div className="max-w-4xl mx-auto px-4 py-16 flex-grow">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">
            We’d love to hear from you. Drop us a message and we'll get back soon!
          </p>
        </header>

        {/* Contact Form using the server action */}
        <form
          action={createContactAction}
          method="POST"
          className="space-y-6 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 p-8 rounded-lg shadow-lg"
        >
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a4c868] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a4c868] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a4c868] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-[#a4c868] hover:bg-[#1c3424] text-white font-semibold rounded-md transition-colors"
          >
            Send Message
          </button>
        </form>

        {/* Additional Contact Details */}
        <div className="mt-12 text-center">
          <p className="text-lg">
            Or email us at{" "}
            <a
              href="mailto:info@example.com"
              className="underline hover:text-[#1c3424] dark:hover:text-[#faecd2]"
            >
              info@example.com
            </a>
          </p>
        </div>
      </div>

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
  );
}
