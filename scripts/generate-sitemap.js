const fs = require('fs');
const path = require('path');

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
            videos: data.videos || []
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
      subsections.add(course.subsection);
    }
  });
  
  return Array.from(subsections);
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

  // Add all courses page
  sitemap += `  <url>
    <loc>${DOMAIN}/all</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
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
    sitemap += `  <url>
    <loc>${DOMAIN}/${subsection}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
    
    // Add course page only (no individual video pages)
    sitemap += `  <url>
    <loc>${courseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;
  
  return sitemap;
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
  
  // Count URLs
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  console.log(`📊 Total URLs: ${urlCount}`);
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}

