import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Mail, Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  const footerLinks = {
    Browse: ['All EVs', 'By Brand', 'By Type', 'Compare'],
    Resources: ['Reviews', 'Charging Guide', 'Range Calculator', 'News'],
    Company: ['About', 'Contact', 'Careers', 'Press'],
    Legal: ['Privacy', 'Terms', 'Cookies'],
  };

  return (
    <footer ref={sectionRef} className="relative pt-24 lg:pt-32 pb-8">
      <div className="w-full px-6 lg:px-10">
        {/* Newsletter Card */}
        <div
          className={`relative overflow-hidden rounded-[2rem] bg-card border border-border/50 p-8 md:p-12 lg:p-16 mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/3 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/60 rounded-full mb-6">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono uppercase tracking-wider">
                Newsletter
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              Get the next EV drop.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Weekly picks, deals, and real-world range reports. No spam, just EVs.
            </p>

            {isSubmitted ? (
              <div className="bg-primary/10 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">You&apos;re in!</h3>
                <p className="text-muted-foreground">
                  Check your inbox for a welcome message.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 px-6 bg-background border-border/50 rounded-full text-base placeholder:text-muted-foreground/60"
                />
                <Button
                  type="submit"
                  className="h-14 px-8 bg-primary text-primary-foreground hover:brightness-110 rounded-full font-medium whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">EV-Arena</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              The ultimate destination for electric vehicle discovery, comparison, and reviews.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EV-Arena. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
