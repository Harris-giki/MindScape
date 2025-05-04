import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
                MS
              </span>
              <h3 className="font-heading text-xl ml-2 text-white">
                MindScape
              </h3>
            </Link>
            <p className="text-gray-300 mb-4">
              MindScape is a digital sanctuary designed to support student
              mental health and well-being through mood tracking, shared
              experiences, and community care.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/moodboard"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  MoodBoard
                </Link>
              </li>
              <li>
                <Link
                  to="/stories"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Shared Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Help Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/community"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Peer Community
                </Link>
              </li>
              <li>
                <Link
                  to="/guides"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Self-Help Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: support@mindscape.pk</li>
              <li className="text-gray-300">Phone: +92 312 3456789</li>
              <li className="text-gray-300">Location: GIKI, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} MindScape. All rights reserved.
            </p>
            <div className="flex items-center">
              <span className="text-gray-400 text-sm mr-2">Made with</span>
              <Heart size={16} className="text-pink-400" />
              <span className="text-gray-400 text-sm ml-2">
                for students everywhere
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
