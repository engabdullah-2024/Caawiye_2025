'use client';
import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  message: string;
  image: string;
}

interface TestimonialsPageProps {
  darkMode: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Amina Ali',
    role: 'Student',
    message:
      'Caawiye has been a game-changer for my exam prep! The resources are easy to access and incredibly helpful.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 2,
    name: 'Mohamed Yusuf',
    role: 'Student',
    message:
      'The platform’s simplicity and constant updates keep me ahead. Highly recommend for all students!',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Fatima Noor',
    role: 'Student',
    message:
      'I love how user-friendly Caawiye is. Finding PDFs for my exams was never this easy before!',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

export default function TestimonialsPage({ darkMode }: TestimonialsPageProps) {
  return (
    <section
      className={`mt-20 p-8 rounded-xl shadow-xl max-w-5xl mx-auto transition duration-700
        ${darkMode ? 'bg-gray-900 text-green-300' : 'bg-green-50 text-green-900'}
      `}
    >
      <h2 className="text-4xl font-bold mb-12 text-center">What Our Students Say</h2>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map(({ id, name, role, message, image }) => (
          <div
            key={id}
            className={`flex flex-col items-center rounded-xl p-6 shadow-md transition-colors
              ${
                darkMode
                  ? 'bg-gray-800 text-green-300 border border-green-600'
                  : 'bg-white text-green-900 border border-green-200'
              }
            `}
          >
            <img
              src={image}
              alt={name}
              className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-green-400"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-sm text-green-600 dark:text-green-400 mb-3">{role}</p>
            <p className="text-center italic leading-relaxed">"{message}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
