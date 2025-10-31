import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import { event } from '../../lib/gtag';
import { IBlogPost, loadBlogPosts } from '../../lib/dataUtils';

interface BlogProps {
  posts: IBlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Unlocked Coding';

  // Track blog page view
  useEffect(() => {
    event({
      action: 'page_view',
      category: 'Blog',
      label: 'Blog Page',
    });
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": `${siteName} Blog`,
    "description": "Educational guides, tutorials, and resources for students and developers. Learn about free tools, student programs, and developer resources.",
    "url": "https://unlockedcoding.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": "https://unlockedcoding.com"
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.name,
      "description": post.description,
      "image": post.image,
      "datePublished": new Date().toISOString(),
      "url": `https://unlockedcoding.com/blog/${post.id}`
    }))
  };

  return (
    <>
      <Head>
        <title>Blog - Student Resources & Developer Guides | {siteName}</title>
        <meta name="description" content="Discover free student resources, developer tools, and educational guides. Learn about GitHub Student Pack, JetBrains licenses, cloud credits, and more." />
        <link rel="canonical" href="https://unlockedcoding.com/blog" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Blog - Student Resources & Developer Guides | ${siteName}`} />
        <meta property="og:description" content="Discover free student resources, developer tools, and educational guides for students and developers." />
        <meta property="og:url" content="https://unlockedcoding.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Blog - Student Resources & Developer Guides | ${siteName}`} />
        <meta name="twitter:description" content="Discover free student resources, developer tools, and educational guides." />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Student Resources Blog
            </h1>
          </div>

          {/* All Posts */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {posts.map((post) => (
                <div 
                  key={post.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link 
                    href={`/blog/${post.id}`}
                    className="block"
                    onClick={() => event({
                      action: 'click',
                      category: 'Blog',
                      label: `Blog Post - ${post.name}`
                    })}
                  >
                    <div className="relative">
                      <img 
                        src={post.image} 
                        alt={post.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 line-clamp-2">
                      {post.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                      {post.description}
                    </p>
                    
                    {/* Requirements Preview */}
                    {post.requirements && post.requirements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-foreground mb-2">Requirements:</h4>
                        <div className="flex flex-wrap gap-1">
                          {post.requirements.slice(0, 2).map((req, index) => (
                            <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                              {req}
                            </span>
                          ))}
                          {post.requirements.length > 2 && (
                            <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                              +{post.requirements.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* YouTube Link */}
                    {post.youtubeTutorialLink && (
                      <div className="mb-4">
                        <a
                          href={post.youtubeTutorialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            event({
                              action: 'click',
                              category: 'Blog',
                              label: `YouTube Tutorial - ${post.name}`
                            });
                          }}
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          Tutorial
                        </a>
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-white/10 rounded-2xl p-8 sm:p-12 border border-border/50">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Stay Updated
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get the latest student resources, developer tools, and educational guides delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                  onClick={() => event({
                    action: 'click',
                    category: 'Newsletter',
                    label: 'Subscribe Button'
                  })}
                >
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Join our community of 44,000+ learners
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  try {
    const posts = loadBlogPosts();

    return {
      props: {
        posts,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error loading blog data:', error);

    return {
      props: {
        posts: [],
      },
      revalidate: 3600,
    };
  }
}
