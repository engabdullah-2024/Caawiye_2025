'use client';
import React from 'react';
import { FiCheckCircle, FiSettings, FiTrendingUp } from 'react-icons/fi';

interface OurServicesPageProps {
  darkMode: boolean;
}

export default function OurServicesPage({ darkMode }: OurServicesPageProps) {
  return (
    <section
      className={`mt-20 p-8 rounded-xl shadow-xl transition duration-700 max-w-4xl mx-auto
        ${darkMode ? 'bg-gray-800 text-green-300' : 'bg-green-100 text-green-900'}
      `}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex items-start gap-4">
          <FiCheckCircle size={32} className="flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold mb-1">Reliable Exam PDFs</h3>
            <p>Access a wide collection of verified and free exam PDFs for 2024.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FiSettings size={32} className="flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold mb-1">User-Friendly Platform</h3>
            <p>Easy to navigate and download the materials you need.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FiTrendingUp size={32} className="flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold mb-1">Continuous Updates</h3>
            <p>We keep our resources updated for every academic year.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
