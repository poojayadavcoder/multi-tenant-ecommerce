import React from "react";
import {
  Send,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}
          <div>
            <h2 className="text-2xl font-bold">
              Zoka Market
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              We provide reliable services and solutions to help
              our customers achieve their goals.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex gap-4">

              <a
                href="#"
                className="rounded-full bg-gray-800 p-2 text-gray-400 transition hover:bg-gray-700 hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="#"
                className="rounded-full bg-gray-800 p-2 text-gray-400 transition hover:bg-gray-700 hover:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="#"
                className="rounded-full bg-gray-800 p-2 text-gray-400 transition hover:bg-gray-700 hover:text-white"
                aria-label="X"
              >
                <FaXTwitter size={20} />
              </a>

              <a
                href="#"
                className="rounded-full bg-gray-800 p-2 text-gray-400 transition hover:bg-gray-700 hover:text-white"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="/"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/dashboard/customer/cart"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Cart
                </a>
              </li>

              <li>
                <a
                  href="/dashboard/customer/order"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  My Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Policies */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Policies
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="/dashboard/customer/privacy-policy"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="/dashboard/customer/terms-and-conditions"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="/dashboard/customer/shipping-policy"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Shipping Policy
                </a>
              </li>

              <li>
                <a
                  href="/dashboard/customer/refund-policy"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact Us
            </h3>

            <ul className="mt-4 space-y-4">

              <li className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="mt-0.5 shrink-0 text-gray-400"
                />

                <span className="text-sm text-gray-400">
                  Jaipur, Rajasthan, India
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone
                  size={20}
                  className="shrink-0 text-gray-400"
                />

                <a
                  href="tel:+919999999999"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  +91 7410903250
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail
                  size={20}
                  className="shrink-0 text-gray-400"
                />

                <a
                  href="mailto:example@gmail.com"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  py5825590@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Send
                  size={20}
                  className="shrink-0 text-gray-400"
                />

                <a
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Send us a message
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">
              © {currentYear} Zoka Market. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;