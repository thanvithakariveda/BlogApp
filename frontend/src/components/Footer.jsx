function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div className="md:col-span-2">

            <h2 className="text-4xl font-black text-white">
              MyBlog
            </h2>

            <p className="text-zinc-400 mt-4 leading-7 max-w-lg">
              A modern blogging platform where developers,
              creators, and innovators share ideas about
              technology, AI, programming, startups, and design.
            </p>

            {/* SOCIALS */}
            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-400 transition"
              >
                ✦
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-fuchsia-400 hover:border-fuchsia-400 transition"
              >
                ✧
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-400 transition"
              >
                ✪
              </a>

            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <a
                  href="/"
                  className="text-zinc-400 hover:text-cyan-400 transition"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/articles"
                  className="text-zinc-400 hover:text-cyan-400 transition"
                >
                  Articles
                </a>
              </li>

              <li>
                <a
                  href="/authors"
                  className="text-zinc-400 hover:text-cyan-400 transition"
                >
                  Authors
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="text-zinc-400 hover:text-cyan-400 transition"
                >
                  Contact
                </a>
              </li>

            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Resources
            </h3>

            <ul className="space-y-3">

              <li>
                <a
                  href="/privacy"
                  className="text-zinc-400 hover:text-fuchsia-400 transition"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="/terms"
                  className="text-zinc-400 hover:text-fuchsia-400 transition"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="/support"
                  className="text-zinc-400 hover:text-fuchsia-400 transition"
                >
                  Support
                </a>
              </li>

              <li>
                <a
                  href="/faq"
                  className="text-zinc-400 hover:text-fuchsia-400 transition"
                >
                  FAQ
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-zinc-500 text-sm text-center">
            © {new Date().getFullYear()} MyBlog. Crafted for creators.
          </p>

          <p className="text-zinc-600 text-sm">
            Built with React + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;