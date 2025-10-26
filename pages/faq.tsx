import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { event } from '../lib/gtag';

export default function FAQ() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Unlocked Coding';
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Track FAQ page view
  useEffect(() => {
    event({
      action: 'page_view',
      category: 'FAQ',
      label: 'FAQ Page',
    });
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
    event({
      action: 'click',
      category: 'FAQ',
      label: `FAQ ${index + 1} - ${faqs[index].question}`,
    });
  };

  const faqs = [
    {
      question: "Are all courses really free?",
      answer: "Yes, absolutely! All courses on Unlocked Coding are completely free. We believe that quality programming education should be accessible to everyone, regardless of their financial situation. There are no hidden fees, no premium tiers, and no paywalls."
    },
    {
      question: "How do I get started with learning programming?",
      answer: "Start by browsing our course categories to find a topic that interests you. We recommend beginners start with our 'Programming' category, which includes courses on Python, JavaScript, and other fundamental languages. Each course includes prerequisites, so you can choose the right level for your current knowledge."
    },
    {
      question: "What programming languages do you cover?",
      answer: "We cover a wide range of programming languages including Python, JavaScript, Java, C++, C, and more. Our courses also cover frameworks like React, Node.js, Express, and technologies like MongoDB, PostgreSQL, AWS, Docker, and Kubernetes."
    },
    {
      question: "Do you provide certificates upon completion?",
      answer: "Currently, we focus on providing high-quality educational content rather than formal certificates. However, the skills and projects you build through our courses will serve as excellent portfolio pieces that demonstrate your abilities to potential employers."
    },
    {
      question: "How long does it take to complete a course?",
      answer: "Course duration varies depending on the complexity and your learning pace. Most courses range from 20-100+ hours of content. You can learn at your own pace and revisit any section as needed. We recommend setting aside 2-3 hours per day for consistent progress."
    },
    {
      question: "Can I get help if I'm stuck on a course?",
      answer: "Absolutely! We provide support through our Telegram community (t.me/unlocked_chat) where you can ask questions and get help from fellow learners and our team. You can also contact our support team directly at t.me/un_devs for personalized assistance."
    },
    {
      question: "Are the courses suitable for complete beginners?",
      answer: "Yes! Many of our courses are designed for complete beginners. Look for courses marked as 'Beginner' level. We also provide prerequisites for each course, so you can choose the right starting point for your current knowledge level."
    },
    {
      question: "Do you offer career guidance and job placement help?",
      answer: "While we don't provide direct job placement services, our courses are designed to make you job-ready. We cover industry-standard technologies and best practices. Our community also shares job opportunities and career advice regularly."
    },
    {
      question: "How often are courses updated?",
      answer: "We regularly update our courses to keep them current with the latest technologies and industry practices. Course updates are typically noted in the course description, and we strive to maintain relevance with current industry standards."
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Yes! Our platform is fully responsive and works on all devices including smartphones and tablets. You can learn on the go and access your courses from anywhere with an internet connection."
    },
    {
      question: "What if I want to learn multiple technologies?",
      answer: "That's great! Our platform offers courses across multiple categories including Web Development, Data Structures & Algorithms, System Design, Machine Learning, and more. You can take multiple courses simultaneously and build a comprehensive skill set."
    },
    {
      question: "Are there any prerequisites for taking courses?",
      answer: "Prerequisites vary by course. Some courses are designed for complete beginners, while others may require basic knowledge of programming concepts. Each course page clearly lists the prerequisites, so you can choose courses appropriate for your skill level."
    },
    {
      question: "How do I track my progress?",
      answer: "You can track your progress by completing video lessons and projects within each course. While we don't have a formal progress tracking system yet, you can keep track of completed sections and projects in your personal notes."
    },
    {
      question: "Can I download course materials?",
      answer: "Course videos are streamed online for the best learning experience. However, you can access all course content anytime through our platform. We recommend taking notes and creating your own reference materials as you learn."
    },
    {
      question: "What makes Unlocked Coding different from other platforms?",
      answer: "Our platform is completely free, features industry experts as instructors, and focuses on practical, hands-on learning. We're community-driven and provide direct access to instructors and fellow learners through our Telegram community."
    },
    {
      question: "How can I contribute to the platform?",
      answer: "We welcome contributions! You can help by sharing feedback, suggesting new courses, participating in our community discussions, and helping fellow learners. Contact us at t.me/un_devs if you're interested in contributing content or becoming an instructor."
    },
    {
      question: "Do you offer courses in languages other than English?",
      answer: "Most of our courses are in English, but we do have some courses available in Hindi (Hinglish). We're working to expand our multilingual offerings based on community demand."
    },
    {
      question: "What if I find an error in a course?",
      answer: "We appreciate feedback! If you find any errors or issues in our courses, please report them through our Telegram support channel (t.me/un_devs) or community chat (t.me/unlocked_chat). We'll review and correct them promptly."
    },
    {
      question: "Can I suggest new courses or topics?",
      answer: "Absolutely! We value community input and regularly add new courses based on learner requests. You can suggest new topics through our Telegram community or contact our support team directly."
    },
    {
      question: "How do I stay updated with new courses and features?",
      answer: "Join our Telegram channel (t.me/unlocked_coding) to stay updated with new courses, platform updates, and learning resources. We also announce new features and improvements through our community channels."
    },
    {
      question: "Is there a limit to how many courses I can take?",
      answer: "No limits at all! You can take as many courses as you want, whenever you want. Our platform is designed to support your learning journey across multiple technologies and skill levels."
    },
    {
      question: "What if I have technical issues with the platform?",
      answer: "If you encounter any technical issues, please contact our support team at t.me/un_devs. We typically respond within 24 hours and will help resolve any problems you're experiencing with the platform."
    },
    {
      question: "Do you have any partnerships with companies or universities?",
      answer: "We're continuously building partnerships with educational institutions and tech companies to expand our course offerings and provide additional learning opportunities. Stay tuned to our community channels for partnership announcements."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Head>
        <title>Frequently Asked Questions - {siteName}</title>
        <meta name="description" content={`Find answers to common questions about ${siteName} courses, learning process, and platform features. Get help with your programming journey.`} />
        <link rel="canonical" href="https://unlockedcoding.com/faq" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`FAQ - ${siteName}`} />
        <meta property="og:description" content={`Find answers to common questions about ${siteName} courses and platform features.`} />
        <meta property="og:url" content="https://unlockedcoding.com/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`FAQ - ${siteName}`} />
        <meta name="twitter:description" content={`Find answers to common questions about ${siteName} courses and platform features.`} />
        
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
              Frequently Asked Questions
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Find answers to common questions about our courses, learning process, and platform features.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-white/10 rounded-2xl p-8 sm:p-12 border border-border/50">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is here to help you succeed in your learning journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://t.me/un_devs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                  onClick={() => event({
                    action: 'click',
                    category: 'FAQ',
                    label: 'Contact Support - FAQ Page'
                  })}
                >
                  Contact Support Team
                </a>
                <a
                  href="https://t.me/unlocked_chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted text-foreground px-8 py-3 rounded-lg hover:bg-muted/80 transition-colors font-semibold"
                  onClick={() => event({
                    action: 'click',
                    category: 'FAQ',
                    label: 'Join Community - FAQ Page'
                  })}
                >
                  Join Community Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
