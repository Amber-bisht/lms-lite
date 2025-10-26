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

// Cache for courses to avoid repeated file reads
let coursesCache: ICourse[] | null = null;
let coursesCacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Read all courses from JSON files with caching
export function getAllCourses(): ICourse[] {
  const now = Date.now();
  
  // Return cached data if still valid
  if (coursesCache && (now - coursesCacheTime) < CACHE_DURATION) {
    return coursesCache;
  }
  
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
    
    // Cache the result
    coursesCache = courses as ICourse[];
    coursesCacheTime = now;
    
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

// Lightweight course interface for list pages (reduces bundle size)
export interface ILightCourse {
  courseName: string;
  coursecategory: string;
  des: string;
  imageofinstructur: string;
  instructorname: string;
  imageofcourse: string;
  audio: 'english' | 'hindi';
  cost: number;
  videoType: 'hls' | 'wistia' | 'youtube' | 'internetarchive' | 'redirect';
  redirecturl?: string;
  subsection?: string | string[] | null;
  videos: { length: number }; // Only store length, not full video data
  rank: 'high' | 'mid' | 'medium' | 'low';
  homepage?: boolean;
  _id: string;
  __v: number;
  // Optional enhanced fields for UI display
  rating?: IRating;
  level?: string;
  whatYouWillLearn?: string[];
  duration?: string;
  language?: string;
  studentsEnrolled?: number;
  lastUpdated?: string;
  requirements?: string[];
  features?: string[];
}

// Get lightweight courses for list pages (reduces data size significantly)
export function getLightweightCourses(): ILightCourse[] {
  const allCourses = getAllCourses();
  return allCourses.map(course => ({
    courseName: course.courseName,
    coursecategory: course.coursecategory,
    des: course.des,
    imageofinstructur: course.imageofinstructur,
    instructorname: course.instructorname,
    imageofcourse: course.imageofcourse,
    audio: course.audio,
    cost: course.cost,
    videoType: course.videoType,
    redirecturl: course.redirecturl,
    subsection: course.subsection,
    videos: { length: course.videos.length }, // Only store length
    rank: course.rank,
    homepage: course.homepage,
    _id: course._id,
    __v: course.__v,
    // Include optional enhanced fields
    rating: course.rating,
    level: course.level,
    whatYouWillLearn: course.whatYouWillLearn,
    duration: course.duration,
    language: course.language,
    studentsEnrolled: course.studentsEnrolled,
    lastUpdated: course.lastUpdated,
    requirements: course.requirements,
    features: course.features,
  }));
}

// Get lightweight courses by category
export function getLightweightCoursesByCategory(categoryName: string): ILightCourse[] {
  const allCourses = getLightweightCourses();
  return allCourses.filter(course => 
    course.coursecategory.toLowerCase() === categoryName.toLowerCase()
  );
}

// Get lightweight courses by subsection
export function getLightweightCoursesBySubsection(subsectionName: string): ILightCourse[] {
  const allCourses = getLightweightCourses();
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

// Define interfaces for reviews data
export interface IReview {
  id: number;
  name: string;
  rating: number;
  review: string;
  course: string;
  location: string;
}

export interface IReviewsData {
  reviews: IReview[];
  averageRating: number;
  totalReviews: number;
}

// Define interfaces for placements data
export interface IPlacement {
  id: number;
  company: string;
  logo: string;
  studentsPlaced: number;
  averagePackage: string;
  roles: string[];
}

export interface IPlacementsData {
  placements: IPlacement[];
  totalStudentsPlaced: number;
  averagePackage: string;
}

// Helper function to get data directory path
function getDataDirectoryPath(): string {
  return path.join(process.cwd(), 'data');
}

// Read reviews data from JSON file
export function getReviewsData(): IReviewsData {
  try {
    const dataPath = getDataDirectoryPath();
    const filePath = path.join(dataPath, 'reviews.json');
    
    if (!fs.existsSync(filePath)) {
      console.warn('Reviews data file not found, returning empty data');
      return {
        reviews: [],
        averageRating: 0,
        totalReviews: 0
      };
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const reviewsData: IReviewsData = JSON.parse(fileContent);
    
    return reviewsData;
  } catch (error) {
    console.error('Error reading reviews data:', error);
    return {
      reviews: [],
      averageRating: 0,
      totalReviews: 0
    };
  }
}

// Read placements data from JSON file
export function getPlacementsData(): IPlacementsData {
  try {
    const dataPath = getDataDirectoryPath();
    const filePath = path.join(dataPath, 'placements.json');
    
    if (!fs.existsSync(filePath)) {
      console.warn('Placements data file not found, returning empty data');
      return {
        placements: [],
        totalStudentsPlaced: 0,
        averagePackage: '₹0 LPA'
      };
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const placementsData: IPlacementsData = JSON.parse(fileContent);
    
    return placementsData;
  } catch (error) {
    console.error('Error reading placements data:', error);
    return {
      placements: [],
      totalStudentsPlaced: 0,
      averagePackage: '₹0 LPA'
    };
  }
}

// Define interface for teacher data
export interface ITeacher {
  name: string;
  image: string;
  courseCount: number;
  categories: string[];
}

// Enhanced teacher interface for detailed teacher data
export interface ITeacherDetail {
  id: string;
  name: string;
  displayName: string;
  bio: string;
  expertise: string[];
  experience: string;
  studentsHelped: string;
  specialization: string;
  teachingStyle: string;
  achievements: string[];
  image: string;
  socialLinks: {
    youtube?: string;
    telegram?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    website?: string;
  };
}

// Load teacher data from JSON file
export function loadTeacherData(): ITeacherDetail[] {
  try {
    const teachersPath = path.join(process.cwd(), 'data', 'teachers.json');
    const teachersData = JSON.parse(fs.readFileSync(teachersPath, 'utf8'));
    return teachersData;
  } catch (error) {
    console.error('Error loading teacher data:', error);
    return [];
  }
}

// Get teacher details by instructor name
export function getTeacherDetails(instructorName: string): ITeacherDetail | null {
  try {
    const teachers = loadTeacherData();
    
    // Try to find teacher by exact name match first
    let teacher = teachers.find(t => 
      t.name.toLowerCase() === instructorName.toLowerCase() ||
      t.displayName.toLowerCase() === instructorName.toLowerCase()
    );
    
    // If not found, try partial matching
    if (!teacher) {
      teacher = teachers.find(t => 
        t.name.toLowerCase().includes(instructorName.toLowerCase()) ||
        t.displayName.toLowerCase().includes(instructorName.toLowerCase()) ||
        instructorName.toLowerCase().includes(t.name.toLowerCase()) ||
        instructorName.toLowerCase().includes(t.displayName.toLowerCase())
      );
    }
    
    return teacher || null;
  } catch (error) {
    console.error('Error getting teacher details:', error);
    return null;
  }
}

// Get unique teachers from all courses
export function getUniqueTeachers(): ITeacher[] {
  try {
    const allCourses = getAllCourses();
    const teacherMap = new Map<string, ITeacher>();
    
    allCourses.forEach(course => {
      const teacherName = course.instructorname || 'Unknown Teacher';
      const teacherImage = course.imageofinstructur || '';
      const category = course.coursecategory;
      
      if (teacherMap.has(teacherName)) {
        const existingTeacher = teacherMap.get(teacherName)!;
        existingTeacher.courseCount += 1;
        if (!existingTeacher.categories.includes(category)) {
          existingTeacher.categories.push(category);
        }
      } else {
        teacherMap.set(teacherName, {
          name: teacherName,
          image: teacherImage,
          courseCount: 1,
          categories: [category]
        });
      }
    });
    
    // Convert map to array and sort by course count (most courses first)
    const teachers = Array.from(teacherMap.values())
      .sort((a, b) => b.courseCount - a.courseCount)
      .slice(0, 8); // Limit to top 8 teachers
    
    return teachers;
  } catch (error) {
    console.error('Error getting unique teachers:', error);
    return [];
  }
}

// Get similar courses in the same category (excluding the current course)
export function getSimilarCourses(categoryName: string, currentCourseName: string, limit: number = 4): ILightCourse[] {
  try {
    const allCourses = getLightweightCourses();
    const similarCourses = allCourses.filter(course => 
      course.coursecategory.toLowerCase() === categoryName.toLowerCase() &&
      course.courseName !== currentCourseName
    );
    
    // Sort by rank and rating, then limit results
    return similarCourses
      .sort((a, b) => {
        const rankOrder: { [key: string]: number } = { high: 0, mid: 1, medium: 1, low: 2 };
        const rankDiff = rankOrder[a.rank] - rankOrder[b.rank];
        if (rankDiff !== 0) return rankDiff;
        
        // If ranks are equal, sort by rating
        const aRating = a.rating?.average || 0;
        const bRating = b.rating?.average || 0;
        return bRating - aRating;
      })
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting similar courses:', error);
    return [];
  }
}

