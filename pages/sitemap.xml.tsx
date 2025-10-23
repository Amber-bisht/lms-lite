import { GetServerSideProps } from 'next';
import { getAllCourses, getAllCategories } from '../lib/dataUtils';

function generateSiteMap(courses: any[], categories: any[]) {
  const baseUrl = 'https://unlockedcoding.com';
  const currentDate = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Static Pages -->
     <url>
       <loc>${baseUrl}/</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${baseUrl}/all</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>daily</changefreq>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${baseUrl}/r</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>daily</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${baseUrl}/about</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.6</priority>
     </url>
     <url>
       <loc>${baseUrl}/privacy</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
     </url>
     <url>
       <loc>${baseUrl}/terms</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
     </url>
     
     <!-- Category Pages -->
     ${categories.map(category => `
     <url>
       <loc>${baseUrl}/r/${encodeURIComponent(category.category.toLowerCase())}</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>`).join('')}
     
     <!-- Course Pages -->
     ${courses.map(course => `
     <url>
       <loc>${baseUrl}/r/${encodeURIComponent(course.coursecategory.toLowerCase())}/${encodeURIComponent(course.courseName)}</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>${baseUrl}/r/${encodeURIComponent(course.coursecategory.toLowerCase())}/${encodeURIComponent(course.courseName)}/play</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.6</priority>
     </url>`).join('')}
     
     <!-- Instructor Pages -->
     ${Array.from(new Set(courses.map(course => course.instructorname).filter(Boolean))).map(instructor => `
     <url>
       <loc>${baseUrl}/teacher/${encodeURIComponent(instructor)}</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.7</priority>
     </url>`).join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    // Get all courses and categories
    const courses = getAllCourses();
    const categories = getAllCategories();

    // Generate the XML sitemap with the courses and categories data
    const sitemap = generateSiteMap(courses, categories);

    res.setHeader('Content-Type', 'text/xml');
    // Cache for 1 hour
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.statusCode = 500;
    res.end();
    return {
      props: {},
    };
  }
};

export default SiteMap;
