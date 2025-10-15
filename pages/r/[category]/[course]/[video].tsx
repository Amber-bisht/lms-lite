import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from '../../../../components/Layout';

// Dynamically import VideoPlayer to reduce initial bundle size
const VideoPlayer = dynamic(() => import('../../../../components/VideoPlayer'), {
  loading: () => (
    <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
});
import { ICourse } from '../../../../lib/dataUtils';
import { getAllCourses, getCourseByName } from '../../../../lib/dataUtils';
import { trackVideoPlay } from '../../../../lib/gtag';
import { generateOptimizedVideoStructuredData } from '../../../../lib/structuredData';

interface VideoPageProps {
  course: ICourse | null;
  videoIndex: number;
  video: any;
  categoryName: string;
  courseName: string;
}

export default function VideoPage({ course, videoIndex, video, categoryName, courseName }: VideoPageProps) {
  const router = useRouter();

  // Track video play
  useEffect(() => {
    if (course && video && video.title) {
      trackVideoPlay(course.courseName, video.title, videoIndex);
    }
  }, [course, video, videoIndex]);

  if (!course || !video) {
    return (
      <>
        <Head>
          <title>Video Not Found | Unlocked Coding</title>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <Layout>
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Video Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                The video you're looking for doesn't exist.
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

  const canonicalUrl = `https://unlockedcoding.com/r/${encodeURIComponent(categoryName.toLowerCase())}/${encodeURIComponent(courseName)}/${videoIndex}`;
  const courseUrl = `https://unlockedcoding.com/r/${encodeURIComponent(categoryName.toLowerCase())}/${encodeURIComponent(courseName)}`;
  
  // Use optimized structured data to reduce page size
  const videoStructuredData = generateOptimizedVideoStructuredData(
    course,
    video,
    videoIndex,
    categoryName,
    courseName
  );

  // Create a course object with the current video selected
  const courseWithCurrentVideo = {
    ...course,
    videos: course.videos,
    currentVideoIndex: videoIndex
  };

  return (
    <>
      <Head>
        <title>{video.title} - {course.courseName} | Unlocked Coding</title>
        <meta name="description" content={`${course.des} - ${video.title}. Learn from ${course.instructorname || 'expert instructors'} on Unlocked Coding.`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={`${video.title} - ${course.courseName}`} />
        <meta property="og:description" content={`${course.des} - ${video.title}. Learn from ${course.instructorname || 'expert instructors'} on Unlocked Coding.`} />
        <meta property="og:image" content={course.imageofcourse} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="video.other" />
        <meta property="og:site_name" content="Unlocked Coding" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:title" content={`${video.title} - ${course.courseName}`} />
        <meta name="twitter:description" content={`${course.des} - ${video.title}. Learn from ${course.instructorname || 'expert instructors'} on Unlocked Coding.`} />
        <meta name="twitter:image" content={course.imageofcourse} />
        
        {/* Video-specific meta tags */}
        <meta property="video:duration" content="3600" />
        <meta property="video:release_date" content={new Date().toISOString()} />
        <meta property="video:tag" content={course.coursecategory} />
        <meta property="video:tag" content={video.title} />
        <meta property="video:tag" content={course.instructorname || "instructor"} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
        />
      </Head>
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-4 sm:mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link 
                  href="/r" 
                  className="text-primary hover:opacity-80 transition-opacity"
                >
                  Categories
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li>
                <Link 
                  href={`/r/${categoryName.toLowerCase()}`} 
                  className="text-primary hover:opacity-80 transition-opacity"
                >
                  {categoryName}
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li>
                <Link 
                  href={`/r/${categoryName.toLowerCase()}/${courseName}`} 
                  className="text-primary hover:opacity-80 transition-opacity"
                >
                  {course.courseName}
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground font-medium">{video.title}</li>
            </ol>
          </nav>

          {/* Video Player with current video selected */}
          <div className="mb-6">
            <VideoPlayer 
              course={courseWithCurrentVideo} 
              useVideoLinks={true} 
              baseUrl={`/r/${categoryName.toLowerCase()}/${courseName}`}
            />
          </div>

          {/* Video Navigation */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Course Videos</h2>
            <div className="space-y-2">
              {course.videos.map((vid, index) => (
                <Link
                  key={index}
                  href={`/r/${categoryName.toLowerCase()}/${courseName}/${index}`}
                  className={`block p-3 rounded-lg transition-colors ${
                    index === videoIndex
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{vid.title}</span>
                    <span className="text-sm opacity-75">
                      {index + 1} of {course.videos.length}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const courses = getAllCourses();
    
    const paths: Array<{
      params: {
        category: string;
        course: string;
        video: string;
      };
    }> = [];
    
    courses.forEach((course) => {
      course.videos.forEach((_, videoIndex) => {
        paths.push({
          params: {
            category: course.coursecategory.toLowerCase(),
            course: course.courseName,
            video: videoIndex.toString(),
          },
        });
      });
    });

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating video static paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const categoryName = (params?.category as string).toLowerCase();
    const courseName = params?.course as string;
    const videoIndex = parseInt(params?.video as string, 10);
    
    const course = getCourseByName(categoryName, courseName);

    if (!course || videoIndex < 0 || videoIndex >= course.videos.length) {
      return {
        props: {
          course: null,
          videoIndex: -1,
          video: null,
          categoryName,
          courseName,
        },
        revalidate: 60,
      };
    }

    const video = course.videos[videoIndex];

    return {
      props: {
        course,
        videoIndex,
        video,
        categoryName,
        courseName,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching video:', error);
    return {
      props: {
        course: null,
        videoIndex: -1,
        video: null,
        categoryName: (params?.category as string).toLowerCase(),
        courseName: params?.course as string,
      },
      revalidate: 60,
    };
  }
};
