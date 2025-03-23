"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#faecd2] dark:bg-[#1c3424] px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#1c3424] dark:text-[#faecd2]">404</h1>
        <p className="mt-4 text-2xl text-[#1c3424] dark:text-[#faecd2]">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <button className="mt-8 px-6 py-3 bg-[#a4c868] hover:bg-[#1c3424] text-white font-semibold rounded-md transition-colors">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
