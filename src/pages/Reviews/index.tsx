import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';
import { apiConfig } from '../../config/api';

type Review = {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
};

type ApiReview = {
  id: number;
  userName: string;
  reviewText: string;
  vote: number;
  createdAt: string;
  updatedAt: string;
};

type ReviewsResponse = {
  items: ApiReview[];
};

const mapApiReview = (review: ApiReview): Review => ({
  id: String(review.id),
  name: review.userName || 'Anonymous',
  rating: review.vote,
  message: review.reviewText,
  createdAt: review.createdAt,
});

const getReviewsUrl = () => `${apiConfig.baseUrl}/reviews`;

function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const averageRating = useMemo(() => {
    if (!reviews.length) {
      return 0;
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(getReviewsUrl(), {
          headers: {
            accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load reviews');
        }

        const data = (await response.json()) as ReviewsResponse;
        if (isMounted) {
          setReviews(Array.isArray(data.items) ? data.items.map(mapApiReview) : []);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load reviews');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(getReviewsUrl(), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: trimmedName || 'Anonymous',
          reviewText: trimmedMessage,
          vote: rating,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const data = (await response.json()) as ApiReview;
      const newReview = mapApiReview(data);

      setReviews((current) => [newReview, ...current]);
      setMessage('');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reviews-root">
      <section className="reviews-hero">
        <div>
          <p className="reviews-kicker">Nightwave Reviews</p>
          <h2 className="reviews-title">Cyberpunk Feedback Terminal</h2>
          <p className="reviews-subtitle">
            Drop your signal below. Reviews appear instantly and persist via API.
          </p>
        </div>
        <div className="reviews-stats">
          <div>
            <span className="stat-label">Total</span>
            <span className="stat-value">{reviews.length}</span>
          </div>
          <div>
            <span className="stat-label">Avg rating</span>
            <span className="stat-value">{averageRating || '--'}</span>
          </div>
        </div>
      </section>

      <section className="reviews-grid">
        <div className="panel">
          <h3 className="panel-title">Add a review</h3>
          <form className="review-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Neo Runner"
                aria-label="Name"
              />
            </label>
            <label className="field">
              <span>Rating</span>
              <select
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
                aria-label="Rating"
              >
                <option value={5}>5 - Legendary</option>
                <option value={4}>4 - Solid</option>
                <option value={3}>3 - Neutral</option>
                <option value={2}>2 - Glitchy</option>
                <option value={1}>1 - Critical</option>
              </select>
            </label>
            <label className="field">
              <span>Review</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Share the signal..."
                rows={4}
                aria-label="Review"
                required
              />
            </label>
            <button className="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Add review'}
            </button>
            {error ? <p className="form-error">{error}</p> : null}
          </form>
        </div>

        <div className="panel">
          <h3 className="panel-title">Live feed</h3>
          {isLoading ? (
            <p className="empty">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="empty">No reviews yet. Be the first signal.</p>
          ) : (
            <div className="review-list">
              {reviews.map((review, index) => (
                <article className="review-card" key={`${review.id}-${index}`}>
                  <div className="review-header">
                    <span className="review-name">{review.name}</span>
                    <span className="review-rating">{review.rating}/5</span>
                  </div>
                  <p className="review-message">{review.message}</p>
                  <span className="review-time">
                    {new Date(review.createdAt).toLocaleString()}
                  </span>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ReviewsPage;

