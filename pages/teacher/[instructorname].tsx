import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllCourses, ICourse } from '../../lib/dataUtils';

interface InstructorPageProps {
  instructorName: string;
  courses: ICourse[];
  instructorImage: string;
}

export default function InstructorPage({ instructorName, courses, instructorImage }: InstructorPageProps) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Unlocked Coding';

  return (
    <>
      <Head>
        <title>{instructorName} - Courses by {instructorName} | {siteName}</title>
        <meta name="description" content={`Explore all programming courses by ${instructorName}. Learn from industry experts with hands-on projects and real-world applications.`} />
        <meta name="keywords" content={`${instructorName}, programming courses, coding tutorials, web development, software engineering`} />
        <link rel="canonical" href={`https://unlockedcoding.com/teacher/${encodeURIComponent(instructorName)}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${instructorName} - Courses by ${instructorName}`} />
        <meta property="og:description" content={`Explore all programming courses by ${instructorName}. Learn from industry experts.`} />
        <meta property="og:image" content={instructorImage} />
        <meta property="og:url" content={`https://unlockedcoding.com/teacher/${encodeURIComponent(instructorName)}`} />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${instructorName} - Courses by ${instructorName}`} />
        <meta name="twitter:description" content={`Explore all programming courses by ${instructorName}.`} />
        <meta name="twitter:image" content={instructorImage} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": instructorName,
              "url": `https://unlockedcoding.com/teacher/${encodeURIComponent(instructorName)}`,
              "image": instructorImage,
              "jobTitle": "Programming Instructor",
              "worksFor": {
                "@type": "Organization",
                "name": siteName,
                "url": "https://unlockedcoding.com"
              },
              "teaches": courses.map(course => ({
                "@type": "Course",
                "name": course.courseName,
                "description": course.des,
                "url": `https://unlockedcoding.com/r/${course.coursecategory.toLowerCase()}/${encodeURIComponent(course.courseName)}`
              }))
            })
          }}
        />
      </Head>
      
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Instructor Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img
                src={instructorImage}
                alt={instructorName}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {instructorName}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Programming Instructor & Industry Expert
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="text-primary font-semibold">{courses.length}</span>
                <span>Courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-primary font-semibold">
                  {courses.reduce((total, course) => total + (course.videos?.length || 0), 0)}
                </span>
                <span>Videos</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-primary font-semibold">
                  {new Set(courses.map(course => course.coursecategory)).size}
                </span>
                <span>Categories</span>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
              Courses by {instructorName}
            </h2>
            
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <div key={`${course.coursecategory}-${course.courseName}`} className="group">
                    {course.videoType === 'redirect' && course.redirecturl ? (
                      <a
                        href={course.redirecturl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border hover:scale-102"
                      >
                        <div className="relative">
                          <img 
                            src={course.imageofcourse} 
                            alt={course.courseName}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center space-x-2">
                              <img 
                                src={course.imageofinstructur} 
                                alt={course.instructorname}
                                className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
                              />
                              <span className="text-white text-sm font-medium">
                                {course.instructorname}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs text-primary font-medium capitalize bg-primary/10 px-2 py-1 rounded-full">
                              {course.coursecategory}
                            </span>
                            <div className="flex items-center space-x-1">
                              <span className="text-yellow-400">★★★★★</span>
                              <span className="text-sm text-muted-foreground">4.8/5</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {course.courseName}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {course.des}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">🌐</span>
                              <span className="text-xs text-muted-foreground">{course.audio || 'English'}</span>
                            </div>
                            <span className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all">
                              View Details
                            </span>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <Link
                        href={`/r/${course.coursecategory.toLowerCase()}/${encodeURIComponent(course.courseName)}`}
                        className="block bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border hover:scale-102"
                      >
                        <div className="relative">
                          <img 
                            src={course.imageofcourse} 
                            alt={course.courseName}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center space-x-2">
                              <img 
                                src={course.imageofinstructur} 
                                alt={course.instructorname}
                                className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
                              />
                              <span className="text-white text-sm font-medium">
                                {course.instructorname}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs text-primary font-medium capitalize bg-primary/10 px-2 py-1 rounded-full">
                              {course.coursecategory}
                            </span>
                            <div className="flex items-center space-x-1">
                              <span className="text-yellow-400">★★★★★</span>
                              <span className="text-sm text-muted-foreground">4.8/5</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {course.courseName}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {course.des}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">🎥</span>
                              <span className="text-xs text-muted-foreground">{course.videos?.length || 0} videos</span>
                            </div>
                            <span className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all">
                              View Details
                            </span>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No courses found for this instructor.</p>
              </div>
            )}
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = getAllCourses();
  const instructorNames = new Set<string>();
  
  courses.forEach(course => {
    if (course.instructorname) {
      instructorNames.add(course.instructorname);
    }
  });

  const paths = Array.from(instructorNames).map(instructorName => ({
    params: { instructorname: instructorName }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const instructorName = params?.instructorname as string;
  const allCourses = getAllCourses();
  
  // Filter courses by instructor name
  const instructorCourses = allCourses.filter(course => 
    course.instructorname === instructorName
  );

  // Get instructor image from first course
  const instructorImage = instructorCourses.length > 0 
    ? instructorCourses[0].imageofinstructur 
    : '/default-instructor.jpg';

  return {
    props: {
      instructorName,
      courses: instructorCourses,
      instructorImage
    },
    revalidate: 3600 // Revalidate every hour
  };
};
