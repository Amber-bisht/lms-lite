import Layout from '../components/Layout';
import Head from 'next/head';
import { FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaAws, FaDocker, FaReact, FaPython, FaGitAlt } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiPostgresql, SiRedis, SiTypescript, SiKubernetes } from 'react-icons/si';
import HomepageCarousel from '../components/HomepageCarousel';
import { getHomepageCourses, ICourse } from '../lib/dataUtils';
import { GetStaticProps } from 'next';
// import { DiCplusplus } from 'react-icons/di'; // This icon might not exist

interface HomeProps {
  homepageCourses: ICourse[];
}

export default function Home({ homepageCourses }: HomeProps) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Unlocked Coding';
  
  // Debug logging
  console.log('Homepage courses in component:', homepageCourses);
  
  // Ensure homepageCourses is always an array
  const safeHomepageCourses = Array.isArray(homepageCourses) ? homepageCourses : [];
  
  return (
    <>
      <Head>
        <title>Unlocked Coding - Free Programming Courses & Tutorials</title>
        <meta name="description" content="Master programming with free comprehensive courses. Learn web development, data structures, algorithms, system design, and more from industry experts." />
        <meta name="robots" content="index, follow" />
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
      <div className="min-h-screen flex flex-col">
        {/* Hero Section - Mobile Optimized */}
        <div className="flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
          <div className="w-full max-w-6xl mx-auto text-center">
            {/* Background Gradient - Hidden on mobile for performance */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
            
            {/* Floating Tech Logos - Reduced on mobile */}
            <div className="hidden sm:block absolute inset-0 pointer-events-none">
              {/* Mobile: Show fewer logos */}
              <div className="absolute top-10 left-10 w-6 h-6 animate-float">
                <FaHtml5 className="w-full h-full text-orange-500" />
              </div>
              <div className="absolute top-20 right-20 w-6 h-6 animate-float-delayed">
                <FaCss3Alt className="w-full h-full text-blue-500" />
              </div>
              <div className="absolute bottom-20 left-16 w-6 h-6 animate-float-slow">
                <FaJs className="w-full h-full text-yellow-500" />
              </div>
              <div className="absolute top-32 left-1/4 w-6 h-6 animate-float-reverse">
                <SiExpress className="w-full h-full text-gray-800 dark:text-gray-200" />
              </div>
              <div className="absolute top-40 right-1/3 w-6 h-6 animate-float-delayed">
                <FaNodeJs className="w-full h-full text-green-600" />
              </div>
              <div className="absolute bottom-32 left-1/3 w-6 h-6 animate-float-slow">
                <FaAws className="w-full h-full text-orange-500" />
              </div>
              <div className="absolute top-16 left-1/2 w-6 h-6 animate-float">
                <SiMongodb className="w-full h-full text-green-500" />
              </div>
              <div className="absolute top-24 right-1/2 w-6 h-6 animate-float-delayed">
                <SiPostgresql className="w-full h-full text-blue-600" />
              </div>
              <div className="absolute bottom-16 left-1/2 w-6 h-6 animate-float-slow">
                <FaReact className="w-full h-full text-blue-400" />
              </div>
              <div className="absolute bottom-24 right-1/2 w-6 h-6 animate-float">
                <SiRedis className="w-full h-full text-red-500" />
              </div>
              <div className="absolute top-48 left-12 w-6 h-6 animate-float-delayed">
                <FaPython className="w-full h-full text-yellow-500" />
              </div>
              <div className="absolute bottom-40 right-1/4 w-6 h-6 animate-float-slow">
                <FaGitAlt className="w-full h-full text-orange-500" />
              </div>
            </div>
            
            {/* Content - Mobile Optimized */}
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                Unlock Your Career with Unlocked Coding
              </h2>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-3 sm:mb-4">
                Becoming A Skilled Developer
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 max-w-4xl mx-auto px-2 leading-relaxed">
                Go from zero to hero, build hands-on projects, gain practical skills and the confidence to turn code into a career.
              </p>
              
              {/* Free Course Banner - Mobile Optimized */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 max-w-4xl mx-auto">
                <p className="text-xs sm:text-sm md:text-base text-foreground font-semibold mb-2">
                  Get Free course - No scam genuine place to become 100xdev no paywall no scam pure intention
                </p>
                <p className="text-xs sm:text-sm md:text-base text-primary font-bold">
                  Get job-ready and land your dream offers
                </p>
              </div>
              
              {/* CTA Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
                <a 
                  href="/r" 
                  className="group w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    Browse Categories
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
                <a 
                  href="/all" 
                  className="group w-full sm:w-auto bg-card border-2 border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    View All Courses
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Courses Carousel - Mobile Optimized */}
        {safeHomepageCourses && safeHomepageCourses.length > 0 && (
          <div className="container mx-auto px-4 py-6 sm:py-8">
            <HomepageCarousel courses={safeHomepageCourses} />
          </div>
        )}

      </div>
    </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const homepageCourses = getHomepageCourses();
    console.log('Homepage courses loaded:', homepageCourses?.length || 0);
    
    // Ensure we always return a valid array
    const safeHomepageCourses = Array.isArray(homepageCourses) ? homepageCourses : [];
    
    return {
      props: {
        homepageCourses: safeHomepageCourses,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error loading homepage courses:', error);
    
    return {
      props: {
        homepageCourses: [],
      },
      revalidate: 3600,
    };
  }
};
