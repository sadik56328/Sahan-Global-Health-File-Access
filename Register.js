import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Your Health Account</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white py-2 rounded" type="submit">Register</button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}