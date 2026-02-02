import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
      {/* Logo - Sesuaikan dengan nama blog di Figma */}
      <Link href="/" className="text-2xl font-bold text-blog-dark tracking-tighter">
        BLOG<span className="text-blue-600">.</span>
      </Link>

      {/* Menu & Auth Buttons */}
      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-6 text-text-lg font-medium text-gray-600">
          <Link href="/" className="hover:text-blog-dark transition">Home</Link>
          <Link href="/search" className="hover:text-blog-dark transition">Search</Link>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/login" 
            className="px-5 py-2 text-text-lg font-semibold text-blog-dark hover:bg-gray-50 rounded-full transition"
          >
            Log in
          </Link>
          <Link 
            href="/register" 
            className="px-5 py-2 text-text-lg font-semibold bg-blog-dark text-white rounded-full hover:bg-black transition"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;