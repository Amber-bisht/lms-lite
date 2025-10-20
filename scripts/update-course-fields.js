const fs = require('fs');
const path = require('path');

// Mock data generators
const generateSyllabus = (courseName) => {
  const commonTopics = [
    "Introduction and Setup",
    "Basic Concepts and Fundamentals", 
    "Hands-on Practice and Examples",
    "Advanced Topics and Best Practices",
    "Real-world Projects and Applications",
    "Testing and Debugging",
    "Performance Optimization",
    "Deployment and Production"
  ];
  
  // Add course-specific topics based on course name
  const specificTopics = {
    'javascript': ['ES6+ Features', 'DOM Manipulation', 'Async Programming', 'Modules and Bundling'],
    'react': ['Components and Props', 'State Management', 'Hooks', 'Routing', 'Context API'],
    'python': ['Data Types and Variables', 'Control Structures', 'Functions', 'OOP Concepts', 'Libraries'],
    'java': ['Object-Oriented Programming', 'Collections Framework', 'Exception Handling', 'Multithreading'],
    'dsa': ['Arrays and Strings', 'Linked Lists', 'Trees and Graphs', 'Sorting Algorithms', 'Dynamic Programming'],
    'web': ['HTML5 and CSS3', 'Responsive Design', 'JavaScript Fundamentals', 'API Integration'],
    'mern': ['MongoDB Setup', 'Express.js Backend', 'React Frontend', 'Node.js Integration', 'Authentication'],
    'gate': ['Previous Year Questions', 'Conceptual Understanding', 'Problem Solving Techniques', 'Time Management']
  };
  
  let topics = [...commonTopics];
  
  // Add specific topics based on course name keywords
  Object.keys(specificTopics).forEach(keyword => {
    if (courseName.toLowerCase().includes(keyword)) {
      topics = [...topics, ...specificTopics[keyword]];
    }
  });
  
  return topics.slice(0, 8).map((topic, index) => ({
    id: index + 1,
    title: topic,
    duration: `${Math.floor(Math.random() * 45) + 15} min`,
    completed: false
  }));
};

const generateWhatYouWillLearn = (courseName) => {
  const commonLearnings = [
    "Master the fundamentals and core concepts",
    "Build real-world projects and applications", 
    "Understand best practices and industry standards",
    "Develop problem-solving skills",
    "Learn debugging and testing techniques"
  ];
  
  const specificLearnings = {
    'javascript': [
      "Write clean, efficient JavaScript code",
      "Understand modern ES6+ features",
      "Work with APIs and asynchronous programming"
    ],
    'react': [
      "Build interactive user interfaces",
      "Manage component state effectively", 
      "Implement routing and navigation"
    ],
    'python': [
      "Write Pythonic code following best practices",
      "Work with data structures and algorithms",
      "Build web applications and APIs"
    ],
    'java': [
      "Master object-oriented programming concepts",
      "Work with collections and generics",
      "Build enterprise-level applications"
    ],
    'dsa': [
      "Solve complex algorithmic problems",
      "Optimize time and space complexity",
      "Ace technical interviews"
    ],
    'web': [
      "Create responsive and modern websites",
      "Implement user-friendly interfaces",
      "Optimize for performance and SEO"
    ],
    'mern': [
      "Build full-stack web applications",
      "Implement user authentication and authorization",
      "Deploy applications to production"
    ],
    'gate': [
      "Solve GATE exam questions efficiently",
      "Understand core computer science concepts",
      "Develop strong problem-solving skills"
    ]
  };
  
  let learnings = [...commonLearnings];
  
  Object.keys(specificLearnings).forEach(keyword => {
    if (courseName.toLowerCase().includes(keyword)) {
      learnings = [...learnings, ...specificLearnings[keyword]];
    }
  });
  
  return learnings.slice(0, 6);
};

const generateRequirements = () => [
  "Basic computer knowledge",
  "Internet connection for video streaming",
  "Code editor (VS Code recommended)",
  "Motivation to learn and practice"
];

const generateRating = () => {
  const baseRating = 4.0 + Math.random() * 1.0; // 4.0 to 5.0
  return {
    average: Math.round(baseRating * 10) / 10,
    count: Math.floor(Math.random() * 500) + 100,
    breakdown: {
      5: Math.floor(Math.random() * 200) + 150,
      4: Math.floor(Math.random() * 100) + 50,
      3: Math.floor(Math.random() * 30) + 10,
      2: Math.floor(Math.random() * 10) + 1,
      1: Math.floor(Math.random() * 5) + 1
    }
  };
};

const generateDuration = () => {
  const hours = Math.floor(Math.random() * 20) + 5; // 5-25 hours
  const minutes = Math.floor(Math.random() * 60);
  return `${hours}h ${minutes}m`;
};

const generateLevel = (courseName) => {
  const beginnerKeywords = ['beginner', 'basic', 'introduction', 'fundamentals'];
  const advancedKeywords = ['advanced', 'expert', 'master', 'professional'];
  
  if (beginnerKeywords.some(keyword => courseName.toLowerCase().includes(keyword))) {
    return 'Beginner';
  } else if (advancedKeywords.some(keyword => courseName.toLowerCase().includes(keyword))) {
    return 'Advanced';
  } else {
    return ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)];
  }
};

const generateLanguage = () => {
  const languages = ['English', 'Hindi', 'Hinglish'];
  return languages[Math.floor(Math.random() * languages.length)];
};

// Function to update a single course file
function updateCourseFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const courseData = JSON.parse(fileContent);
    
    // Add new fields if they don't exist
    if (!courseData.syllabus) {
      courseData.syllabus = generateSyllabus(courseData.courseName);
    }
    
    if (!courseData.whatYouWillLearn) {
      courseData.whatYouWillLearn = generateWhatYouWillLearn(courseData.courseName);
    }
    
    if (!courseData.requirements) {
      courseData.requirements = generateRequirements();
    }
    
    if (!courseData.rating) {
      courseData.rating = generateRating();
    }
    
    if (!courseData.duration) {
      courseData.duration = generateDuration();
    }
    
    if (!courseData.level) {
      courseData.level = generateLevel(courseData.courseName);
    }
    
    if (!courseData.language) {
      courseData.language = generateLanguage();
    }
    
    if (!courseData.studentsEnrolled) {
      courseData.studentsEnrolled = Math.floor(Math.random() * 1000) + 100;
    }
    
    if (!courseData.lastUpdated) {
      courseData.lastUpdated = new Date().toISOString().split('T')[0];
    }
    
    if (!courseData.features) {
      courseData.features = [
        "Lifetime Access",
        "Certificate of Completion", 
        "Mobile and Desktop Access",
        "Downloadable Resources",
        "Community Support"
      ];
    }
    
    // Write updated data back to file
    fs.writeFileSync(filePath, JSON.stringify(courseData, null, 2));
    console.log(`✅ Updated: ${path.basename(filePath)}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Main function to update all course files
function updateAllCourses() {
  const coursesDir = path.join(__dirname, '..', 'courses');
  
  if (!fs.existsSync(coursesDir)) {
    console.error('❌ Courses directory not found!');
    return;
  }
  
  const files = fs.readdirSync(coursesDir);
  const jsonFiles = files.filter(file => file.endsWith('.json'));
  
  console.log(`📁 Found ${jsonFiles.length} course files to update...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  jsonFiles.forEach(file => {
    const filePath = path.join(coursesDir, file);
    const success = updateCourseFile(filePath);
    
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`✅ Successfully updated: ${successCount} files`);
  console.log(`❌ Failed to update: ${errorCount} files`);
  console.log(`📁 Total files processed: ${jsonFiles.length}`);
}

// Run the script
if (require.main === module) {
  console.log('🚀 Starting course data update...\n');
  updateAllCourses();
  console.log('\n✨ Course data update completed!');
}

module.exports = { updateAllCourses, updateCourseFile };
