import Layout from '../components/Layout';
import Head from 'next/head';

export default function Home() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Unlocked Coding';
  
  return (
    <>
      <Head>
        <title>Unlocked Coding - Free Programming Courses & Tutorials</title>
        <meta name="description" content="Master programming with free comprehensive courses. Learn web development, data structures, algorithms, system design, and more from industry experts." />
        <link rel="canonical" href="https://unlockedcoding.com/" />
        <meta property="og:title" content="Unlocked Coding - Free Programming Courses" />
        <meta property="og:description" content="Master programming with free comprehensive courses. Learn web development, DSA, system design, and more." />
        <meta property="og:url" content="https://unlockedcoding.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Unlocked Coding - Free Programming Courses" />
        <meta name="twitter:description" content="Master programming with free comprehensive courses." />
      </Head>
      <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-center">
        {/* Hero Section with Gradient Background */}
        <div className="relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating Code Icons */}
            <div className="absolute top-10 left-10 w-8 h-8 text-blue-400/30 animate-float">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 4l-6 8 6 8V4zm8 0v16l6-8-6-8z"/>
              </svg>
            </div>
            <div className="absolute top-20 right-20 w-6 h-6 text-purple-400/30 animate-float-delayed">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="absolute bottom-20 left-16 w-10 h-10 text-pink-400/30 animate-float-slow">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div className="absolute bottom-10 right-10 w-7 h-7 text-green-400/30 animate-float">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
              </svg>
            </div>
            
            {/* Floating Geometric Shapes */}
            <div className="absolute top-32 left-1/4 w-4 h-4 bg-blue-500/20 rounded-full animate-float-reverse"></div>
            <div className="absolute top-40 right-1/3 w-3 h-3 bg-purple-500/20 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-pink-500/20 rounded-full animate-float-slow"></div>
            <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-green-500/20 rounded-full animate-float"></div>
            
            {/* Floating Dots */}
            <div className="absolute top-16 left-1/2 w-1 h-1 bg-white/40 rounded-full animate-float"></div>
            <div className="absolute top-24 right-1/2 w-1.5 h-1.5 bg-white/30 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-16 left-1/2 w-1 h-1 bg-white/40 rounded-full animate-float-slow"></div>
            <div className="absolute bottom-24 right-1/2 w-1.5 h-1.5 bg-white/30 rounded-full animate-float"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 sm:mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome to {siteName}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto px-4 leading-relaxed">
              Your gateway to mastering programming and technology. 
              <span className="text-primary font-semibold"> Learn, build, and grow</span> with our comprehensive courses designed by industry experts.
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 mb-16 sm:mb-20">
              <a 
                href="/r" 
                className="group w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 sm:px-10 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  Browse Categories
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              <a 
                href="/all" 
                className="group w-full sm:w-auto bg-card border-2 border-primary text-primary px-8 sm:px-10 py-4 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  View All Courses
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </>
  );
}
