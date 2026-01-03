import {
  Code,
  ExternalLink,
  Github,
  Heart,
  Linkedin,
  Mail,
  Shield,
  Users,
} from "lucide-react";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github size={20} />,
      label: "GitHub",
      href: "https://github.com/rubaiyatxeren",
      color: "hover:text-gray-800 dark:hover:text-gray-300",
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      href: "https://linkedin.com/company/jobhub",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      href: "mailto:info.ygstudiobd@gmail.com",
      color: "hover:text-red-500 dark:hover:text-red-400",
    },
  ];

  const quickLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "API Documentation", href: "/api-docs" },
    { label: "Report Issue", href: "/report-issue" },
  ];

  const technologies = ["React", "Tailwind CSS", "Remotive API", "Context API"];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Code size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  JobHub
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Professional Job Portal
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Connecting talented professionals with remote opportunities
              worldwide. Find your dream job today.
            </p>
            <div className="flex items-center gap-3">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ExternalLink size={20} />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-blue-500 transition-colors"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users size={20} />
              Connect With Us
            </h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all ${social.color} hover:shadow-lg hover:-translate-y-1`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Shield size={16} />
                <span className="text-sm">
                  Trusted by 10,000+ job seekers worldwide
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              © {currentYear} JobHub. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Made with{" "}
              <Heart
                size={14}
                className="inline text-red-500 animate-pulse"
                aria-label="love"
              />{" "}
              by{" "}
              <a
                href="https://github.com/yourusername"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                eRubaiyat
              </a>
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                Jobs Listed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                95%
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                User Satisfaction
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                Job Updates
              </div>
            </div>
          </div>

          {/* Version */}
          <div className="text-center md:text-right">
            <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-full">
              v2.1.0
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Built with React 19.2 • Updated weekly
            </p>
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Job data provided by{" "}
            <a
              href="https://remotive.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Remotive.io API
            </a>
            . Icons by{" "}
            <a
              href="https://lucide.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Lucide
            </a>
            .
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            This project is open source. Feel free to contribute!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
