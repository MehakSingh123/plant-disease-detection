// src/pages/Signup.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Make sure to import the CSS

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  // 🔹 Reset form fields on mount
  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/login");
      } else {
        setErr(data.error || "Signup failed");
      }
    } catch (error) {
      setErr("Server not responding. Please try again later.");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="auth-page">
      <h2>Signup</h2>
      {err && <p className="auth-error">{err}</p>}

      <form className="auth-form" onSubmit={handleSignup} autoComplete="off">
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;