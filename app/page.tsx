'use client';

import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon, FiCheckCircle } from 'react-icons/fi';

type ThemeChoice = 'light' | 'dark' | 'system';

const subjects = [
  { name: 'Islamic', desc: 'Free Islamic exam PDFs for 2024', file: 'islamic.pdf' },
  { name: 'Somali', desc: 'Somali language exams and papers', file: 'Somali2024.pdf' },
  { name: 'Arabic', desc: 'Arabic subject exam PDFs for 2024', file: 'arabic.pdf' },
  { name: 'English', desc: 'English language exam papers', file: 'english.pdf' },
  { name: 'Physics', desc: 'Physics exam materials for 2024', file: 'physics.pdf' },
  { name: 'Math', desc: 'Mathematics exams and practice PDFs', file: 'Math2024.pdf' },
  { name: 'History', desc: 'History exam papers for 2024', file: 'history.pdf' },
  { name: 'Geo', desc: 'Geography exam PDFs', file: 'geo.pdf' },
  { name: 'Tech', desc: 'Technical subject exam papers', file: 'tech.pdf' },
  { name: 'Business', desc: 'Business studies exam PDFs', file: 'business.pdf' },
  { name: 'Biology', desc: 'Biology exam papers for 2024', file: 'Biology2024.pdf' },
  { name: 'Chem', desc: 'Chemistry exam PDFs and materials', file: 'chem.pdf' },
];

export default function HomePage() {
  const [downloaded, setDownloaded] = useState<string[]>([]);
  const [readSubjects, setReadSubjects] = useState<string[]>([]);
  const [themeChoice, setThemeChoice] = useState<ThemeChoice>('system');
  const [darkMode, setDarkMode] = useState(false);
  const [openedOverlay, setOpenedOverlay] = useState<string | null>(null);

  // Load theme choice from localStorage on mount
  useEffect(() => {
    const savedChoice = localStorage.getItem('caawiye-theme-choice') as ThemeChoice | null;
    if (savedChoice) {
      setThemeChoice(savedChoice);
    }
  }, []);

  // Apply theme based on choice
  useEffect(() => {
    if (themeChoice === 'system') {
      // Match system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    } else {
      setDarkMode(themeChoice === 'dark');
    }
  }, [themeChoice]);

  // Save theme choice on change
  useEffect(() => {
    localStorage.setItem('caawiye-theme-choice', themeChoice);
  }, [themeChoice]);

  const toggleTheme = () => {
    if (themeChoice === 'dark') {
      setThemeChoice('light');
    } else {
      setThemeChoice('dark');
    }
  };

  const handleDownload = (subject: string, file: string) => {
    const link = document.createElement('a');
    link.href = `/pdfs/${file}`;
    link.download = file;
    document.body.appendChild(link);

    fetch(link.href, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          link.click();
          setDownloaded((prev) => [...new Set([...prev, subject])]);
        } else {
          alert('File was not available on the site.');
        }
      })
      .catch(() => {
        alert('File was not available on the site.');
      })
      .finally(() => {
        document.body.removeChild(link);
      });
  };

  const handleRead = (subject: string) => {
    setReadSubjects((prev) => [...new Set([...prev, subject])]);
  };

  return (
    <main
      className={`min-h-screen p-6 sm:p-10 transition-colors duration-700
        ${darkMode
          ? 'bg-gray-900 text-green-400'
          : 'bg-white text-green-800'
        }`}
    >
      <div className="max-w-6xl mx-auto">

        {/* Theme Selector + Toggle */}
        <div className="flex justify-end items-center mb-6 px-4 space-x-4">
          <select
            aria-label="Choose Theme"
            value={themeChoice}
            onChange={(e) => setThemeChoice(e.target.value as ThemeChoice)}
            className={`rounded-md px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 transition
              ${darkMode
                ? 'bg-gray-800 text-green-400 focus:ring-green-600'
                : 'bg-green-50 text-green-900 focus:ring-green-500'
              }
            `}
          >
            <option value="light">Default: Light</option>
            <option value="system">System</option>
            <option value="dark">Dark</option>
          </select>

          <button
            aria-label="Toggle Theme"
            onClick={toggleTheme}
            className="p-2 rounded-full bg-green-600 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>

        {/* Welcome Section */}
        <section className="mb-10 text-center px-4">
          <h2 className={`text-3xl sm:text-4xl font-extrabold drop-shadow-md mb-3
            ${darkMode ? 'text-green-300' : 'text-green-900'}`}
          >
            Welcome to Caawiye!
          </h2>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed
            ${darkMode ? 'text-green-400' : 'text-green-700'}`}
          >
            Your trusted website dedicated to helping students easily access free exam PDFs for the year 2024. Download your preferred subject exams and prepare confidently!
          </p>
        </section>

        {/* Main Title and Subtitle */}
        <h1 className={`text-center font-extrabold mb-8
          text-4xl sm:text-5xl drop-shadow-lg
          ${darkMode ? 'text-green-300' : 'text-green-900'}`}
        >
          Caawiye
        </h1>
        <p className={`text-center mb-12 text-lg sm:text-xl font-medium
          ${darkMode ? 'text-green-400' : 'text-green-900'}`}
        >
          Helping students access <span className="underline decoration-green-600 font-semibold">2024</span> free exam PDFs
        </p>

        {/* Subject Cards */}
        <div
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6"
        >
          {subjects.map(({ name, desc, file }) => {
            const isDownloaded = downloaded.includes(name);
            const isRead = readSubjects.includes(name);
            const isOpened = openedOverlay === name;

            return (
              <div
                key={name}
                className={`bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition flex flex-col justify-between min-h-[160px]
                  ${darkMode
                    ? 'bg-gray-800 text-green-300 shadow-green-700 hover:shadow-green-600'
                    : 'bg-green-50 text-green-900 shadow-green-300 hover:shadow-green-400'
                  }
                  ${isRead ? 'border-4 border-green-600' : 'border border-transparent'}
                `}
              >
                <h3 className="font-bold text-center mb-4 text-xl sm:text-2xl flex items-center justify-center gap-2">
                  {name}
                  {isRead && <FiCheckCircle className="text-green-600" />}
                </h3>

                <div className="flex flex-col gap-3 mt-auto">
                  <button
                    onClick={() => setOpenedOverlay(name)}
                    className={`rounded-lg py-2 px-4 font-semibold shadow-md focus:outline-none focus:ring-2 transition
                      ${darkMode
                        ? 'bg-green-700 text-green-200 hover:bg-green-600 focus:ring-green-500'
                        : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-400'
                      }`}
                  >
                    View Info
                  </button>

                  <button
                    onClick={() => handleDownload(name, file)}
                    className={`rounded-lg py-2 px-4 font-semibold shadow-md focus:outline-none focus:ring-2 transition
                      ${darkMode
                        ? 'bg-green-800 text-green-200 hover:bg-green-700 focus:ring-green-500'
                        : 'bg-green-700 text-white hover:bg-green-800 focus:ring-green-500'
                      }`}
                  >
                    Download PDF
                  </button>

                  {isDownloaded && (
                    <p className="text-center text-green-600 text-sm mt-3 font-medium select-none">
                      You have downloaded this subject
                    </p>
                  )}
                </div>

                {/* Info Overlay */}
                {isOpened && (
                  <div
                    onClick={() => setOpenedOverlay(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-6 cursor-pointer"
                    aria-modal="true"
                    role="dialog"
                    aria-labelledby="overlayTitle"
                    aria-describedby="overlayDesc"
                  >
                    <div
                      className={`max-w-lg w-full bg-opacity-90 backdrop-blur-md rounded-3xl p-6 shadow-lg
                        ${darkMode ? 'bg-gray-800 text-green-300' : 'bg-green-50 text-green-900'}`}
                      onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                    >
                      <h3
                        id="overlayTitle"
                        className="text-center font-extrabold text-3xl mb-3"
                      >
                        {name}
                      </h3>
                      <p
                        id="overlayDesc"
                        className="text-center font-medium text-lg max-w-lg mx-auto"
                      >
                        {desc}
                      </p>
                      <div className="text-center mt-6">
                        <button
                          onClick={() => {
                            setOpenedOverlay(null);
                            handleRead(name);
                          }}
                          className={`rounded-lg py-2 px-6 font-semibold shadow-md focus:outline-none focus:ring-2 transition
                            ${darkMode
                              ? 'bg-green-700 text-green-200 hover:bg-green-600 focus:ring-green-500'
                              : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-400'
                            }`}
                        >
                          Mark as Read
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
