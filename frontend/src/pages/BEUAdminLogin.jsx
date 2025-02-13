import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from '../components/loader/Loader';

const Star = ({ style }) => (
  <div className="absolute bg-white/20 rounded-full opacity-70 blur-[1px]" style={style} />
);

const BEUAdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stars, setStars] = useState([]);
  const { setUserType, setToken, url, loading, setLoading, setloggedInBEUAdminData, token, loggedInBEUAdminData } = useContext(StoreContext);

  useEffect(() => {

    if(token) {
      navigate(`/`);
    }
    const generateStars = () => {
      const newStars = Array.from({ length: 100 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 20 + 10}s`,
        size: Math.random() * 3 + 1,
        delay: `${Math.random() * 10}s`,
      }));
      setStars(newStars);
    };
    generateStars();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}/beuadmin/login`, { email, password });
      if (response.data.success) {
        setloggedInBEUAdminData(response.data.data);
        setUserType("admin");
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", "admin");
        localStorage.setItem("loggedInBEUAdminData", JSON.stringify(response.data.data));
        toast.success("Logged In as BEU Admin");
        navigate(`/beu/admin`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
        console.log(error)
      toast.error(error.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-[#0B192C] flex items-center justify-center px-4 py-8 overflow-hidden relative">
      {stars.map((star) => (
        <Star key={star.id} style={{ left: star.left, width: `${star.size}px`, height: `${star.size}px`, animationDuration: star.animationDuration, animationDelay: star.delay }} className="absolute animate-falling-star" />
      ))}

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl z-10 relative">
        <div className="bg-gradient-to-r from-blue-900/30 to-blue-900/10 px-6 py-8 text-center relative">
          <h2 className="text-3xl font-bold text-white tracking-wide mb-2">BEU Admin Login</h2>
          <p className="text-sm text-white/60">Secure access to the BEU admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter email" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/70">
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all">Login</button>
        </form>
      </div>
    </div>
  );
};

export default BEUAdminLogin;