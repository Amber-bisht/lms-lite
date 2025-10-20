import { useState, useEffect } from 'react';
import Link from 'next/link';
import CourseSkeleton from './CourseSkeleton';
import { ICourse, ILightCourse } from '../lib/dataUtils';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { shouldUsePagination } from '../lib/seoUtils';

interface HybridCourseListProps {
  courses: ICourse[] | ILightCourse[];
  coursesPerPage?: number;
}

export default function HybridCourseList({ 
  courses, 
  coursesPerPage = 12 
}: HybridCourseListProps) {
  const [usePagination, setUsePagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    // Check if we should use pagination (for crawlers)
    setUsePagination(shouldUsePagination());
  }, []);

  // Infinite scroll hook for regular users
  const {
    displayedItems: infiniteScrollCourses,
    hasMore,
    isLoading,
    loadMore
  } = useInfiniteScroll(courses, {
    itemsPerPage: coursesPerPage,
    totalItems: courses.length,
    threshold: 300
  });

  // Pagination logic for crawlers
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const paginatedCourses = courses.slice(startIndex, endIndex);

  const displayedCourses = usePagination ? paginatedCourses : infiniteScrollCourses;

  const renderCourseCard = (course: ICourse | ILightCourse) => {
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
              <span className="text-xs sm:text-sm text-green-600 font-semibold">
                ${course.cost || '0'}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-card-foreground mb-2 line-clamp-2">
              {course.courseName}
            </h3>
            <div className="flex items-center mb-3">
              <img
                src={course.imageofinstructur}
                alt={course.instructorname}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full mr-2 flex-shrink-0 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-muted rounded-full mr-2 flex-shrink-0 hidden"></div>
              <span className="text-xs sm:text-sm text-muted-foreground truncate">
                {course.instructorname}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-3">
              {course.des}
            </p>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span className="text-primary font-medium">External Link</span>
              <span>{course.audio || 'English'}</span>
            </div>
          </div>
        </a>
      );
    }

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
            <span className="text-xs sm:text-sm text-green-600 font-semibold">
              ${course.cost || '0'}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-card-foreground mb-2 line-clamp-2">
            {course.courseName}
          </h3>
          <div className="flex items-center mb-3">
            <img
              src={course.imageofinstructur}
              alt={course.instructorname}
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full mr-2 flex-shrink-0 object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-muted rounded-full mr-2 flex-shrink-0 hidden"></div>
            <span className="text-xs sm:text-sm text-muted-foreground truncate">
              {course.instructorname}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-3">
            {course.des}
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{'length' in course.videos ? course.videos.length : (course.videos as any)?.length || 0} videos</span>
            <span>{course.audio || 'English'}</span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayedCourses.map(renderCourseCard)}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-xl">No courses found.</p>
        </div>
      )}

      {/* Pagination for Crawlers */}
      {usePagination && totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (currentPage <= 4) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = currentPage - 3 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages} • {courses.length} courses total
            </p>
          </div>
        </div>
      )}

      {/* Infinite Scroll for Users */}
      {!usePagination && (
        <>
          {/* Loading Skeletons */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
              {Array.from({ length: coursesPerPage }, (_, i) => (
                <CourseSkeleton key={`skeleton-${i}`} />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && !isLoading && (
            <div className="mt-8 flex flex-col items-center space-y-4">
              <button
                onClick={loadMore}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Load More Courses
              </button>
              <p className="text-sm text-muted-foreground text-center">
                Showing {infiniteScrollCourses.length} of {courses.length} courses
              </p>
            </div>
          )}
          
          {!hasMore && infiniteScrollCourses.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                You've reached the end! All {courses.length} courses are loaded.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}
