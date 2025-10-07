export default function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'iTub LMS';
  
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-white/5 border-t border-border/50 py-16 mt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-white bg-clip-text text-transparent mb-6">
          {siteName}
        </h3>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your gateway to mastering programming and technology. Learn, build, and grow with our comprehensive courses.
        </p>
        <div className="text-muted-foreground text-sm">
          &copy; 2025 {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
