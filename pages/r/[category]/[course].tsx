import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../../../components/Layout';
import { ICourse, ILightCourse, ITeacherDetail } from '../../../lib/dataUtils';
import { getAllCourses, getCourseByName, getSimilarCourses, getTeacherDetails } from '../../../lib/dataUtils';
import { trackCourseView, event } from '../../../lib/gtag';

interface CourseInfoPageProps {
  course: ICourse | null;
  categoryName: string;
  courseName: string;
  similarCourses?: ILightCourse[];
  teacherDetails?: ITeacherDetail | null;
}

export default function CourseInfoPage({ course, categoryName, courseName, similarCourses = [], teacherDetails }: CourseInfoPageProps) {
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

  const canonicalUrl = `https://unlockedcoding.com/r/${encodeURIComponent(categoryName.toLowerCase())}/${encodeURIComponent(courseName)}`;
  
  return (
    <>
      <Head>
        <title>{course.courseName} - {course.instructorname || 'Free Course'} | Unlocked Coding</title>
        <meta name="description" content={course.des} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={course.courseName} />
        <meta property="og:description" content={course.des} />
        <meta property="og:image" content={course.imageofcourse} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Unlocked Coding" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={course.courseName} />
        <meta name="twitter:description" content={course.des} />
        <meta name="twitter:image" content={course.imageofcourse} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": course.courseName,
              "description": course.des,
              "provider": {
                "@type": "Organization",
                "name": "Unlocked Coding",
                "url": "https://unlockedcoding.com"
              },
              "instructor": {
                "@type": "Person",
                "name": course.instructorname || "Instructor"
              },
              "courseMode": "online",
              "educationalLevel": course.level || "Beginner",
              "inLanguage": course.language || "English",
              "timeRequired": course.duration || "N/A",
              "url": canonicalUrl,
              "image": course.imageofcourse,
              "offers": {
                "@type": "Offer",
                "price": course.cost || 0,
                "priceCurrency": "INR"
              }
            })
          }}
        />
      </Head>
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link 
              href={`/r/${categoryName.toLowerCase()}`} 
              className="text-sm text-primary hover:opacity-80 mb-3 inline-block transition-opacity"
            >
              ← Back to {categoryName} Courses
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              {/* Course Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  {course.courseName}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {course.des}
                </p>
                
                {/* Instructor Bio */}
                <div className="bg-card border rounded-lg p-6 mb-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={teacherDetails?.image || course.imageofinstructur} 
                      alt={teacherDetails?.name || course.instructorname}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Meet Your Instructor: {teacherDetails?.displayName || course.instructorname}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {teacherDetails?.bio || `${course.instructorname} is an experienced software engineer and educator with expertise in modern web development technologies. With years of industry experience, ${course.instructorname} brings real-world knowledge and practical insights to every lesson. Known for clear explanations and hands-on teaching methods, ${course.instructorname} has helped thousands of students master programming concepts and advance their careers in technology.`}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {teacherDetails?.expertise?.slice(0, 3).map((skill, index) => (
                          <span key={index} className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        )) || (
                          <>
                            <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-sm">Industry Expert</span>
                            <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm">Experienced Educator</span>
                            <span className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-sm">Practical Focus</span>
                          </>
                        )}
                      </div>
                      {teacherDetails && (
                        <div className="text-sm text-muted-foreground">
                          <p><strong>Experience:</strong> {teacherDetails.experience}</p>
                          <p><strong>Students Helped:</strong> {teacherDetails.studentsHelped}</p>
                          <p><strong>Specialization:</strong> {teacherDetails.specialization}</p>
                          <div className="mt-3">
                            <Link
                              href={`/teacher/${encodeURIComponent(course.instructorname)}`}
                              className="text-primary hover:underline text-sm font-medium"
                              onClick={() => event({
                                action: 'click',
                                category: 'Course',
                                label: `View Teacher Profile - ${teacherDetails.name}`
                              })}
                            >
                              View Full Profile →
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Course Overview */}
                <div className="bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-white/5 rounded-lg p-6 border border-border/50 mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Course Overview</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {teacherDetails ? 
                      `This comprehensive course is designed to take you from foundational concepts to advanced implementation in ${teacherDetails.specialization.toLowerCase()}. You'll learn through ${teacherDetails.teachingStyle.toLowerCase()}, building real-world projects that demonstrate your skills and enhance your portfolio.` :
                      `This comprehensive course is designed to take you from foundational concepts to advanced implementation. You'll learn through a combination of theoretical understanding and hands-on practice, building real-world projects that demonstrate your skills and enhance your portfolio.`
                    }
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you're looking to start a new career in technology or advance your current skills, this course provides 
                    the structured learning path and practical experience you need to succeed in today's competitive tech industry.
                  </p>
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Learning Outcomes</h2>
                <div className="bg-card border rounded-lg p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    By the end of this course, you will have gained comprehensive knowledge and practical skills that will significantly 
                    enhance your capabilities as a developer. You'll be able to:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-foreground">Apply industry best practices and modern development methodologies</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-foreground">Build production-ready applications from scratch</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-foreground">Debug and troubleshoot complex technical issues</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-foreground">Implement scalable and maintainable code architecture</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-foreground">Deploy applications to cloud platforms and manage production environments</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-foreground">Collaborate effectively in development teams using modern tools</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What You'll Learn */}
              {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Course Curriculum</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Content - Video Titles */}
              {course.videos && course.videos.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Course Content</h2>
                  <div className="bg-card border rounded-lg">
                    {course.videos.map((video, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border-b last:border-b-0">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{video.title}</h3>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">Video {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {course.requirements && course.requirements.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="text-muted-foreground">{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features */}
              {course.features && course.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Course Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Sidebar - Course Info */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="sticky top-6">
                {/* Course Image */}
                <div className="mb-6">
                  <img 
                    src={course.imageofcourse} 
                    alt={course.courseName}
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Course Details */}
                <div className="bg-card border rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-foreground">
                      ₹{course.cost?.toLocaleString() || 'Free'}
                    </span>
                    {course.rating && (
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(course.rating!.average)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {course.rating.average} ({course.rating.count} reviews)
                        </span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/r/${categoryName.toLowerCase()}/${courseName}/play`}
                    className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:opacity-90 transition-opacity text-center block font-medium"
                  >
                    View Course
                  </Link>
                </div>

                {/* Course Stats */}
                <div className="bg-card border rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-foreground mb-4">Course Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="text-foreground">{course.duration || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level</span>
                      <span className="text-foreground">{course.level || 'Beginner'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Language</span>
                      <span className="text-foreground">{course.language || 'English'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Students</span>
                      <span className="text-foreground">{course.studentsEnrolled?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Updated</span>
                      <span className="text-foreground">{course.lastUpdated || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Similar Courses */}
                {similarCourses && similarCourses.length > 0 && (
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="font-semibold text-foreground mb-4">Similar Courses in this Category</h3>
                    <div className="space-y-4">
                      {similarCourses.map((similarCourse) => (
                        <Link
                          key={similarCourse._id}
                          href={`/r/${similarCourse.coursecategory.toLowerCase()}/${similarCourse.courseName}`}
                          className="block group hover:bg-muted/50 rounded-lg p-3 transition-colors"
                        >
                          <div className="flex items-start space-x-3">
                            <img
                              src={similarCourse.imageofcourse}
                              alt={similarCourse.courseName}
                              className="w-16 h-12 object-cover rounded-md flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors line-clamp-2">
                                {similarCourse.courseName}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {similarCourse.des}
                              </p>
                              <div className="flex items-center mt-2 space-x-2">
                                <img
                                  src={similarCourse.imageofinstructur}
                                  alt={similarCourse.instructorname}
                                  className="w-4 h-4 rounded-full"
                                />
                                <span className="text-xs text-muted-foreground">
                                  {similarCourse.instructorname}
                                </span>
                                {similarCourse.rating && (
                                  <div className="flex items-center">
                                    <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-xs text-muted-foreground">
                                      {similarCourse.rating.average.toFixed(1)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Full Width Call to Action */}
          <div className="mt-8">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Ready to Start Learning?</h3>
              <p className="text-muted-foreground mb-4">
                Join thousands of students who have already enrolled in this course.
              </p>
              <Link
                href={`/r/${categoryName.toLowerCase()}/${courseName}/play`}
                className="bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Start Learning Now
              </Link>
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
    const similarCourses = course ? getSimilarCourses(categoryName, courseName, 4) : [];
    const teacherDetails = course ? getTeacherDetails(course.instructorname) : null;

    return {
      props: {
        course: course || null,
        categoryName,
        courseName,
        similarCourses,
        teacherDetails,
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
        similarCourses: [],
        teacherDetails: null,
      },
      revalidate: 60,
    };
  }
};
