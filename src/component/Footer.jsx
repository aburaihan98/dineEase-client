import { Link } from "react-router";
import Fb from "../assets/image/fb.png";
import Ins from "../assets/image/ins.jpeg";
import Twitter from "../assets/image/twitter.png";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-lg font-semibold mb-2 text-center">DineEase</p>
            <p className="text-sm text-center md:text-left">
              The best restaurant management platform for{" "}
              <br className=" block lg:hidden" /> efficient ordering, managing,
              and delivery systems.
            </p>
          </div>
          {/* Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mt-6 md:mt-0">
            <div>
              <p className="font-bold mb-2">Quick Links</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-green-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/all-foods" className="hover:text-green-500">
                    All Foods
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-green-500">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <p className="font-bold mb-2">Contact Info</p>
              <ul className="space-y-2">
                <li>
                  <p className="text-sm">
                    Email:{" "}
                    <a
                      href="mailto:support@dineease.com"
                      className="hover:text-green-500"
                    >
                      support@dineease.com
                    </a>
                  </p>
                </li>
                <li>
                  <p className="text-sm">
                    Phone:{" "}
                    <span className="hover:text-green-500">(123) 456-7890</span>
                  </p>
                </li>
                <li>
                  <p className="text-sm">
                    Address: 123 Restaurant St, Food City
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center  space-x-6 mt-6 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Fb}
                alt="Facebook"
                className="w-6 h-6 hover:text-green-500"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Twitter}
                alt="Twitter"
                className="w-6 h-6 hover:text-green-500"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Ins}
                alt="Instagram"
                className="w-6 h-6 hover:text-green-500"
              />
            </a>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>&copy; 2024 DineEase. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
