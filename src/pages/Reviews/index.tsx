import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';

const LOCAL_STORAGE_KEY = 'cyberpunk-reviews';

type Review = {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
};

const loadReviews = (): Review[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item) =>
      item &&
      typeof item.id === 'string' &&
      typeof item.name === 'string' &&
      typeof item.rating === 'number' &&
      typeof item.message === 'string' &&
      typeof item.createdAt === 'string'
    );
  } catch {
    return [];
  }
};

function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(() => loadReviews());
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  const averageRating = useMemo(() => {
    if (!reviews.length) {
      return 0;
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    const newReview: Review = {
      id: `${Date.now()}`,
      name: trimmedName || 'Anonymous',
      rating,
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
    };

    setReviews((current) => [newReview, ...current]);
    setMessage('');
  };

  return (
    <div className="reviews-root">
      <section className="reviews-hero">
        <div>
          <p className="reviews-kicker">Nightwave Reviews</p>
          <h2 className="reviews-title">Cyberpunk Feedback Terminal</h2>
          <p className="reviews-subtitle">
            Drop your signal below. Reviews appear instantly and persist locally.
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
            <button className="primary" type="submit">
              Add review
            </button>
          </form>
        </div>

        <div className="panel">
          <h3 className="panel-title">Live feed</h3>
          {reviews.length === 0 ? (
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

