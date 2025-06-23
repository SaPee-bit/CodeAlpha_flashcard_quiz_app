// pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("userRole", role);
    navigate(role === "admin" ? "/admin" : "/");
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4 text-center">
      <h2 className="text-2xl font-bold">Select Role</h2>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="p-2 border rounded w-full"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <Button className="w-full" onClick={handleLogin}>Login</Button>
    </div>
  );
}
