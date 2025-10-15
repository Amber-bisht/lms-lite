const fs = require('fs');
const path = require('path');

// Read all courses directly since we can't import ES6 modules in Node.js script
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
          courses.push(data);
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

function generateVideoSitemap() {
  try {
    const courses = getAllCourses();
    const baseUrl = 'https://unlockedcoding.com';
    
    // Start building the sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

    // Add course pages
    courses.forEach(course => {
      const courseUrl = `${baseUrl}/r/${encodeURIComponent(course.coursecategory.toLowerCase())}/${encodeURIComponent(course.courseName)}`;
      const lastmod = new Date().toISOString();
      
      sitemap += `  <url>
    <loc>${courseUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
`;
      
      // Add video entries for each video in the course (now pointing to course page)
      if (course.videos && Array.isArray(course.videos)) {
        course.videos.forEach((video, index) => {
        sitemap += `    <video:video>
      <video:thumbnail_loc>${course.imageofcourse}</video:thumbnail_loc>
      <video:title><![CDATA[${video.title}]]></video:title>
      <video:description><![CDATA[${course.des} - ${video.title}]]></video:description>
      <video:content_loc>${video.url}</video:content_loc>
      <video:player_loc allow_embed="yes" autoplay="autostart">${courseUrl}</video:player_loc>
      <video:duration>3600</video:duration>
      <video:publication_date>${new Date().toISOString()}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:category>${course.coursecategory}</video:category>
      <video:tag><![CDATA[${course.instructorname || 'instructor'}]]></video:tag>
      <video:tag><![CDATA[${course.coursecategory}]]></video:tag>
      <video:tag><![CDATA[programming]]></video:tag>
      <video:tag><![CDATA[${course.audio || 'english'}]]></video:tag>
    </video:video>
`;
        });
      }
      
      sitemap += `  </url>
`;
    });

    sitemap += `</urlset>`;

    // Write the sitemap to public directory
    const sitemapPath = path.join(__dirname, '../public/video-sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    
    console.log(`Video sitemap generated successfully at ${sitemapPath}`);
    console.log(`Total courses: ${courses.length}`);
    console.log(`Total videos: ${courses.reduce((total, course) => total + (course.videos ? course.videos.length : 0), 0)}`);
    
  } catch (error) {
    console.error('Error generating video sitemap:', error);
  }
}

// Run the script
generateVideoSitemap();
