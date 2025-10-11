import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
// import { useAuth } from '@/utils/types';

const Footer: React.FC = () => {
//   const { userRole } = useAuth()
const userRole="user";
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">Digital banking</h2>
          <p className="text-sm text-purple-100">
            Your trusted companion for Digital banking.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            {/* {userRole === "admin" && (
            <li><Link to="/home" className="hover:underline">Home</Link></li>)} */}
            {userRole === "user" && (
              <>
            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            <li><Link to="/summary" className="hover:underline">Account Summary</Link></li>
            {/* <li><Link to="/investments" className="hover:underline">Investments</Link></li>
            <li><Link to="/reports" className="hover:underline">Reports</Link></li>
            <li><Link to="/calculator" className="hover:underline">Roi Calculator</Link></li>
            <li><Link to="/alerts" className="hover:underline">Alerts</Link></li> */}
            </>)}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <p className="text-sm text-purple-100 mb-4">
            42 Investment Street,<br />
            Bengaluru, Karnataka - 560001<br />
            Phone: +91 98765 43210<br />
            Email: support@investmate.io
          </p>
          <div className="flex gap-4">
            {/* https://facebook.com */}
              <FaFacebookF className="text-white hover:text-blue-300 text-lg" />
            {/* </a> */}
            {/* https://twitter.com */}
              <FaTwitter className="text-white hover:text-blue-300 text-lg" />
            {/* </a> */}
            {/* https://instagram.com */}
              <FaInstagram className="text-white hover:text-pink-300 text-lg" />
            {/* </a> */}
            {/* https://linkedin.com */}
              <FaLinkedinIn className="text-white hover:text-blue-300 text-lg" />
            {/* </a> */}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-purple-400 pt-4 text-center text-sm text-purple-200">
        © {new Date().getFullYear()} Digital banking. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
