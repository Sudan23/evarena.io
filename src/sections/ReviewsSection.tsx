import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewCard } from '@/components/ReviewCard';
import { reviews } from '@/data/evs';

export function ReviewsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const featuredReview = reviews[0];
  const sideReviews = reviews.slice(1, 3);

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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-10">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div>
            <span className="text-sm font-mono uppercase tracking-wider text-primary mb-3 block">
              Community
            </span>
            <h2 className="section-title">Owner Reviews</h2>
            <p className="section-subtitle">
              Real experiences from real EV owners.
            </p>
          </div>
          <Link to="/reviews">
            <Button variant="outline" className="rounded-full">
              Read All Reviews
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Reviews Grid */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Featured Review */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <ReviewCard review={featuredReview} variant="featured" />
          </div>

          {/* Side Reviews */}
          <div
            className={`lg:col-span-2 flex flex-col gap-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {sideReviews.map((review) => (
              <ReviewCard key={review.id} review={review} variant="compact" />
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div
          className={`mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-card rounded-2xl p-6 border border-border/50 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="text-2xl font-semibold">4.7</span>
            </div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border/50 text-center">
            <div className="text-2xl font-semibold text-primary mb-2">2,400+</div>
            <div className="text-sm text-muted-foreground">Reviews</div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border/50 text-center">
            <div className="text-2xl font-semibold text-primary mb-2">89%</div>
            <div className="text-sm text-muted-foreground">Would Recommend</div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border/50 text-center">
            <div className="text-2xl font-semibold text-primary mb-2">1,800+</div>
            <div className="text-sm text-muted-foreground">Verified Owners</div>
          </div>
        </div>
      </div>
    </section>
  );
}
