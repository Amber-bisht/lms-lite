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
              name: data.category,
              slug: file.replace('.json', '')
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
            slug: file.replace('.json', '')
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

  // Add category pages
  categories.forEach(category => {
    sitemap += `  <url>
    <loc>${DOMAIN}/r/${category.slug}</loc>
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
    const encodedCategory = encodeURIComponent(course.category);
    const encodedCourseName = encodeURIComponent(course.courseName);
    const url = `${DOMAIN}/r/${encodedCategory}/${encodedCourseName}`;
    
    // Skip duplicates
    if (addedUrls.has(url)) {
      console.warn(`⚠️  Skipping duplicate URL: ${url}`);
      return;
    }
    addedUrls.add(url);
    
    sitemap += `  <url>
    <loc>${url}</loc>
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

