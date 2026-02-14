import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function NotFoundPage() {
  return (
    <section className="notfound-root">
      <h2 className="notfound-title">Signal lost</h2>
      <p className="notfound-text">This route is not available in the grid.</p>
      <Link className="notfound-link" to="/">
        Return to reviews
      </Link>
    </section>
  );
}

export default NotFoundPage;

