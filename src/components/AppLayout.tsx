import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './AppLayout.css';

function AppLayout() {
  return (
    <div className="layout-root">
      <header className="layout-header">
        <div className="layout-brand">
          <span className="brand-glow" aria-hidden="true" />
          <div>
            <p className="brand-kicker">Nightwave</p>
            <h1 className="brand-title">Cyberpunk Console</h1>
          </div>
        </div>
        <nav className="layout-nav" aria-label="Primary">
          <NavLink to="/" end className="nav-link">
            Reviews
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </nav>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      <footer className="layout-footer">
        <span>Local signals only. No external transmission.</span>
      </footer>
    </div>
  );
}

export default AppLayout;

