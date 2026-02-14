import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "../../components/ui/Button";
import { useAdmin } from "../../contexts/AdminContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const success = await login(email, password);
    if (success) {
      navigate(from, {
        replace: true,
      });
    } else {
      setError("Invalid email or password.");
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-white w-full max-w-md p-8 md:p-12 rounded-sm shadow-xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-wedding-black text-white rounded-cull flex items-center justify-center mx-auto mb-4">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-serif text-wedding-">Admin Access</h1>
          <p className="text-gray-500 text-sm mt-2">
            Please sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold"
                placeholder="admin@example.com"
                autoFocus
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !password || !email}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
            {!isSubmitting && <ArrowRight size={16} className="ml-2" />}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
