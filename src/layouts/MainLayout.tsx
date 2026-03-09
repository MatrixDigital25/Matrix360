import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import { cn } from '@/src/utils/cn';

const LOGO_URL = "/M360_logo.png";

export function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-secondary-bg text-text-main">
      <header className="sticky top-0 z-50 w-full bg-brand-primary text-white shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-white">
            <img src={LOGO_URL} alt="Matrix360 Consulting" className="h-10 md:h-12 w-auto" />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-white/90">
            <Link to="/platform" className="hover:text-interaction-primary transition-colors">Platform</Link>
            <Link to="/services" className="hover:text-interaction-primary transition-colors">Services</Link>
            <Link to="/automation" className="hover:text-interaction-primary transition-colors">Automation</Link>
            <Link to="/consultants" className="hover:text-interaction-primary transition-colors">Experts</Link>
            <Link to="/about" className="hover:text-interaction-primary transition-colors">About</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-white/90 hover:text-interaction-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/consultant" className="text-sm font-medium text-white/90 hover:text-interaction-primary transition-colors">
              Log In
            </Link>
            <Link to="/apply" className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-[var(--color-interaction-secondary)] to-[var(--color-ai-violet)] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interaction-primary">
              Apply as Consultant
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="border-t border-border-light bg-primary-bg py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-text-main mb-4">
              <img src={LOGO_URL} alt="Matrix360 Consulting" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-text-muted">
              Strategic intelligence platform connecting organizations with expert consultants and AI-driven strategy tools.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-text-main mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link to="/enterprise" className="hover:text-interaction-primary">Enterprise Portal</Link></li>
              <li><Link to="/consultant" className="hover:text-interaction-primary">Consultant Portal</Link></li>
              <li><Link to="/consultants" className="hover:text-interaction-primary">Consultant Network</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-text-main mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link to="/about" className="hover:text-interaction-primary">About Us</Link></li>
              <li><Link to="/case-studies" className="hover:text-interaction-primary">Case Studies</Link></li>
              <li><Link to="/contact" className="hover:text-interaction-primary">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-interaction-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
