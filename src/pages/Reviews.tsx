import { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewCard } from '@/components/ReviewCard';
import { reviews } from '@/data/evs';

export function Reviews() {
  const [filter, setFilter] = useState<'all' | '5' | '4' | '3'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'helpful' | 'rating'>('newest');

  const filteredReviews = reviews.filter((review) => {
    if (filter === 'all') return true;
    return review.rating === parseInt(filter);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === 'helpful') {
      return b.helpfulCount - a.helpfulCount;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fourStarCount = reviews.filter((r) => r.rating === 4).length;
  const threeStarCount = reviews.filter((r) => r.rating === 3).length;

  return (
    <main className="relative pt-24 lg:pt-32 pb-16">
      <div className="w-full px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Owner Reviews</h1>
          <p className="text-muted-foreground max-w-2xl">
            Real experiences from real EV owners. Read honest reviews about range, charging, 
            comfort, and everyday usability.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="text-3xl font-semibold">{averageRating.toFixed(1)}</span>
            </div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(averageRating)
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="text-3xl font-semibold">{reviews.length}</span>
            </div>
            <div className="text-sm text-muted-foreground">Total Reviews</div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="w-5 h-5 text-primary" />
              <span className="text-3xl font-semibold">
                {Math.round((reviews.filter((r) => r.rating >= 4).length / reviews.length) * 100)}%
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Would Recommend</div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl font-semibold">
                {reviews.filter((r) => r.verifiedOwner).length}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Verified Owners</div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 mb-12 border border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">AI Review Summary</h3>
              <p className="text-sm text-muted-foreground">Based on {reviews.length} reviews</p>
            </div>
          </div>
          <p className="text-lg leading-relaxed">
            Owners consistently praise the <span className="text-primary font-medium">instant torque</span> and{' '}
            <span className="text-primary font-medium">silent operation</span> of electric vehicles. 
            The most appreciated features are home charging convenience and lower running costs. 
            Some mention charging infrastructure as a consideration for long trips, but overall 
            satisfaction is very high with <span className="text-primary font-medium">89% would recommend</span> their EV to others.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {['Range', 'Charging', 'Performance', 'Comfort', 'Value'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-background/50 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {[
              { value: 'all', label: 'All Reviews', count: reviews.length },
              { value: '5', label: '5 Stars', count: fiveStarCount },
              { value: '4', label: '4 Stars', count: fourStarCount },
              { value: '3', label: '3 Stars', count: threeStarCount },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value as typeof filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-card border border-border/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="newest">Newest First</option>
              <option value="helpful">Most Helpful</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Load More */}
        {sortedReviews.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" className="rounded-full">
              Load More Reviews
            </Button>
          </div>
        )}

        {/* Empty State */}
        {sortedReviews.length === 0 && (
          <div className="text-center py-20">
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-2">No reviews found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more reviews.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
