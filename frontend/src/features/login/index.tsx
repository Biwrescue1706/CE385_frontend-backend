import { useEffect, useState } from "react";
import { postLogin, getAuthStatus } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";

export default function LoginFeature() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();

 

  const handleLogin = () => {
   
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        <div className="flex flex-col gap-4 mt-6">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
