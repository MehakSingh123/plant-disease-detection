// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Use the same CSS file as Signup

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  // 🔹 Reset form fields on mount (prevents showing old values)
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        navigate("/");
      } else {
        setErr(data.error || "Login failed");
      }
    } catch (error) {
      setErr("Server not responding. Please try again later.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      {err && <p className="auth-error">{err}</p>}
      <form className="auth-form" onSubmit={handleLogin} autoComplete="off">
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;