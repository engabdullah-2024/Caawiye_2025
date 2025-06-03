'use client';
import React from 'react';

interface AboutPageProps {
  darkMode: boolean;
}

export default function AboutPage({ darkMode }: AboutPageProps) {
  return (
    <section
      className={`mt-20 p-6 rounded-xl shadow-xl transition duration-700
        ${darkMode ? 'bg-gray-800 text-green-300' : 'bg-green-100 text-green-900'}
      `}
    >
      <h2 className="text-3xl font-bold mb-4 text-center">About Caawiye</h2>
      <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
        Caawiye is a student-friendly platform that offers free access to exam PDFs
        for 2024 across a variety of subjects. We aim to support students in
        their academic journey with easy access to study materials.
      </p>
    </section>
  );
}
