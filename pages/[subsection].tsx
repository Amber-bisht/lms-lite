import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';
import { ILightCourse, getLightweightCoursesBySubsection, getAllSubsections } from '../lib/dataUtils';

interface SubsectionPageProps {
  courses: ILightCourse[];
  subsectionName: string;
}

export default function SubsectionPage({ courses, subsectionName }: SubsectionPageProps) {
  if (!courses || courses.length === 0) {
    return (
      <>
        <Head>
          <title>Subsection Not Found | Unlocked Coding</title>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <Layout>
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Subsection Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                The subsection you're looking for doesn't exist.
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

  return (
    <>
      <Head>
        <title>{subsectionName.toUpperCase()} Courses | Unlocked Coding</title>
        <meta 
          name="description" 
          content={`Explore ${subsectionName.toUpperCase()} courses with comprehensive video tutorials and hands-on projects.`} 
        />
        <link rel="canonical" href={`https://unlockedcoding.com/${encodeURIComponent(subsectionName)}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${subsectionName.toUpperCase()} Courses | Unlocked Coding`} />
        <meta property="og:description" content={`Explore ${subsectionName.toUpperCase()} courses with comprehensive video tutorials and hands-on projects.`} />
        <meta property="og:url" content={`https://unlockedcoding.com/${encodeURIComponent(subsectionName)}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${subsectionName.toUpperCase()} Courses | Unlocked Coding`} />
        <meta name="twitter:description" content={`Explore ${subsectionName.toUpperCase()} courses with comprehensive video tutorials.`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": `${subsectionName.toUpperCase()} Courses`,
              "description": `Explore ${subsectionName.toUpperCase()} courses with comprehensive video tutorials and hands-on projects.`,
              "url": `https://unlockedcoding.com/${encodeURIComponent(subsectionName)}`,
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": courses.length,
                "itemListElement": courses.slice(0, 50).map((course, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Course",
                    "name": course.courseName,
                    "description": course.des,
                    "url": `https://unlockedcoding.com/teacher/${encodeURIComponent(course.instructorSlug)}/${encodeURIComponent(course.courseName)}`
                  }
                }))
              }
            })
          }}
        />
      </Head>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {subsectionName.toUpperCase()} Courses
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Comprehensive video tutorials and hands-on projects
            </p>
            <div className="text-sm text-muted-foreground">
              {courses.length} course{courses.length !== 1 ? 's' : ''} available
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course._id}
                href={`/teacher/${encodeURIComponent(course.instructorSlug)}/${encodeURIComponent(course.courseName)}`}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={course.imageofcourse}
                    alt={course.courseName}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {course.courseName}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {course.des}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <img
                        src={course.imageofinstructur}
                        alt={course.instructorDisplayName || course.instructorSlug}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span>{course.instructorDisplayName || course.instructorSlug}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">
                        {course.videos.length} video{course.videos.length !== 1 ? 's' : ''}
                      </span>
                      {course.cost === 0 && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          Free
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground capitalize">
                      {course.coursecategory}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {course.audio}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Back to Categories */}
          <div className="text-center mt-12">
            <Link 
              href="/r" 
              className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              ← Back to All Categories
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all unique subsections from course data
  const allSubsections = getAllSubsections();
  
  const paths = allSubsections.map((subsection) => ({
    params: { subsection },
  }));

  return {
    paths,
    fallback: 'blocking', // Enable ISR (Incremental Static Regeneration)
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const subsectionName = params?.subsection as string;
    
    if (!subsectionName) {
      return {
        props: {
          courses: [],
          subsectionName: '',
        },
      };
    }

    const courses = getLightweightCoursesBySubsection(subsectionName);

    return {
      props: {
        courses,
        subsectionName,
      },
    };
  } catch (error) {
    console.error('Error fetching subsection courses:', error);
    return {
      props: {
        courses: [],
        subsectionName: params?.subsection as string || '',
      },
    };
  }
};
