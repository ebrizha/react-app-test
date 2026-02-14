import React from 'react';
import './styles.css';

function AboutPage() {
  return (
    <section className="about-root">
      <h2 className="about-title">About the console</h2>
      <p className="about-text">
        This is a modular, page-based layout designed for quick expansion. Add a
        new page under <code>src/pages</code>, wire it in <code>src/App.tsx</code>,
        and style it locally.
      </p>
      <div className="about-card">
        <h3>Module hints</h3>
        <ul>
          <li>Layout stays shared in <code>src/components/AppLayout.tsx</code>.</li>
          <li>Pages stay isolated in <code>src/pages</code>.</li>
          <li>Use local CSS files for page styles.</li>
        </ul>
      </div>
    </section>
  );
}

export default AboutPage;

