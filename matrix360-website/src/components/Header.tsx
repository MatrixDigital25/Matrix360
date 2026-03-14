import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-300 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-light to-accent-teal rounded-full border-2 border-accent-light"></div>
          <span className="text-xl font-bold text-accent hidden sm:inline">MATRIX 360</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/for-enterprises" className="text-gray-600 hover:text-accent transition">For Enterprises</Link>
          <Link href="/for-consultants" className="text-gray-600 hover:text-accent transition">For Consultants</Link>
          <Link href="/pricing" className="text-gray-600 hover:text-accent transition">Pricing</Link>
          <Link href="/about" className="text-gray-600 hover:text-accent transition">About</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-accent hover:text-accent-light transition">Sign In</Link>
          <Link href="/enterprise-signup" className="btn btn-primary text-sm">Start Trial</Link>
        </div>
      </div>
    </header>
  );
}
