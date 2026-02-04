import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NavigationProps {
  compareCount?: number;
}

export function Navigation({ compareCount = 0 }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/browse', label: 'Browse' },
    { href: '/compare', label: 'Compare', badge: compareCount > 0 ? compareCount : undefined },
    { href: '/reviews', label: 'Reviews' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-10">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
              EV-Arena
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                  isActive(link.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.label}
                  {link.badge && (
                    <span className="flex items-center justify-center w-5 h-5 text-xs bg-primary text-primary-foreground rounded-full">
                      {link.badge}
                    </span>
                  )}
                </span>
                {isActive(link.href) && (
                  <span className="absolute inset-0 bg-secondary rounded-full -z-10" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:brightness-110 rounded-full px-5"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card border-border">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-semibold">EV-Arena</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                        isActive(link.href)
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground hover:bg-secondary/50'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="flex items-center justify-center w-5 h-5 text-xs bg-primary text-primary-foreground rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  <Button variant="outline" className="w-full rounded-full">
                    Sign In
                  </Button>
                  <Button className="w-full bg-primary text-primary-foreground rounded-full">
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
