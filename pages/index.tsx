import Layout from '../components/Layout';

export default function Home() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-center">
        {/* Hero Section with Gradient Background */}
        <div className="relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating Code Icons */}
            <div className="absolute top-10 left-10 w-8 h-8 text-blue-400/30 animate-float">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 4l-6 8 6 8V4zm8 0v16l6-8-6-8z"/>
              </svg>
            </div>
            <div className="absolute top-20 right-20 w-6 h-6 text-purple-400/30 animate-float-delayed">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="absolute bottom-20 left-16 w-10 h-10 text-pink-400/30 animate-float-slow">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div className="absolute bottom-10 right-10 w-7 h-7 text-green-400/30 animate-float">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
              </svg>
            </div>
            
            {/* Floating Geometric Shapes */}
            <div className="absolute top-32 left-1/4 w-4 h-4 bg-blue-500/20 rounded-full animate-float-reverse"></div>
            <div className="absolute top-40 right-1/3 w-3 h-3 bg-purple-500/20 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-pink-500/20 rounded-full animate-float-slow"></div>
            <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-green-500/20 rounded-full animate-float"></div>
            
            {/* Floating Dots */}
            <div className="absolute top-16 left-1/2 w-1 h-1 bg-white/40 rounded-full animate-float"></div>
            <div className="absolute top-24 right-1/2 w-1.5 h-1.5 bg-white/30 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-16 left-1/2 w-1 h-1 bg-white/40 rounded-full animate-float-slow"></div>
            <div className="absolute bottom-24 right-1/2 w-1.5 h-1.5 bg-white/30 rounded-full animate-float"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 sm:mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome to {siteName}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto px-4 leading-relaxed">
              Your gateway to mastering programming and technology. 
              <span className="text-primary font-semibold"> Learn, build, and grow</span> with our comprehensive courses designed by industry experts.
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 mb-16 sm:mb-20">
              <a 
                href="/r" 
                className="group w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 sm:px-10 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  Browse Categories
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              <a 
                href="/all" 
                className="group w-full sm:w-auto bg-card border-2 border-primary text-primary px-8 sm:px-10 py-4 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  View All Courses
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>




        {/* Telegram Community Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 border border-border/50 rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto text-center mt-32 sm:mt-40">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Telegram Icon with Animation */}
            <div className="relative inline-block mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              {/* Floating rings around icon */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border border-blue-300/20 animate-ping animation-delay-1000"></div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Join Our Community
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with fellow learners, get daily challenges, peer support, and mentor Q&A sessions.
            </p>

            {/* Enhanced Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 hover:bg-card/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Daily Programming Challenges</h3>
                <p className="text-sm text-muted-foreground">Sharpen your skills with daily coding problems and real-world projects</p>
              </div>

              <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 hover:bg-card/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Peer Support Network</h3>
                <p className="text-sm text-muted-foreground">Connect with like-minded learners and get help when you need it</p>
              </div>

              <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 hover:bg-card/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Mentor Q&A Sessions</h3>
                <p className="text-sm text-muted-foreground">Get direct access to industry experts and experienced developers</p>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <a 
                href={process.env.NEXT_PUBLIC_TELEGRAM_GROUP_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 sm:px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  Join Telegram Group
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              <a 
                href={process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 sm:px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  Join Telegram Channel
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
