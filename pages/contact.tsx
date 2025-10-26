import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { event } from '../lib/gtag';

export default function Contact() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Unlocked Coding';

  // Track contact page view
  useEffect(() => {
    event({
      action: 'page_view',
      category: 'Contact',
      label: 'Contact Page',
    });
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Us",
    "url": "https://unlockedcoding.com/contact",
    "description": "Get in touch with Unlocked Coding team for support, questions, or feedback about our programming courses.",
    "mainEntity": {
      "@type": "Organization",
      "name": siteName,
      "url": "https://unlockedcoding.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"],
        "areaServed": "Worldwide"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "House No 38, Block 4 Moti Nagar, Ramesh Nagar",
        "addressLocality": "New Delhi West",
        "postalCode": "110051",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - {siteName}</title>
        <meta name="description" content={`Contact ${siteName} for support, questions, or feedback about our programming courses. Get help with your learning journey.`} />
        <link rel="canonical" href="https://unlockedcoding.com/contact" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Contact Us - ${siteName}`} />
        <meta property="og:description" content={`Contact ${siteName} for support, questions, or feedback about our programming courses.`} />
        <meta property="og:url" content="https://unlockedcoding.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Contact Us - ${siteName}`} />
        <meta name="twitter:description" content={`Contact ${siteName} for support, questions, or feedback about our programming courses.`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We're here to help you succeed in your programming journey. Get in touch with our team for support, questions, or feedback.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 sm:mb-16">
            {/* Primary Contact - Telegram */}
            <div className="bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-white/5 rounded-2xl p-8 sm:p-12 border border-border/50">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.61 7.59c-.121.57-.44.71-.89.44l-2.46-1.81-1.19 1.15c-.13.13-.24.24-.49.24l.18-2.56 4.57-4.13c.2-.18-.04-.28-.31-.1l-5.64 3.55-2.43-.76c-.53-.16-.54-.53.11-.79l9.52-3.67c.44-.16.83.1.69.79z"/>
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Telegram Support
                </h2>
                <p className="text-muted-foreground mb-6">
                  Get instant help and connect with our community. Our team responds within 24 hours.
                </p>
                <div className="space-y-4">
                  <a
                    href="https://t.me/un_devs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold text-lg"
                    onClick={() => event({
                      action: 'click',
                      category: 'Contact',
                      label: 'Telegram Support Link'
                    })}
                  >
                    Contact Support Team
                  </a>
                  <a
                    href="https://t.me/unlocked_chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-100 dark:bg-gray-800 text-foreground px-8 py-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-semibold"
                    onClick={() => event({
                      action: 'click',
                      category: 'Contact',
                      label: 'Telegram Community Link'
                    })}
                  >
                    Join Community Chat
                  </a>
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  <p><strong>Response Time:</strong> Within 24 hours</p>
                  <p><strong>Languages:</strong> English & Hindi</p>
                </div>
              </div>
            </div>

            {/* Physical Address */}
            <div className="bg-card rounded-2xl p-8 sm:p-12 border border-border">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Our Office
                </h2>
                <p className="text-muted-foreground mb-6">
                  Visit our office for in-person support and consultations.
                </p>
                <div className="text-left bg-muted/50 rounded-lg p-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Address:</h3>
                      <p className="text-muted-foreground">
                        House No 38, Block 4 Moti Nagar<br />
                        Ramesh Nagar<br />
                        New Delhi West - 110051<br />
                        India
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Building:</h3>
                      <p className="text-muted-foreground">
                        100xDev School Building<br />
                        Top Floor
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Office Hours:</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-card rounded-2xl p-8 sm:p-12 mb-12 sm:mb-16 border border-border">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">How quickly do you respond?</h3>
                  <p className="text-muted-foreground">We typically respond to all inquiries within 24 hours during business days.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Do you offer technical support?</h3>
                  <p className="text-muted-foreground">Yes! Our team provides technical support for all course-related questions and issues.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Can I visit your office?</h3>
                  <p className="text-muted-foreground">Absolutely! We welcome visitors during office hours. Please contact us first to schedule a visit.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What languages do you support?</h3>
                  <p className="text-muted-foreground">We provide support in both English and Hindi to serve our diverse community.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">How can I report issues?</h3>
                  <p className="text-muted-foreground">Use our Telegram support channel for quick issue reporting and resolution.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Do you offer career guidance?</h3>
                  <p className="text-muted-foreground">Yes! Our team provides career guidance and mentorship for programming students.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-white/10 rounded-2xl p-8 sm:p-12 border border-border/50">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                About Our Support
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                At Unlocked Coding, we believe in providing exceptional support to help you succeed in your programming journey. 
                Our dedicated team of experienced developers and educators is committed to answering your questions, 
                resolving technical issues, and providing guidance throughout your learning process.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">24-hour response guarantee</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Expert Support</h3>
                  <p className="text-sm text-muted-foreground">Industry professionals</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Community Driven</h3>
                  <p className="text-sm text-muted-foreground">Peer support network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
