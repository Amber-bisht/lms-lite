import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { ICategory } from '../../lib/dataUtils';
import { getAllCategories } from '../../lib/dataUtils';

interface CategoriesPageProps {
  categories: ICategory[];
}

export default function CategoriesPage({ categories }: CategoriesPageProps) {
  // Sort categories: non-zero courses first (descending), then zero courses
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.totalcourse === 0 && b.totalcourse === 0) return 0;
    if (a.totalcourse === 0) return 1;
    if (b.totalcourse === 0) return -1;
    return b.totalcourse - a.totalcourse;
  });

  return (
    <>
      <Head>
        <title>All Course Categories | Unlocked Coding</title>
        <meta name="description" content={`Browse ${categories.length} categories of free programming courses including web development, DSA, system design, machine learning, and more.`} />
        <link rel="canonical" href="https://unlockedcoding.com/r" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="All Course Categories | Unlocked Coding" />
        <meta property="og:description" content="Browse all programming course categories. Find the perfect course to advance your skills." />
        <meta property="og:url" content="https://unlockedcoding.com/r" />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Programming Course Categories",
              "description": `Browse ${categories.length} categories of free programming courses`,
              "url": "https://unlockedcoding.com/r",
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": categories.length,
                "itemListElement": sortedCategories.map((category, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Course",
                    "name": category.category,
                    "description": category.des,
                    "url": `https://unlockedcoding.com/r/${category.category.toLowerCase()}`
                  }
                }))
              }
            })
          }}
        />
      </Head>
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Programming Course Categories
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-4xl mx-auto">
              Explore {categories.length} specialized categories of free programming courses. 
              From web development to machine learning, find the perfect learning path for your career goals.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="mb-8 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {sortedCategories.map((category) => (
                <Link 
                  key={category.category}
                  href={`/r/${category.category.toLowerCase()}`}
                  className="bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-border group"
                >
                  <div className="relative">
                    <img 
                      src={category.imageofcategory} 
                      alt={category.category}
                      className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-card-foreground capitalize mb-2 group-hover:text-primary transition-colors">
                      {category.category.replace(/-/g, ' ')}
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-3">
                      {category.des}
                    </p>
                    
                    {/* Category-specific information */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>{category.totalcourse} courses available</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Self-paced learning</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Industry-relevant skills</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {category.totalcourse} courses
                      </span>
                      <span className="text-xs sm:text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore Courses
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-muted-foreground mb-4">
              Choose any category above to explore courses tailored to your learning goals. 
              All courses are completely free and designed by industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/all" 
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                View All Courses
              </a>
              <a 
                href="/" 
                className="bg-card border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
              >
                Back to Home
              </a>
            </div>
          </div>

          {categories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-xl">No categories found.</p>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const categories = getAllCategories();
    
    return {
      props: {
        categories,
      },
      // Revalidate every 60 seconds for ISR
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      props: {
        categories: [],
      },
      revalidate: 60,
    };
  }
};
