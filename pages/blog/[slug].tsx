import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import { event } from '../../lib/gtag';
import { IBlogPost, getBlogPostById, loadBlogPosts } from '../../lib/dataUtils';

export const runtime = 'edge';

interface BlogPostPageProps {
  post: IBlogPost | null;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Unlocked Coding';

  // Track blog post view
  useEffect(() => {
    if (post) {
      event({
        action: 'page_view',
        category: 'Blog',
        label: `Blog Post - ${post.name}`,
      });
    }
  }, [post]);

  if (!post) {
    return (
      <>
        <Head>
          <title>Post Not Found | {siteName}</title>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <Layout>
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Post Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                The blog post you're looking for doesn't exist.
              </p>
              <Link 
                href="/blog" 
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  const canonicalUrl = `https://unlockedcoding.com/blog/${post.id}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.name,
    "description": post.description,
    "image": post.image,
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": "https://unlockedcoding.com"
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "url": canonicalUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", ")
  };

  return (
    <>
      <Head>
        <title>{post.name} | {siteName}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.name} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={siteName} />
        <meta property="article:section" content={post.category} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.name} />
        <meta name="twitter:description" content={post.description} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link 
              href="/blog" 
              className="text-sm text-primary hover:opacity-80 mb-3 inline-block transition-opacity"
            >
              ← Back to Blog
            </Link>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Article Header */}
            <header className="mb-8 sm:mb-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.name}
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground mb-6 leading-relaxed">
                {post.description}
              </p>
              
              {/* YouTube Tutorial Link */}
              {post.youtubeTutorialLink && (
                <div className="mb-6">
                  <a
                    href={post.youtubeTutorialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                    onClick={() => event({
                      action: 'click',
                      category: 'Blog',
                      label: `YouTube Tutorial - ${post.name}`
                    })}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch Tutorial Video
                  </a>
                </div>
              )}
            </header>

            {/* Blog Image */}
            {post.image && (
              <div className="mb-8 sm:mb-12">
                <img 
                  src={post.image} 
                  alt={post.name}
                  className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
            )}

            {/* Blog Content */}
            {post.content && (
              <article className="mb-8 sm:mb-12">
                <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
                  <div className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                    {post.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            )}

            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Requirements Section */}
                {post.requirements && post.requirements.length > 0 && (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
                    <ul className="space-y-2">
                      {post.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Steps Section */}
                {post.steps && post.steps.length > 0 && (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Step-by-Step Guide</h2>
                    <ol className="space-y-4">
                      {post.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-muted-foreground leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Links Section */}
                {post.links && post.links.length > 0 && (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Useful Links</h2>
                    <div className="space-y-3">
                      {post.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                          onClick={() => event({
                            action: 'click',
                            category: 'Blog',
                            label: `External Link - ${link.name}`
                          })}
                        >
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span className="font-medium text-foreground">{link.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags Section */}
                {post.tags && post.tags.length > 0 && (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm hover:bg-muted/80 transition-colors">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Call to Action */}
            <div className="mt-8 sm:mt-12 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-white/10 rounded-2xl p-6 sm:p-8 border border-border/50">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                  Ready to Start Learning?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Put your knowledge into practice with our comprehensive programming courses.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/r"
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                    onClick={() => event({
                      action: 'click',
                      category: 'CTA',
                      label: 'Browse Courses - Blog Post'
                    })}
                  >
                    Browse Courses
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-muted text-foreground px-8 py-3 rounded-lg hover:bg-muted/80 transition-colors font-semibold"
                    onClick={() => event({
                      action: 'click',
                      category: 'CTA',
                      label: 'Contact Us - Blog Post'
                    })}
                  >
                    Get Help
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = loadBlogPosts();

    const paths = posts.map(post => ({
      params: {
        slug: post.id,
      },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Error generating blog post paths:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const post = getBlogPostById(slug);

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error('Error loading blog post:', error);
    
    return {
      props: {
        post: null,
      },
    };
  }
};
