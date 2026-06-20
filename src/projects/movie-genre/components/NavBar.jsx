import React from 'react';
import { Logo3D } from './ThreeCanvas';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const githubRepoUrl = "https://github.com/dhanushkaruppan/movie-genre-classifier";

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="flex justify-between items-center px-margin-desktop py-3 max-w-container-max mx-auto">
        <Link to="/" className="font-headline-md text-headline-md font-bold tracking-tighter text-primary-fixed-dim flex items-center gap-3">
          <Logo3D />
          <span className="bg-gradient-to-r from-white to-primary-fixed-dim bg-clip-text text-transparent tracking-widest uppercase text-lg">Movie Genre Classifier</span>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="nav-link font-label-md text-label-md text-on-surface-variant hover:text-primary-fixed-dim pb-1 transition-all duration-200">Home</Link>
          <Link to="/docs" className="nav-link font-label-md text-label-md text-primary-fixed-dim pb-1 transition-all duration-200">Documentation</Link>
          <a className="nav-link font-label-md text-label-md text-on-surface-variant hover:text-primary-fixed-dim pb-1 transition-all duration-200" href="#">Architecture</a>
          <a className="nav-link font-label-md text-label-md text-on-surface-variant hover:text-primary-fixed-dim pb-1 transition-all duration-200" href="#">Training</a>
        </div>
        <div className="flex items-center gap-4">
          <a href={githubRepoUrl} className="btn-glow bg-surface-container-high border border-primary-fixed-dim/30 text-primary-fixed-dim font-label-md text-label-md px-5 py-2 rounded-lg hover:bg-primary-fixed-dim/10 transition-all duration-250 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">code</span>
            GitHub Repo
          </a>
        </div>
      </div>
    </nav>
  );
}
