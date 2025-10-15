import Layout from '../components/Layout';
import Head from 'next/head';

export default function Privacy() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Unlocked Coding';
  
  return (
    <>
      <Head>
        <title>Privacy Policy - {siteName}</title>
        <meta name="description" content={`Privacy Policy for ${siteName}. Learn about how we protect your privacy.`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://unlockedcoding.com/privacy" />
      </Head>
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <p className="text-muted-foreground text-lg">
              Last Updated: October 15, 2025
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to {siteName}. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
              <p className="text-muted-foreground">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, products and services</li>
                <li><strong>Cookie Data:</strong> Information collected through cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>To provide and maintain our service</li>
                <li>To improve, personalize, and expand our service</li>
                <li>To understand and analyze how you use our service</li>
                <li>To develop new products, services, features, and functionality</li>
                <li>To communicate with you for customer service and support</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to track activity on our service and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p className="text-muted-foreground">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Google AdSense</h2>
              <p className="text-muted-foreground">
                We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.
              </p>
              <p className="text-muted-foreground">
                You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a> or <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aboutads.info</a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Third-Party Services</h2>
              <p className="text-muted-foreground">
                Our service may contain links to third-party websites and services that are not owned or controlled by {siteName}. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
              </p>
              <p className="text-muted-foreground">
                We strongly advise you to review the privacy policy of every site you visit.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Data Security</h2>
              <p className="text-muted-foreground">
                The security of your data is important to us. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security. We implement appropriate technical and organizational measures to protect the personal data that we collect and process.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Data Retention</h2>
              <p className="text-muted-foreground">
                We will retain your personal data only for as long as is necessary for the purposes set out in this privacy policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">9. Your Privacy Rights</h2>
              <p className="text-muted-foreground">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The right to access – You have the right to request copies of your personal data</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate</li>
                <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions</li>
                <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions</li>
                <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">10. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">11. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date at the top of this privacy policy.
              </p>
              <p className="text-muted-foreground">
                You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">12. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this privacy policy, please contact us through our community channels.
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}

