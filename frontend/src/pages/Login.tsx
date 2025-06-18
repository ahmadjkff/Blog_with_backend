import { useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router";

const Login = () => {
  const { login } = useUser();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    const response = await fetch("http://localhost:3222/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      setError("Unable to register user, please try different credientials!");
      return;
    }

    const token = await response.json();

    const decoded = jwtDecode(token) as { role: "admin" | "user" };
    console.log(decoded.role); // "admin" or "user"

    if (!token) {
      setError("Incorrect token");
      return;
    }

    setError("");

    login(username, token, decoded.role);
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-4 w-full">
      <h4 className="font-bold text-2xl">Login To Your Account</h4>
      <div className="flex flex-col border border-black p-4 justify-center items-center gap-2 w-1/4">
        <input
          className="border border-black p-3 rounded-md w-full"
          type="text"
          placeholder="Username"
          ref={usernameRef}
        />
        <input
          className="border border-black p-3 rounded-md w-full"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <button
          className="bg-blue-600 w-full p-2 rounded-md text-white mt-2 cursor-pointer"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <span className="font-semibold text-red-600">{error}</span>}
      </div>
    </div>
  );
};

export default Login;
