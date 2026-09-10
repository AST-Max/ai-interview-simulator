import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-darker border-b border-surfaceBorder">
      <Link to="/" className="text-lg font-semibold text-heading">
        Interview Simulator
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/dashboard" className="text-muted hover:text-heading transition">
              Dashboard
            </Link>
            <span className="text-muted text-sm">{user.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm rounded-md bg-surface text-heading hover:bg-surfaceBorder transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-muted hover:text-heading transition">
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1.5 text-sm rounded-md bg-primary text-heading hover:bg-secondary transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
