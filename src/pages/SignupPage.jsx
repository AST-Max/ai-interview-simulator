import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../components/Auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="py-16 px-4">
      <SignupForm />
      <p className="text-center text-sm text-muted mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium">
          Login
        </Link>
      </p>
    </div>
  );
}
