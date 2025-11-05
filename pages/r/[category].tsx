import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';
import { ILightCourse } from '../../lib/dataUtils';
import { getAllCategories, getLightweightCoursesByCategory } from '../../lib/dataUtils';
import { trackCategoryView } from '../../lib/gtag';

export const runtime = 'experimental-edge';

// Dynamic import for better code splitting
const HybridCourseList = dynamic(() => import('../../components/HybridCourseList'), {
  loading: () => <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {Array.from({ length: 9 }, (_, i) => (
      <div key={i} className="bg-card rounded-lg shadow-md overflow-hidden border border-border animate-pulse">
        <div className="w-full h-32 sm:h-40 md:h-48 bg-muted"></div>
        <div className="p-4 sm:p-6">
          <div className="h-4 bg-muted rounded mb-2"></div>
          <div className="h-6 bg-muted rounded mb-3"></div>
          <div className="h-3 bg-muted rounded mb-2"></div>
          <div className="h-3 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    ))}
  </div>
});

interface CategoryPageProps {
  courses: ILightCourse[];
  categoryName: string;
}

export default function CategoryPage({ courses, categoryName }: CategoryPageProps) {
  const canonicalUrl = `https://unlockedcoding.com/r/${encodeURIComponent(categoryName.toLowerCase())}`;
  const pageTitle = `${categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Courses | Unlocked Coding`;
  const pageDescription = `Browse ${courses.length} free ${categoryName} courses. Learn with high-quality video tutorials from top instructors.`;


  // Track category view on mount
  useEffect(() => {
    trackCategoryView(categoryName);
  }, [categoryName]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": `${categoryName} Courses`,
              "description": pageDescription,
              "url": canonicalUrl,
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": courses.length,
                "itemListElement": courses.slice(0, 50).map((course, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Course",
                    "name": course.courseName,
                    "description": course.des,
                    "url": `https://unlockedcoding.com/teacher/${encodeURIComponent(course.instructorSlug)}/${encodeURIComponent(course.courseName)}`
                  }
                }))
              }
            })
          }}
        />
      </Head>
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <Link 
              href="/r" 
              className="text-sm sm:text-base text-primary hover:opacity-80 mb-3 sm:mb-4 inline-block transition-opacity"
            >
              ← Back to Categories
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground capitalize">
              {categoryName.replace(/-/g, ' ')} Courses
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              {courses.length} courses available
            </p>
          </div>

          {/* Category Overview */}
          <div className="bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-white/5 rounded-2xl p-6 sm:p-8 mb-8 border border-border/50">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              About {categoryName.replace(/-/g, ' ')} Development
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {categoryName.replace(/-/g, ' ')} is one of the most in-demand skills in today's technology landscape. 
                  This field offers exciting career opportunities and the chance to work on cutting-edge projects that shape the digital world.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our comprehensive curriculum covers everything from fundamental concepts to advanced implementation, 
                  ensuring you have the knowledge and practical skills needed to succeed in this competitive field.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-card rounded-lg p-4 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Career Opportunities</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Software Developer</li>
                    <li>• Senior Developer</li>
                    <li>• Technical Lead</li>
                    <li>• Solutions Architect</li>
                  </ul>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Average Salary Range</h3>
                  <p className="text-sm text-muted-foreground">
                    ₹6-25 LPA (Entry to Senior Level)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Path */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 mb-8 border border-border">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Recommended Learning Path
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-500 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Foundation</h3>
                <p className="text-sm text-muted-foreground">
                  Start with basic concepts and fundamental principles. Build a strong foundation for advanced learning.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-500 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Intermediate</h3>
                <p className="text-sm text-muted-foreground">
                  Apply your knowledge through hands-on projects and real-world applications.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-500 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Advanced</h3>
                <p className="text-sm text-muted-foreground">
                  Master advanced concepts and specialize in specific areas of expertise.
                </p>
              </div>
            </div>
          </div>


          <HybridCourseList courses={courses} coursesPerPage={9} />
        </div>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = getAllCategories();
    
    const paths = categories.map((category) => ({
      params: {
        category: category.category.toLowerCase(), // Normalize to lowercase
      },
    }));

    return {
      paths,
      fallback: false, // All pages are pre-rendered for Cloudflare Pages
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    // Normalize category to lowercase for case-insensitive matching
    const categoryName = (params?.category as string).toLowerCase();
    
    const courses = getLightweightCoursesByCategory(categoryName);

    return {
      props: {
        courses,
        categoryName,
      },
    };
  } catch (error) {
    console.error('Error fetching category courses:', error);
    return {
      props: {
        courses: [],
        categoryName: params?.category as string || '',
      },
    };
  }
};