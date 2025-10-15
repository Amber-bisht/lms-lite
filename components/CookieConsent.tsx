import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowConsent(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-card/95 backdrop-blur-lg border border-border/50 rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Content */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start gap-3">
                {/* Cookie Icon */}
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                    We use cookies
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    We use cookies and similar technologies to enhance your browsing experience, serve personalized ads (via Google AdSense), and analyze our traffic. By clicking "Accept", you consent to our use of cookies.{' '}
                    <Link href="/privacy" className="text-primary hover:underline font-medium">
                      Learn more
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={declineCookies}
                className="px-6 py-3 rounded-lg border border-border bg-background hover:bg-muted text-foreground font-medium transition-all duration-200 hover:shadow-md"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Accept Cookies
              </button>
            </div>
          </div>
          
          {/* Additional Links */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <span className="text-border">•</span>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

