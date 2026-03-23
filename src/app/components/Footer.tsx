import { Facebook, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1a1f35] text-gray-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Logo and Social */}
          <div>
            <h3 className="text-xl font-serif italic text-white mb-4">
              Julius <span className="uppercase tracking-wider">SILVERT</span>
            </h3>
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Julius Silvert on Facebook (opens in new tab)"
              >
                <Facebook className="w-5 h-5" aria-hidden />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Julius Silvert on X (opens in new tab)"
              >
                <Twitter className="w-5 h-5" aria-hidden />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Julius Silvert on YouTube (opens in new tab)"
              >
                <Youtube className="w-5 h-5" aria-hidden />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">About Us</a></li>
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Our Werenda</a></li>
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Notesh Sony&apos;s &amp; Confictions</a></li>
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Combos</a></li>
            </ul>
          </div>

          {/* Account Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">Account Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/account?tab=order-guide" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Order Guide</a></li>
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Make Inside Lets</a></li>
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Quick Order Updated</a></li>
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Invoice Hist</a></li>
            </ul>
          </div>

          {/* Operations */}
          <div>
            <h4 className="text-white font-semibold mb-4">Operations</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Delivery Areas</a></li>
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Grade Contacts</a></li>
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Prodity Selices 4s</a></li>
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Resume Policy</a></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/submit-request" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Contact Cilles</a></li>
              <li><a href="/submit-request" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Contact Customer</a></li>
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">IT Utipsays</a></li>
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Live Cliest</a></li>
            </ul>
            <h4 className="text-white font-semibold mb-2 mt-6">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Terms</a></li>
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Pricing</a></li>
              <li><a href="/" className="text-gray-200 hover:text-white transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Accessibility</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700">
          <p className="text-center text-xs text-gray-300">
            © 2026 Julius Silvert. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
