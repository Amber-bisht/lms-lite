const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://unlockedcoding.com';

function slugify(value) {
  if (!value || typeof value !== 'string') {
    return '';
  }

  return value
    .toLowerCase()
    .replace(/[@&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Read all categories
function getAllCategories() {
  try {
    const newCategoryPath = path.join(process.cwd(), 'data', 'category');
    const legacyCategoryPath = path.join(process.cwd(), 'category');
    const categoryPath = fs.existsSync(newCategoryPath) ? newCategoryPath : legacyCategoryPath;

    if (!fs.existsSync(categoryPath)) {
      console.warn('Category directory not found');
      return [];
    }
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
              slug: data.category
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
    const newCoursesPath = path.join(process.cwd(), 'data', 'courses');
    const legacyCoursesPath = path.join(process.cwd(), 'courses');
    const coursesPath = fs.existsSync(newCoursesPath) ? newCoursesPath : legacyCoursesPath;

    if (!fs.existsSync(coursesPath)) {
      console.warn('Courses directory not found');
      return [];
    }
    const files = fs.readdirSync(coursesPath);
    
    const courses = [];
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(coursesPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        try {
          const data = JSON.parse(fileContent);
          const teacherRaw = data.teacherId || data.instructorSlug || data.instructorname || '';
          const teacherSlug = slugify(teacherRaw);
          courses.push({
            courseName: data.courseName,
            category: data.coursecategory,
            subsection: data.subsection || null,
            slug: file.replace('.json', ''),
            homepage: data.homepage || false,
            lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0],
            teacherId: teacherSlug || null,
            teacherSlug
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

// Read all blogs
function getAllBlogs() {
  try {
    const blogsDir = path.join(process.cwd(), 'data', 'blog');
    const posts = [];
    const seenIds = new Set();

    if (fs.existsSync(blogsDir)) {
      const files = fs
        .readdirSync(blogsDir)
        .filter(file => file.toLowerCase().endsWith('.json'));

      const parseJsonFragments = (rawContent) => {
        const trimmed = rawContent.trim();
        if (!trimmed) return [];

        const candidates = Array.from(new Set([
          trimmed,
          trimmed.replace(/,\s*$/, ''),
          `[${trimmed}]`,
          `[${trimmed.replace(/,\s*$/, '')}]`
        ]));

        for (const candidate of candidates) {
          try {
            const parsed = JSON.parse(candidate);
            if (Array.isArray(parsed)) {
              return parsed;
            }
            if (parsed && typeof parsed === 'object') {
              return [parsed];
            }
          } catch (error) {
            // continue to next candidate
          }
        }

        return [];
      };

      files.forEach(file => {
        const filePath = path.join(blogsDir, file);

        try {
          const rawContent = fs.readFileSync(filePath, 'utf8');
          const entries = parseJsonFragments(rawContent);

          entries.forEach(entry => {
            if (!entry || !entry.id || seenIds.has(entry.id)) {
              return;
            }

            posts.push(entry);
            seenIds.add(entry.id);
          });
        } catch (error) {
          console.error(`Error parsing blog file ${file}:`, error.message);
        }
      });

      if (posts.length > 0) {
        return posts;
      }
    }

    const legacyBlogsPath = path.join(process.cwd(), 'data', 'blogs.json');
    if (fs.existsSync(legacyBlogsPath)) {
      const fileContent = fs.readFileSync(legacyBlogsPath, 'utf8');
      try {
        const blogs = JSON.parse(fileContent);
        return blogs;
      } catch (legacyError) {
        console.error('Error parsing legacy blogs.json:', legacyError.message);
      }
    }

    return [];
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
}

// Get all unique subsections
function getAllSubsections() {
  const courses = getAllCourses();
  const subsections = new Set();
  
  courses.forEach(course => {
    if (course.subsection) {
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
    if (course.teacherSlug) {
      instructors.add(course.teacherSlug);
    }
  });
  
  return Array.from(instructors);
}

// Generate sitemap XML
function generateSitemap() {
  const categories = getAllCategories();
  const courses = getAllCourses();
  const blogs = getAllBlogs();
  const subsections = getAllSubsections();
  const instructors = getAllInstructors();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // 1. Homepage
  sitemap += `  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // 2. Static Pages
  const staticPages = [
    { path: '/all', priority: '0.9', changefreq: 'daily' },
    { path: '/r', priority: '0.8', changefreq: 'daily' },
    { path: '/about', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
    { path: '/terms', priority: '0.5', changefreq: 'monthly' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/faq', priority: '0.6', changefreq: 'monthly' },
    { path: '/cookie-policy', priority: '0.5', changefreq: 'monthly' }
  ];

  staticPages.forEach(page => {
    sitemap += `  <url>
    <loc>${DOMAIN}${page.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  // 3. Blog Pages
  sitemap += `  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // Individual blog pages
  blogs.forEach(blog => {
    sitemap += `  <url>
    <loc>${DOMAIN}/blog/${blog.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  // 4. Subsection Pages
  subsections.forEach(subsection => {
    const encodedSubsection = encodeURIComponent(subsection);
    sitemap += `  <url>
    <loc>${DOMAIN}/${encodedSubsection}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  // 5. Instructor/Teacher Pages
  instructors.forEach(instructorName => {
    const encodedInstructorName = encodeURIComponent(instructorName);
    sitemap += `  <url>
    <loc>${DOMAIN}/teacher/${encodedInstructorName}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  // 6. Category Pages (Only specific categories)
  const allowedCategories = ['dsa', 'web-development', 'gate'];
  allowedCategories.forEach(categorySlug => {
    sitemap += `  <url>
    <loc>${DOMAIN}/r/${encodeURIComponent(categorySlug)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  // 7. Course Pages (with deduplication)
  const addedUrls = new Set();
  courses.forEach(course => {
    const encodedTeacherSlug = encodeURIComponent(course.teacherSlug || '');
    const encodedCourseName = encodeURIComponent(course.courseName);
    
    if (!encodedTeacherSlug) {
      return;
    }

    // Course detail page
    const courseUrl = `${DOMAIN}/teacher/${encodedTeacherSlug}/${encodedCourseName}`;
    const courseUrlLower = courseUrl.toLowerCase();
    
    if (!addedUrls.has(courseUrlLower)) {
      addedUrls.add(courseUrlLower);
      const priority = course.homepage ? '0.8' : '0.7';
      const lastmod = course.lastUpdated || new Date().toISOString();
      
      sitemap += `  <url>
    <loc>${courseUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
    }

  });

  sitemap += `</urlset>`;
  
  return sitemap;
}

// Ping search engines about sitemap update
function pingSearchEngines() {
  const sitemapUrl = `${DOMAIN}/sitemap.xml`;
  
  const https = require('https');
  
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
  const blogs = getAllBlogs();
  const featuredCourses = courses.filter(course => course.homepage === true);
  
  console.log(`\n📊 Sitemap Statistics:`);
  console.log(`📄 Total URLs: ${urlCount}`);
  console.log(`📚 Total Courses: ${courses.length}`);
  console.log(`⭐ Featured Courses: ${featuredCourses.length}`);
  console.log(`📝 Blog Posts: ${blogs.length}`);
  console.log(`📁 Category Pages in Sitemap: 3 (dsa, web-development, gate)`);
  console.log(`📄 Subsections: ${getAllSubsections().length}`);
  console.log(`👨‍🏫 Instructors: ${getAllInstructors().length}`);
  console.log(`🔗 Static Pages: ${8 + 1} (homepage + static)`);
  
  // Ping search engines
  console.log('\n🔍 Pinging search engines...');
  pingSearchEngines();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
