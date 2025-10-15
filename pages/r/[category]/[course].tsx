import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from '../../../components/Layout';

// Dynamically import VideoPlayer to reduce initial bundle size
const VideoPlayer = dynamic(() => import('../../../components/VideoPlayer'), {
  loading: () => (
    <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
});
import { ICourse } from '../../../lib/dataUtils';
import { getAllCourses, getCourseByName } from '../../../lib/dataUtils';
import { trackCourseView } from '../../../lib/gtag';
import { generateOptimizedCourseStructuredData } from '../../../lib/structuredData';

interface CoursePageProps {
  course: ICourse | null;
  categoryName: string;
  courseName: string;
}

export default function CoursePage({ course, categoryName, courseName }: CoursePageProps) {
  const router = useRouter();

  // Handle redirect type courses
  useEffect(() => {
    if (course && course.videoType === 'redirect' && course.redirecturl) {
      window.location.href = course.redirecturl;
    }
  }, [course]);

  // Track course view
  useEffect(() => {
    if (course && course.courseName) {
      trackCourseView(course.courseName, categoryName);
    }
  }, [course, categoryName]);

  if (!course) {
    return (
      <>
        <Head>
          <title>Course Not Found | Unlocked Coding</title>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <Layout>
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Course Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                The course you're looking for doesn't exist.
              </p>
              <Link 
                href="/r" 
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Back to Categories
              </Link>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  // Show loading state for redirect courses
  if (course.videoType === 'redirect' && course.redirecturl) {
    const canonicalUrl = `https://unlockedcoding.com/r/${encodeURIComponent(categoryName.toLowerCase())}/${encodeURIComponent(courseName)}`;
    return (
      <>
        <Head>
          <title>{course.courseName} | Unlocked Coding</title>
          <meta name="description" content={course.des} />
          <link rel="canonical" href={canonicalUrl} />
          <meta name="robots" content="noindex, follow" />
        </Head>
        <Layout>
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Redirecting...
              </h1>
              <p className="text-muted-foreground mb-8">
                You are being redirected to the external course.
              </p>
              <p className="text-sm text-muted-foreground">
                If you are not redirected automatically, 
                <a 
                  href={course.redirecturl} 
                  className="text-primary hover:underline ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  click here
                </a>
              </p>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  const canonicalUrl = `https://unlockedcoding.com/r/${encodeURIComponent(categoryName.toLowerCase())}/${encodeURIComponent(courseName)}`;
  
  // Use optimized structured data to reduce page size
  const structuredData = generateOptimizedCourseStructuredData(course, categoryName, courseName);
  
  return (
    <>
      <Head>
        <title>{course.courseName} - {course.instructorname || 'Free Course'} | Unlocked Coding</title>
        <meta name="description" content={course.des} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={course.courseName} />
        <meta property="og:description" content={course.des} />
        <meta property="og:image" content={course.imageofcourse} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="video.course" />
        <meta property="og:site_name" content="Unlocked Coding" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={course.courseName} />
        <meta name="twitter:description" content={course.des} />
        <meta name="twitter:image" content={course.imageofcourse} />
        
        {/* Video-specific meta tags */}
        <meta property="video:duration" content="3600" />
        <meta property="video:release_date" content={new Date().toISOString()} />
        <meta property="video:tag" content={course.coursecategory} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-4 sm:mb-6">
            <Link 
              href={`/r/${categoryName.toLowerCase()}`} 
              className="text-sm sm:text-base text-primary hover:opacity-80 mb-3 sm:mb-4 inline-block transition-opacity"
            >
              ← Back to {categoryName} Courses
            </Link>
          </div>

          <VideoPlayer 
            course={course} 
          />
        </div>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const courses = getAllCourses();
    
    const paths = courses.map((course) => ({
      params: {
        category: course.coursecategory.toLowerCase(), // Normalize to lowercase
        course: course.courseName, // Don't encode here, Next.js handles it
      },
    }));

    return {
      paths,
      fallback: 'blocking', // Enable ISR (Incremental Static Regeneration)
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    // Normalize category to lowercase for case-insensitive matching
    const categoryName = (params?.category as string).toLowerCase();
    const courseName = params?.course as string;
    
    const course = getCourseByName(categoryName, courseName);

    return {
      props: {
        course: course || null,
        categoryName,
        courseName,
      },
      revalidate: 60, // Revalidate every 60 seconds for ISR
    };
  } catch (error) {
    console.error('Error fetching course:', error);
    return {
      props: {
        course: null,
        categoryName: (params?.category as string).toLowerCase(),
        courseName: params?.course as string,
      },
      revalidate: 60,
    };
  }
};
