import fs from 'fs';
import path from 'path';

// Define interfaces for video data
export interface IVideo {
  title: string;
  url: string;
}

// Define interfaces for course data
export interface ICourse {
  courseName: string;
  coursecategory: string;
  viewtype: 'mobile' | 'laptop' | 'both';
  des: string;
  imageofinstructur: string;
  instructorname: string;
  imageofcourse: string;
  audio: 'english' | 'hindi';
  cost: number;
  videoType: 'hls' | 'wistia' | 'youtube' | 'internetarchive' | 'redirect';
  redirecturl?: string;
  subsection?: string | string[] | null;
  videos: IVideo[];
  rank: 'high' | 'mid' | 'medium' | 'low';
  homepage?: boolean;
  _id: string;
  __v: number;
  // New fields for enhanced course info
  syllabus?: ISyllabusItem[];
  whatYouWillLearn?: string[];
  requirements?: string[];
  rating?: IRating;
  duration?: string;
  level?: string;
  language?: string;
  studentsEnrolled?: number;
  lastUpdated?: string;
  features?: string[];
}

export interface ISyllabusItem {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

export interface IRating {
  average: number;
  count: number;
  breakdown: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

// Define interfaces for category data
export interface ICategory {
  category: string;
  des: string;
  imageofcategory: string;
  totalcourse: number;
  rank: 'high' | 'mid' | 'medium' | 'low';
  _id: string;
  __v: number;
}

// Define interfaces for JSON data structure
interface JsonCourse {
  courseName: string;
  coursecategory: string;
  viewtype?: 'mobile' | 'laptop' | 'both';
  des: string;
  imageofinstructur: string;
  instructorname?: string;
  imageofcourse: string;
  audio?: 'english' | 'hindi';
  cost?: number;
  videoType: 'hls' | 'wistia' | 'youtube' | 'internetarchive' | 'redirect';
  redirecturl?: string;
  subsection?: string | string[];
  videos: IVideo[];
  rank?: 'high' | 'mid' | 'medium' | 'low';
  homepage?: boolean;
  // New fields for enhanced course info
  syllabus?: ISyllabusItem[];
  whatYouWillLearn?: string[];
  requirements?: string[];
  rating?: IRating;
  duration?: string;
  level?: string;
  language?: string;
  studentsEnrolled?: number;
  lastUpdated?: string;
  features?: string[];
}

interface JsonCategory {
  category: string;
  des: string;
  imageofcategory: string;
  rank?: 'high' | 'mid' | 'medium' | 'low';
}

// Helper function to get data directory path
function getDataPath(): string {
  return path.join(process.cwd(), 'category');
}

function getCoursesPath(): string {
  return path.join(process.cwd(), 'courses');
}

// Read all categories from JSON files
export function getAllCategories(): ICategory[] {
  try {
    const dataPath = getDataPath();
    const files = fs.readdirSync(dataPath);
    
    // Get all courses to calculate counts
    const allCourses = getAllCourses();
    
    // Create a map of category counts
    const categoryCounts: { [key: string]: number } = {};
    allCourses.forEach(course => {
      const category = course.coursecategory.toLowerCase();
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    
    const categories: any[] = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(dataPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Skip empty files
        if (fileContent.trim() === '') {
          continue;
        }
        
        try {
          const jsonData: JsonCategory = JSON.parse(fileContent);
          
          // Transform to category format compatible with ICategory
          const category = {
            category: jsonData.category,
            des: jsonData.des,
            imageofcategory: jsonData.imageofcategory,
            totalcourse: categoryCounts[jsonData.category.toLowerCase()] || 0,
            rank: jsonData.rank || 'mid',
            _id: file.replace('.json', ''),
            __v: 0
          };
          
          categories.push(category);
        } catch (parseError) {
          console.error(`Error parsing category file ${file}:`, parseError);
        }
      }
    }
    
    // Sort categories by rank and name
    categories.sort((a, b) => {
      const rankOrder: { [key: string]: number } = { high: 0, mid: 1, medium: 1, low: 2 };
      const rankDiff = rankOrder[a.rank] - rankOrder[b.rank];
      return rankDiff !== 0 ? rankDiff : a.category.localeCompare(b.category);
    });
    
    return categories as ICategory[];
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
}

// Read all courses from JSON files
export function getAllCourses(): ICourse[] {
  try {
    const coursesPath = getCoursesPath();
    const files = fs.readdirSync(coursesPath);
    
    const courses: any[] = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(coursesPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        try {
          const jsonData: JsonCourse = JSON.parse(fileContent);
          
          // Transform to course format compatible with ICourse
          const course = {
            courseName: jsonData.courseName,
            coursecategory: jsonData.coursecategory.toLowerCase(),
            viewtype: jsonData.viewtype || 'both',
            des: jsonData.des,
            imageofinstructur: jsonData.imageofinstructur,
            instructorname: jsonData.instructorname || 'Instructor',
            imageofcourse: jsonData.imageofcourse,
            audio: jsonData.audio || 'english',
            cost: jsonData.cost || 0,
            videoType: jsonData.videoType,
            redirecturl: jsonData.redirecturl,
            subsection: jsonData.subsection || null,
            videos: jsonData.videos || [],
            rank: jsonData.rank || 'mid',
            homepage: jsonData.homepage || false,
            _id: file.replace('.json', ''),
            __v: 0,
            // New fields
            syllabus: jsonData.syllabus || [],
            whatYouWillLearn: jsonData.whatYouWillLearn || [],
            requirements: jsonData.requirements || [],
            rating: jsonData.rating || { average: 4.5, count: 0, breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } },
            duration: jsonData.duration || 'N/A',
            level: jsonData.level || 'Beginner',
            language: jsonData.language || 'English',
            studentsEnrolled: jsonData.studentsEnrolled || 0,
            lastUpdated: jsonData.lastUpdated || new Date().toISOString().split('T')[0],
            features: jsonData.features || []
          };
          
          courses.push(course);
        } catch (parseError) {
          console.error(`Error parsing course file ${file}:`, parseError);
        }
      }
    }
    
    // Sort courses by rank and name
    courses.sort((a, b) => {
      const rankOrder: { [key: string]: number } = { high: 0, mid: 1, medium: 1, low: 2 };
      const rankDiff = rankOrder[a.rank] - rankOrder[b.rank];
      return rankDiff !== 0 ? rankDiff : a.courseName.localeCompare(b.courseName);
    });
    
    return courses as ICourse[];
  } catch (error) {
    console.error('Error reading courses:', error);
    return [];
  }
}

// Get courses by category
export function getCoursesByCategory(categoryName: string): ICourse[] {
  const allCourses = getAllCourses();
  return allCourses.filter(course => 
    course.coursecategory.toLowerCase() === categoryName.toLowerCase()
  );
}

// Get a specific course by category and course name
export function getCourseByName(categoryName: string, courseName: string): ICourse | null {
  const allCourses = getAllCourses();
  return allCourses.find(course => 
    course.coursecategory.toLowerCase() === categoryName.toLowerCase() &&
    course.courseName === courseName
  ) || null;
}

// Get courses by subsection
export function getCoursesBySubsection(subsectionName: string): ICourse[] {
  const allCourses = getAllCourses();
  return allCourses.filter(course => {
    if (!course.subsection) return false;
    
    // Handle both string and array subsections
    if (Array.isArray(course.subsection)) {
      return course.subsection.some(sub => 
        sub.toLowerCase() === subsectionName.toLowerCase()
      );
    } else {
      return course.subsection.toLowerCase() === subsectionName.toLowerCase();
    }
  });
}

// Get all unique subsections
export function getAllSubsections(): string[] {
  const allCourses = getAllCourses();
  const subsections = new Set<string>();
  
  allCourses.forEach(course => {
    if (course.subsection) {
      if (Array.isArray(course.subsection)) {
        course.subsection.forEach(sub => subsections.add(sub.toLowerCase()));
      } else {
        subsections.add(course.subsection.toLowerCase());
      }
    }
  });
  
  return Array.from(subsections).sort();
}

// Get categories by rank
export function getCategoriesByRank(rank: 'high' | 'mid' | 'medium' | 'low'): ICategory[] {
  const allCategories = getAllCategories();
  return allCategories.filter(category => category.rank === rank);
}

// Get courses for homepage carousel
export function getHomepageCourses(): ICourse[] {
  const allCourses = getAllCourses();
  return allCourses.filter(course => course.homepage === true);
}

