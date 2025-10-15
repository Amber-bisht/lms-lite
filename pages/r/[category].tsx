import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import HybridCourseList from '../../components/HybridCourseList';
import { ICourse } from '../../lib/dataUtils';
import { getAllCategories, getCoursesByCategory } from '../../lib/dataUtils';
import { trackCategoryView } from '../../lib/gtag';

interface CategoryPageProps {
  courses: ICourse[];
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
                    "url": `https://unlockedcoding.com/r/${categoryName.toLowerCase()}/${encodeURIComponent(course.courseName)}`
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
      fallback: 'blocking', // Enable ISR (Incremental Static Regeneration)
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    // Normalize category to lowercase for case-insensitive matching
    const categoryName = (params?.category as string).toLowerCase();
    
    const courses = getCoursesByCategory(categoryName);

    return {
      props: {
        courses,
        categoryName,
      },
      // Revalidate every 60 seconds for ISR
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching category courses:', error);
    return {
      props: {
        courses: [],
        categoryName: params?.category as string || '',
      },
      revalidate: 60,
    };
  }
};