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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 text-center">
        {/* Hero Section with Gradient Background */}
        <div className="relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          
          {/* Floating Tech Logos */}
          <div className="absolute inset-0 pointer-events-none">
            {/* HTML Logo */}
            <div className="absolute top-10 left-10 w-8 h-8 animate-float">
              <FaHtml5 className="w-full h-full text-orange-500" />
            </div>
            
            {/* CSS Logo */}
            <div className="absolute top-20 right-20 w-8 h-8 animate-float-delayed">
              <FaCss3Alt className="w-full h-full text-blue-500" />
            </div>
            
            {/* JavaScript Logo */}
            <div className="absolute bottom-20 left-16 w-8 h-8 animate-float-slow">
              <FaJs className="w-full h-full text-yellow-500" />
            </div>
            
            {/* Express Logo */}
            <div className="absolute top-32 left-1/4 w-8 h-8 animate-float-reverse">
              <SiExpress className="w-full h-full text-gray-800 dark:text-gray-200" />
            </div>
            
            {/* Node.js Logo */}
            <div className="absolute top-40 right-1/3 w-8 h-8 animate-float-delayed">
              <FaNodeJs className="w-full h-full text-green-600" />
            </div>
            
            {/* AWS Logo */}
            <div className="absolute bottom-32 left-1/3 w-8 h-8 animate-float-slow">
              <FaAws className="w-full h-full text-orange-500" />
            </div>
            
            {/* MongoDB Logo */}
            <div className="absolute top-16 left-1/2 w-8 h-8 animate-float">
              <SiMongodb className="w-full h-full text-green-500" />
            </div>
            
            {/* PostgreSQL Logo */}
            <div className="absolute top-24 right-1/2 w-8 h-8 animate-float-delayed">
              <SiPostgresql className="w-full h-full text-blue-600" />
            </div>
            
            {/* React Logo */}
            <div className="absolute bottom-16 left-1/2 w-8 h-8 animate-float-slow">
              <FaReact className="w-full h-full text-blue-400" />
            </div>
            
            {/* Redis Logo */}
            <div className="absolute bottom-24 right-1/2 w-8 h-8 animate-float">
              <SiRedis className="w-full h-full text-red-500" />
            </div>
            
            {/* Python Logo */}
            <div className="absolute top-48 left-12 w-8 h-8 animate-float-delayed">
              <FaPython className="w-full h-full text-yellow-500" />
            </div>
            
            {/* Git Logo */}
            <div className="absolute bottom-40 right-1/4 w-8 h-8 animate-float-slow">
              <FaGitAlt className="w-full h-full text-orange-500" />
            </div>
            
            {/* TypeScript Logo */}
            <div className="absolute top-56 right-16 w-8 h-8 animate-float">
              <SiTypescript className="w-full h-full text-blue-500" />
            </div>
            
            {/* Docker Logo */}
            <div className="absolute bottom-48 left-20 w-8 h-8 animate-float-delayed">
              <FaDocker className="w-full h-full text-blue-500" />
            </div>
            
            {/* Kubernetes Logo */}
            <div className="absolute top-64 left-1/3 w-8 h-8 animate-float-slow">
              <SiKubernetes className="w-full h-full text-blue-600" />
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Unlock Your Career with Unlocked Coding
            </h2>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-4 sm:mb-6">
              Becoming A Skilled Developer
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-4xl mx-auto px-4 leading-relaxed">
              Go from zero to hero, build hands-on projects, gain practical skills and the confidence to turn code into a career.
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6 sm:mb-8 max-w-4xl mx-auto">
              <p className="text-sm sm:text-base md:text-lg text-foreground font-semibold mb-3">
                Get Free course - No scam genuine place to become 100xdev no paywall no scam pure intention
              </p>
              <p className="text-sm sm:text-base md:text-lg text-primary font-bold">
                Get job-ready and land your dream offers
              </p>
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 mb-8 sm:mb-12">
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

        {/* Featured Courses Carousel */}
        {homepageCourses && homepageCourses.length > 0 && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <HomepageCarousel courses={homepageCourses} />
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
    
    return {
      props: {
        homepageCourses: homepageCourses || [],
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
