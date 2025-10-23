import Layout from '../components/Layout';
import Head from 'next/head';

export default function Terms() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Unlocked Coding';
  
  return (
    <>
      <Head>
        <title>Terms of Service - {siteName}</title>
        <meta name="description" content={`Terms of Service for ${siteName}. Learn about our terms and conditions.`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://unlockedcoding.com/terms" />
        <meta property="og:title" content={`Terms of Service - ${siteName}`} />
        <meta property="og:description" content={`Terms of Service for ${siteName}. Learn about our terms and conditions.`} />
        <meta property="og:url" content="https://unlockedcoding.com/terms" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Terms of Service - ${siteName}`} />
        <meta name="twitter:description" content={`Terms of Service for ${siteName}. Learn about our terms and conditions.`} />
      </Head>
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <p className="text-muted-foreground text-lg">
              Last Updated: October 15, 2025
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using {siteName}, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Use License</h2>
              <p className="text-muted-foreground">
                Permission is granted to access and view the courses and materials on {siteName} for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on {siteName}</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. Educational Content</h2>
              <p className="text-muted-foreground">
                {siteName} provides access to educational content and courses. We aggregate and organize publicly available educational resources. The content is provided "as is" without any warranties, expressed or implied.
              </p>
              <p className="text-muted-foreground">
                We do not claim ownership of third-party content and respect the intellectual property rights of original content creators. All course materials belong to their respective creators.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. User Conduct</h2>
              <p className="text-muted-foreground">
                You agree to use {siteName} only for lawful purposes. You agree not to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Violate any applicable local, state, national, or international law</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
                <li>Interfere with or disrupt the service or servers or networks connected to the service</li>
                <li>Use any robot, spider, or other automatic device to access the service</li>
                <li>Attempt to gain unauthorized access to any portion of the service</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Disclaimer</h2>
              <p className="text-muted-foreground">
                The materials on {siteName} are provided on an 'as is' basis. {siteName} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Limitations</h2>
              <p className="text-muted-foreground">
                In no event shall {siteName} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on {siteName}, even if {siteName} or a {siteName} authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Links to Third-Party Sites</h2>
              <p className="text-muted-foreground">
                {siteName} may contain links to third-party websites or services that are not owned or controlled by {siteName}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Modifications</h2>
              <p className="text-muted-foreground">
                {siteName} may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">9. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms and conditions are governed by and construed in accordance with applicable laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">10. Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us through our community channels.
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}

