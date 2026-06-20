import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const githubRepoUrl = "https://github.com/dhanushkaruppan/movie-genre-classifier";

  return (
    <footer className="w-full py-8 bg-surface-container-lowest border-t border-white/5 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-gutter max-w-container-max mx-auto">
        <div className="font-label-md text-label-md text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed-dim text-sm">memory</span>
          NeuralFlow Engine
        </div>
        <div className="font-code-sm text-code-sm text-on-surface-variant">© 2026 NeuralFlow Engine. Precision Machine Learning Architectures.</div>
        <div className="flex gap-6">
          <Link className="nav-link font-code-sm text-code-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors" to="/docs">Documentation</Link>
          <a className="nav-link font-code-sm text-code-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors" href="#">Privacy</a>
          <a className="nav-link font-code-sm text-code-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors" href="#">API Status</a>
          <a className="nav-link font-code-sm text-code-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors" href={githubRepoUrl}>GitHub Repo</a>
        </div>
      </div>
    </footer>
  );
}
