'use client';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaTelegram,
} from 'react-icons/fa';

interface ContactPageProps {
  darkMode: boolean;
}

export default function ContactPage({ darkMode }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [sending, setSending] = useState(false);
  const [resultMsg, setResultMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResultMsg('');

    emailjs.send(
      'service_ztozqxh',
      'template_c06ycsp',
      formData,
      '6nbY0x5vkTOwEohEU'
    ).then(
      () => {
        setSending(false);
        setResultMsg('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      },
      (error) => {
        setSending(false);
        setResultMsg('Failed to send message. Please try again later.');
        console.error('EmailJS error:', error);
      }
    );
  };

  // Common input styles + mode-specific classes
  const inputClasses = `w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400
    ${darkMode ? 'bg-gray-700 text-green-200 border-gray-600 placeholder-green-400' : 'bg-white text-green-900 border-green-400 placeholder-green-600'}
  `;

  return (
    <section
      className={`mt-20 p-6 rounded-xl shadow-xl transition duration-700
        ${darkMode ? 'bg-gray-800 text-green-300' : 'bg-green-100 text-green-900'}
      `}
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Contact Me</h2>

      {/* Contact Info */}
      <div className="text-lg text-center space-y-3 mb-8">
        <div className="flex justify-center items-center space-x-3">
          <FaPhoneAlt />
          <span>+252 613169435</span>
        </div>
        <div className="flex justify-center items-center space-x-3">
          <FaEnvelope />
          <span>enga95311@gmail.com</span>
        </div>
        <div className="flex justify-center space-x-5 text-2xl pt-3">
          <a href="https://github.com/engabdullah-2024" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://t.me/yourTelegramUsername" target="_blank" rel="noopener noreferrer">
            <FaTelegram />
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputClasses}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputClasses}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          className={inputClasses}
        />
        <button
          type="submit"
          disabled={sending}
          className={`w-full py-3 rounded-lg font-semibold transition duration-300
            ${darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-500 text-white hover:bg-green-600'}
            ${sending ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {sending ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* Result Message */}
      {resultMsg && (
        <p className="text-center mt-4 font-semibold">
          {resultMsg}
        </p>
      )}
    </section>
  );
}
