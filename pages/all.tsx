import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import { ICourse } from '../lib/dataUtils';
import { getAllCourses } from '../lib/dataUtils';

interface AllCoursesPageProps {
  courses: ICourse[];
}

export default function AllCoursesPage({ courses }: AllCoursesPageProps) {

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8 text-center">
          All Courses
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {courses.map((course) => {
            // Handle redirect type courses
            if (course.videoType === 'redirect' && course.redirecturl) {
              return (
                <a
                  key={`${course.coursecategory}-${course.courseName}`}
                  href={course.redirecturl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-border"
                >
                  <img 
                    src={course.imageofcourse} 
                    alt={course.courseName}
                    className="w-full h-32 sm:h-40 md:h-48 object-cover"
                  />
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs sm:text-sm text-primary font-medium capitalize">
                        {course.coursecategory}
                      </span>
                      <span className="text-green-600 font-bold text-sm sm:text-base">
                        ${course.cost}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-2">
                      {course.courseName}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <img 
                        src={course.imageofinstructur} 
                        alt={course.instructorname || "Instructor"}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs text-muted-foreground">{course.instructorname || "Instructor"}</span>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                      {course.des}
                    </p>
                    <div className="flex justify-between items-center text-xs sm:text-sm text-muted-foreground">
                      <span className="text-blue-600 font-medium">External Link</span>
                      <span className="capitalize">{course.audio}</span>
                    </div>
                  </div>
                </a>
              );
            }

            // Regular course cards
            return (
              <Link 
                key={`${course.coursecategory}-${course.courseName}`}
                href={`/r/${course.coursecategory.toLowerCase()}/${encodeURIComponent(course.courseName)}`}
                className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-border"
              >
                <img 
                  src={course.imageofcourse} 
                  alt={course.courseName}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover"
                />
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs sm:text-sm text-primary font-medium capitalize">
                      {course.coursecategory}
                    </span>
                    <span className="text-green-600 font-bold text-sm sm:text-base">
                      ${course.cost}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-2">
                    {course.courseName}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <img 
                      src={course.imageofinstructur} 
                      alt={course.instructorname || "Instructor"}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs text-muted-foreground">{course.instructorname || "Instructor"}</span>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                    {course.des}
                  </p>
                  <div className="flex justify-between items-center text-xs sm:text-sm text-muted-foreground">
                    <span>{course.videos.length} videos</span>
                    <span className="capitalize">{course.audio}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-xl">No courses found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const courses = getAllCourses();
    
    return {
      props: {
        courses,
      },
      // Revalidate every 60 seconds for ISR
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    return {
      props: {
        courses: [],
      },
      revalidate: 60,
    };
  }
};
