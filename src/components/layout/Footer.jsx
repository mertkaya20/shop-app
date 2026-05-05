import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 font-sans">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Link
            to="/"
            className="font-serif text-xl font-semibold text-stone-50 tracking-tight"
          >
            Cart<span className="text-amber-500">ify</span>
          </Link>
          <p className="text-sm leading-relaxed text-stone-400">
            Curated products, seamless shopping. Quality you can trust,
            delivered to your door.
          </p>
        </div>

        {/* Shop */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-300">
            Shop
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to="/"
                className="text-sm hover:text-amber-500 transition-colors duration-200"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-sm hover:text-amber-500 transition-colors duration-200"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/checkout"
                className="text-sm hover:text-amber-500 transition-colors duration-200"
              >
                Checkout
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-300">
            Account
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to="/login"
                className="text-sm hover:text-amber-500 transition-colors duration-200"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-sm hover:text-amber-500 transition-colors duration-200"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-300">
            Contact
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li>support@cartify.com</li>
            <li>+90 212 000 00 00</li>
            <li>Istanbul, Turkey</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <span>
            © {new Date().getFullYear()} Cartify. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <span className="hover:text-amber-500 cursor-pointer transition-colors duration-200">
              Privacy Policy
            </span>
            <span className="hover:text-amber-500 cursor-pointer transition-colors duration-200">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
