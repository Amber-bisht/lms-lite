import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import VideoPlayer from '../../../components/VideoPlayer';
import { ICourse } from '../../../lib/dataUtils';
import { getAllCourses, getCourseByName } from '../../../lib/dataUtils';

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

  if (!course) {
    return (
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
    );
  }

  // Show loading state for redirect courses
  if (course.videoType === 'redirect' && course.redirecturl) {
    return (
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
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <Link 
            href={`/r/${categoryName}`} 
            className="text-sm sm:text-base text-primary hover:opacity-80 mb-3 sm:mb-4 inline-block transition-opacity"
          >
            ← Back to {categoryName} Courses
          </Link>
        </div>

        <VideoPlayer course={course} />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const courses = getAllCourses();
    
    const paths = courses.map((course) => ({
      params: {
        category: course.coursecategory,
        course: encodeURIComponent(course.courseName),
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
    const categoryName = params?.category as string;
    const courseName = decodeURIComponent(params?.course as string);
    
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
        categoryName: params?.category as string,
        courseName: decodeURIComponent(params?.course as string),
      },
      revalidate: 60,
    };
  }
};
