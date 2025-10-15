// Optimized structured data utilities

export interface OptimizedCourseData {
  courseName: string;
  des: string;
  instructorname?: string;
  imageofcourse: string;
  coursecategory: string;
  videos: Array<{
    title: string;
    url: string;
  }>;
}

export function generateOptimizedCourseStructuredData(
  course: OptimizedCourseData,
  categoryName: string,
  courseName: string
) {
  const canonicalUrl = `https://unlockedcoding.com/r/${encodeURIComponent(categoryName.toLowerCase())}/${encodeURIComponent(courseName)}`;
  
  // Only include essential structured data to reduce size
  return {
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
      "name": course.instructorname || "Course Instructor"
    },
    "courseMode": "online",
    "educationalLevel": "beginner",
    "url": canonicalUrl,
    "image": course.imageofcourse,
    // Only include video count instead of full video objects
    "numberOfCredits": course.videos.length,
    "hasPart": course.videos.map((video, index) => ({
      "@type": "VideoObject",
      "name": video.title,
      "url": `${canonicalUrl}/${index}`
    }))
  };
}

export function generateOptimizedVideoStructuredData(
  course: OptimizedCourseData,
  video: { title: string; url: string },
  videoIndex: number,
  categoryName: string,
  courseName: string
) {
  const canonicalUrl = `https://unlockedcoding.com/r/${encodeURIComponent(categoryName.toLowerCase())}/${encodeURIComponent(courseName)}/${videoIndex}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": `${course.des} - ${video.title}`,
    "thumbnailUrl": course.imageofcourse,
    "uploadDate": new Date().toISOString(),
    "duration": "PT1H", // Default duration
    "url": canonicalUrl,
    "contentUrl": video.url,
    "publisher": {
      "@type": "Organization",
      "name": "Unlocked Coding",
      "url": "https://unlockedcoding.com"
    },
    "instructor": {
      "@type": "Person",
      "name": course.instructorname || "Course Instructor"
    },
    "partOfSeries": {
      "@type": "VideoSeries",
      "name": course.courseName,
      "url": `https://unlockedcoding.com/r/${encodeURIComponent(categoryName.toLowerCase())}/${encodeURIComponent(courseName)}`
    }
  };
}
