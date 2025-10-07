import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { ICategory } from '../../lib/dataUtils';
import { getAllCategories } from '../../lib/dataUtils';

interface CategoriesPageProps {
  categories: ICategory[];
}

export default function CategoriesPage({ categories }: CategoriesPageProps) {

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8 text-center">
          All Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.category}
              href={`/r/${category.category}`}
              className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 border border-border"
            >
              <img 
                src={category.imageofcategory} 
                alt={category.category}
                className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg mb-3 sm:mb-4"
              />
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-card-foreground capitalize mb-2">
                {category.category}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                {category.des}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {category.totalcourse} courses
                </span>
                <span className="text-xs sm:text-sm text-primary font-medium">
                  View Courses →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-xl">No categories found.</p>
          </div>
        )}
      </div>
    </Layout>
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
