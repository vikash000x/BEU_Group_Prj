import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./loader/Loader";

// Star Component for Background Animation
const Star = ({ style }) => {
  return (
    <div 
      className="absolute bg-white/20 rounded-full opacity-70 blur-[1px]" 
      style={style}
    />
  );
};

const CollegeLogin = () => {
  const navigate = useNavigate();
  const [collegecode, setCollegeCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stars, setStars] = useState([]);

  const {
    userType,
    setUserType,
    setToken,
    url,
    loading,
    setLoading,
    setloggedInCollegeData,
  } = useContext(StoreContext);

  // Generate Falling Stars
  useEffect(() => {
    const generateStars = () => {
      const starCount = 50;
      const newStars = Array.from({ length: starCount }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 20 + 10}s`,
        size: Math.random() * 3 + 1,
        delay: `${Math.random() * 10}s`,
      }));
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}/collegeadmin/login-college`, {
        collegecode,
        password,
      });
      if (response.data.success) {
        setloggedInCollegeData(response.data.collegeData);
        setUserType("college");
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", "college");
        localStorage.setItem("loggedInCollegeData", JSON.stringify(response.data.collegeData));
        toast.success("Logged In as college");
        navigate(`/${response.data.collegeData.collegeCode}/admin`);
        setLoading(false);
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-[#0B192C] flex items-center justify-center px-4 py-8 overflow-hidden relative">
      {stars.map((star) => (
        <Star
          key={star.id}
          style={{
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: star.animationDuration,
            animationDelay: star.delay,
          }}
          className="absolute animate-falling-star"
        />
      ))}

      <div className="
        w-full max-w-md 
        bg-white/5 
        backdrop-blur-xl 
        rounded-2xl 
        shadow-2xl 
        border 
        border-white/10
        overflow-hidden 
        transform transition-all duration-500 
        hover:scale-[1.02]
        hover:shadow-3xl
        z-10
        relative
      ">
        <div className="
          bg-gradient-to-r from-blue-900/30 to-blue-900/10 
          px-6 py-8 
          text-center 
          relative 
          before:absolute 
          before:inset-x-0 
          before:bottom-0 
          before:h-1 
          before:bg-gradient-to-r 
          before:from-blue-500/50 
          before:to-purple-500/50
        ">
          <h2 className="
            text-3xl font-bold 
            text-white 
            tracking-wide 
            mb-2
            animate-text-reveal
          ">
            College Login
          </h2>
          <p className="
            text-sm 
            text-white/60 
            animate-text-float
          ">
            Secure access to your college dashboard
          </p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="px-8 py-6 space-y-6"
        >
          <div className="space-y-2">
            <label 
              htmlFor="collegecode" 
              className="
                block 
                text-sm 
                font-medium 
                text-white/70
                transition-colors
                group-focus-within:text-blue-400
              "
            >
              College Code
            </label>
            <div className="relative group">
              <input
                type="text"
                id="collegecode"
                name="collegecode"
                value={collegecode}
                onChange={(e) => setCollegeCode(e.target.value)}
                required
                className="
                  w-full 
                  px-4 py-3 
                  bg-white/5
                  border 
                  border-white/10
                  text-white
                  rounded-lg 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  focus:border-transparent
                  transition-all
                  duration-300
                  group-focus-within:shadow-lg
                  placeholder-white/30
                "
                placeholder="Enter your College code"
              />
              <span className="
                absolute 
                inset-y-0 
                right-0 
                pr-3 
                flex 
                items-center 
                text-white/40
                group-focus-within:text-blue-400
              ">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 2a7 7 0 00-7 7v3a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2H3a5 5 0 0110 0v3a2 2 0 002 2h2a2 2 0 002-2V9a7 7 0 00-7-7z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="
                block 
                text-sm 
                font-medium 
                text-white/70
                transition-colors
                group-focus-within:text-blue-400
              "
            >
              Password
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  w-full 
                  px-4 py-3 
                  bg-white/5
                  border 
                  border-white/10
                  text-white
                  rounded-lg 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  focus:border-transparent
                  transition-all
                  duration-300
                  group-focus-within:shadow-lg
                  placeholder-white/30
                  pr-12
                "
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault(); 
                  togglePasswordVisibility();
                }}
                className="
                  absolute 
                  inset-y-0 
                  right-0 
                  pr-3 
                  flex 
                  items-center 
                  text-white/40
                  hover:text-white/70
                  transition-colors
                  focus:outline-none
                  group-focus-within:text-blue-400
                "
              >
                {showPassword ? (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.78zm4.261 4.262l1.514 1.514a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" 
                      clipRule="evenodd" 
                    />
                    <path 
                      d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" 
                    />
                  </svg>
                ) : (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path 
                      fillRule="evenodd" 
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="
                  h-4 w-4 
                  text-blue-500 
                  focus:ring-blue-500 
                  border-white/20 
                  rounded
                  bg-white/10
                "
              />
              <label 
                htmlFor="remember-me" 
                className="ml-2 block text-sm text-white/70"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a 
                href="#" 
                className="
                  font-medium 
                  text-blue-400 
                  hover:text-blue-300
                  transition-colors
                "
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="
              w-full 
              py-3 
              px-4 
              bg-gradient-to-r from-blue-600/70 to-blue-500/70
              text-white 
              font-semibold 
              rounded-lg 
              hover:opacity-90 
              focus:outline-none 
              focus:ring-2 
              focus:ring-offset-2 
              focus:ring-blue-500
              transition-all
              duration-300
              transform
              hover:scale-[1.02]
              active:scale-[0.98]
            "
          >
            Login
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/60">
              Don't have an account?{" "}
              <Link 
                to="#" 
                className="
                  text-blue-400 
                  font-semibold 
                  hover:text-blue-300
                  transition-colors
                "
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollegeLogin;
