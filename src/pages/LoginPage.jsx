import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="py-16 px-4">
      <LoginForm />
      <p className="text-center text-sm text-muted mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
