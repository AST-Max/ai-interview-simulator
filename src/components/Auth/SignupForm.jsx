import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await signupUser(name, email, password);
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-surface border border-surfaceBorder p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-heading">Create Account</h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1 text-gray-200">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-surfaceBorder bg-darker text-heading rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1 text-gray-200">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-surfaceBorder bg-darker text-heading rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-200">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full border border-surfaceBorder bg-darker text-heading rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}
