import { Star, ThumbsUp, BadgeCheck } from 'lucide-react';
import type { Review } from '@/types/ev';

interface ReviewCardProps {
  review: Review;
  variant?: 'default' | 'featured' | 'compact';
}

export function ReviewCard({ review, variant = 'default' }: ReviewCardProps) {
  if (variant === 'featured') {
    return (
      <div className="ev-card h-full flex flex-col p-8">
        <div className="flex items-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < review.rating
                  ? 'fill-primary text-primary'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>
        
        <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed flex-1">
          "{review.content}"
        </blockquote>
        
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border/50">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-lg font-semibold">
              {review.author.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{review.author}</span>
              {review.verifiedOwner && (
                <BadgeCheck className="w-4 h-4 text-primary" />
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {review.vehicleOwned}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="ev-card p-5">
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < review.rating
                  ? 'fill-primary text-primary'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          "{review.content}"
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-sm font-semibold">
                {review.author.charAt(0)}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium">{review.author}</div>
              <div className="text-xs text-muted-foreground">
                {review.vehicleOwned}
              </div>
            </div>
          </div>
          {review.verifiedOwner && (
            <BadgeCheck className="w-4 h-4 text-primary" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="ev-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? 'fill-primary text-primary'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>
        {review.verifiedOwner && (
          <span className="flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-primary">
            <BadgeCheck className="w-3.5 h-3.5" />
            Verified
          </span>
        )}
      </div>
      
      <h4 className="font-semibold mb-2">{review.title}</h4>
      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
        {review.content}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <span className="font-semibold">{review.author.charAt(0)}</span>
          </div>
          <div>
            <div className="text-sm font-medium">{review.author}</div>
            <div className="text-xs text-muted-foreground">
              {review.vehicleOwned}
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ThumbsUp className="w-4 h-4" />
          {review.helpfulCount}
        </button>
      </div>
    </div>
  );
}
