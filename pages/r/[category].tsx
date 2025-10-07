import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { ICourse } from '../../lib/dataUtils';
import { getAllCategories, getCoursesByCategory } from '../../lib/dataUtils';

interface CategoryPageProps {
  courses: ICourse[];
  categoryName: string;
}

export default function CategoryPage({ courses, categoryName }: CategoryPageProps) {

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/r" 
            className="text-sm sm:text-base text-primary hover:opacity-80 mb-3 sm:mb-4 inline-block transition-opacity"
          >
            ← Back to Categories
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground capitalize">
            {categoryName} Courses
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            {courses.length} courses available
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-xl">
              No courses found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {courses.map((course) => {
              // Handle redirect type courses
              if (course.videoType === 'redirect' && course.redirecturl) {
                return (
                  <a
                    key={course.courseName}
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
                      <div className="flex justify-between items-center">
                        <span className="text-green-600 font-bold text-sm sm:text-base">
                          ${course.cost}
                        </span>
                        <span className="text-xs sm:text-sm text-blue-600 font-medium">
                          External Link
                        </span>
                      </div>
                    </div>
                  </a>
                );
              }

              // Regular course cards
              return (
                <Link 
                  key={course.courseName}
                  href={`/r/${categoryName}/${encodeURIComponent(course.courseName)}`}
                  className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-border"
                >
                  <img 
                    src={course.imageofcourse} 
                    alt={course.courseName}
                    className="w-full h-32 sm:h-40 md:h-48 object-cover"
                  />
                  <div className="p-4 sm:p-6">
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
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-bold text-sm sm:text-base">
                        ${course.cost}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {course.videos.length} videos
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = getAllCategories();
    
    const paths = categories.map((category) => ({
      params: {
        category: category.category,
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
    
    const courses = getCoursesByCategory(categoryName);

    return {
      props: {
        courses,
        categoryName,
      },
      revalidate: 60, // Revalidate every 60 seconds for ISR
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    return {
      props: {
        courses: [],
        categoryName: params?.category as string,
      },
      revalidate: 60,
    };
  }
};
