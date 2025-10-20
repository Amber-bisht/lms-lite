import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  
  return (
    <header className="bg-white dark:bg-black text-black dark:text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 text-2xl font-bold text-black dark:text-white hover:underline hover:decoration-blue-500 hover:decoration-2 transition-all duration-200">
            <img 
              src="/images.png" 
              alt="UnlockedCoding Logo" 
              className="w-8 h-8 rounded-lg"
            />
            <span>{siteName}</span>
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-black dark:text-white hover:underline hover:decoration-blue-500 hover:decoration-2 transition-all duration-200">
                Home
              </Link>
              <Link href="/r" className="text-black dark:text-white hover:underline hover:decoration-blue-500 hover:decoration-2 transition-all duration-200">
                Categories
              </Link>
              <Link href="/all" className="text-black dark:text-white hover:underline hover:decoration-blue-500 hover:decoration-2 transition-all duration-200">
                All Courses
              </Link>
              <Link href="/about" className="text-black dark:text-white hover:underline hover:decoration-blue-500 hover:decoration-2 transition-all duration-200">
                About
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
