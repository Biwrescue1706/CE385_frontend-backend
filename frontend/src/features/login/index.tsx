import { useEffect, useState } from "react";
import { postLogin, getAuthStatus } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";

export default function LoginFeature() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    getAuthStatus()
    .then((response)=>{
      if ( response.statusCode === 200){
        navigate("/categories");
      }
    })
    .catch((error)=>{
      console.error("Error checking authentication status : ",error.message);
    });
  },[navigate]);
  
  const handleLogin = () => {
    if (!username) {
      alert("Please enter a username.");
      return;
    }
    if(!password){
      alert("Please enter a password.");
      return;     
    }
    postLogin({ username : username , password : password})
    .then((response)=>{
      if(response.statusCode === 200) {
        navigate("/categories");
      }else if (response.statusCode === 400){
        alert(response.message);
      }else{
        alert(`Unexpected error : ${response.message}`);
      }
    })
    .catch ((error) =>{
      console.log("Error createing category : ",error.response?.data||error.message);
      alert("Failed to create category. Please try again");
    });
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
