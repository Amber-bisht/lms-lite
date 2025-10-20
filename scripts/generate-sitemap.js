const fs = require('fs');
const path = require('path');
const https = require('https');

const DOMAIN = 'https://unlockedcoding.com';

// Read all categories
function getAllCategories() {
  try {
    const categoryPath = path.join(process.cwd(), 'category');
    const files = fs.readdirSync(categoryPath);
    
    const categories = [];
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(categoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        if (fileContent.trim() !== '') {
          try {
            const data = JSON.parse(fileContent);
            categories.push({
              name: data.category, // Use the category name from the JSON content
              slug: data.category  // Use the same category name for consistency
            });
          } catch (err) {
            console.error(`Error parsing ${file}:`, err.message);
          }
        }
      }
    });
    
    return categories;
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
}

// Read all courses
function getAllCourses() {
  try {
    const coursesPath = path.join(process.cwd(), 'courses');
    const files = fs.readdirSync(coursesPath);
    
    const courses = [];
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(coursesPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        try {
          const data = JSON.parse(fileContent);
          courses.push({
            courseName: data.courseName,
            category: data.coursecategory,
            subsection: data.subsection || null,
            slug: file.replace('.json', ''),
            videos: data.videos || [],
            homepage: data.homepage || false,
            lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0],
            instructorname: data.instructorname || null
          });
        } catch (err) {
          console.error(`Error parsing ${file}:`, err.message);
        }
      }
    });
    
    return courses;
  } catch (error) {
    console.error('Error reading courses:', error);
    return [];
  }
}

// Get all unique subsections
function getAllSubsections() {
  const courses = getAllCourses();
  const subsections = new Set();
  
  courses.forEach(course => {
    if (course.subsection) {
      // Handle both string and array subsections
      if (Array.isArray(course.subsection)) {
        course.subsection.forEach(sub => {
          if (sub && typeof sub === 'string') {
            subsections.add(sub);
          }
        });
      } else if (typeof course.subsection === 'string') {
        subsections.add(course.subsection);
      }
    }
  });
  
  return Array.from(subsections);
}

// Get all unique instructor names
function getAllInstructors() {
  const courses = getAllCourses();
  const instructors = new Set();
  
  courses.forEach(course => {
    if (course.instructorname) {
      instructors.add(course.instructorname);
    }
  });
  
  return Array.from(instructors);
}

// Generate sitemap XML
function generateSitemap() {
  const categories = getAllCategories();
  const courses = getAllCourses();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add homepage
  sitemap += `  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // Add featured courses section (homepage carousel)
  const featuredCourses = courses.filter(course => course.homepage === true);
  if (featuredCourses.length > 0) {
    sitemap += `  <url>
    <loc>${DOMAIN}/#featured-courses</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;
  }

  // Add all courses page
  sitemap += `  <url>
    <loc>${DOMAIN}/all</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

  // Add play page
  sitemap += `  <url>
    <loc>${DOMAIN}/play</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // Add categories index page
  sitemap += `  <url>
    <loc>${DOMAIN}/r</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // Add subsection pages
  const subsections = getAllSubsections();
  subsections.forEach(subsection => {
    // URL encode subsection to handle special characters
    const encodedSubsection = encodeURIComponent(subsection);
    sitemap += `  <url>
    <loc>${DOMAIN}/${encodedSubsection}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  // Add instructor pages
  const instructors = getAllInstructors();
  instructors.forEach(instructorName => {
    // URL encode instructor name to handle special characters
    const encodedInstructorName = encodeURIComponent(instructorName);
    sitemap += `  <url>
    <loc>${DOMAIN}/teacher/${encodedInstructorName}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  // Add privacy policy page
  sitemap += `  <url>
    <loc>${DOMAIN}/privacy</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;

  // Add terms of service page
  sitemap += `  <url>
    <loc>${DOMAIN}/terms</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;

  // Add about page
  sitemap += `  <url>
    <loc>${DOMAIN}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;

  // Add manifest.json
  sitemap += `  <url>
    <loc>${DOMAIN}/manifest.json</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
`;

  // Add category pages
  categories.forEach(category => {
    // Ensure consistent lowercase URLs
    const categorySlug = (category.name || category.slug).toLowerCase();
    sitemap += `  <url>
    <loc>${DOMAIN}/r/${encodeURIComponent(categorySlug)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  // Add course pages (with URL encoding and deduplication)
  const addedUrls = new Set();
  courses.forEach(course => {
    // URL encode the course name and category to handle special characters and spaces
    // Ensure consistent lowercase for categories
    const encodedCategory = encodeURIComponent(course.category.toLowerCase());
    const encodedCourseName = encodeURIComponent(course.courseName);
    const courseUrl = `${DOMAIN}/r/${encodedCategory}/${encodedCourseName}`;
    
    // Skip duplicates (case-insensitive)
    const courseUrlLower = courseUrl.toLowerCase();
    if (addedUrls.has(courseUrlLower)) {
      console.warn(`⚠️  Skipping duplicate course URL: ${courseUrl}`);
      return;
    }
    addedUrls.add(courseUrlLower);
    
    // Higher priority for featured courses
    const priority = course.homepage ? '0.8' : '0.7';
    const lastmod = course.lastUpdated || new Date().toISOString();
    
    // Add course page only (no individual video pages)
    sitemap += `  <url>
    <loc>${courseUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;
  
  return sitemap;
}

// Ping search engines about sitemap update
function pingSearchEngines() {
  const sitemapUrl = `${DOMAIN}/sitemap.xml`;
  
  const searchEngines = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  ];
  
  searchEngines.forEach((url, index) => {
    const engineName = index === 0 ? 'Google' : 'Bing';
    
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ ${engineName}: Sitemap pinged successfully`);
      } else {
        console.log(`⚠️  ${engineName}: Ping returned status ${res.statusCode}`);
      }
    }).on('error', (err) => {
      console.log(`❌ ${engineName}: Ping failed - ${err.message}`);
    });
  });
  
  console.log('📡 Search engine pings initiated');
}

// Main execution
try {
  const sitemap = generateSitemap();
  
  // Create public directory if it doesn't exist
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write sitemap to public directory
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  
  console.log('✅ Sitemap generated successfully!');
  console.log(`📍 Location: ${sitemapPath}`);
  console.log(`🔗 Will be available at: ${DOMAIN}/sitemap.xml`);
  
  // Count URLs and provide detailed stats
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  const courses = getAllCourses();
  const featuredCourses = courses.filter(course => course.homepage === true);
  
  console.log(`📊 Total URLs: ${urlCount}`);
  console.log(`📚 Total Courses: ${courses.length}`);
  console.log(`⭐ Featured Courses: ${featuredCourses.length}`);
  console.log(`📁 Categories: ${getAllCategories().length}`);
  console.log(`📄 Subsections: ${getAllSubsections().length}`);
  console.log(`👨‍🏫 Instructors: ${getAllInstructors().length}`);
  
  // Ping search engines
  console.log('\n🔍 Pinging search engines...');
  pingSearchEngines();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}

