import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Activity, ShieldAlert, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Backend supports login by email or username, we'll assume email
      const response = await axios.post('/users/login', data);
      const userData = response.data.data.user;
      const accessToken = response.data.data.accessToken;
      login(userData, accessToken);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex">
      <div className="hidden lg:flex w-1/2 bg-surface flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="relative z-10 text-center max-w-md">
          <div className="bg-primary/20 p-4 rounded-3xl inline-block mb-8">
            <Activity className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">AI Healthcare Intelligence</h2>
          <p className="text-text-muted text-lg leading-relaxed">
            Access state-of-the-art machine learning models for early disease detection and health risk assessment.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10 lg:hidden">
            <div className="bg-primary/20 p-3 rounded-2xl inline-block mb-4">
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">PredictX</h2>
          </div>

          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-text-muted mb-8">Please enter your details to sign in.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Email or Username</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your email or username"
                {...register("email", { required: "Email/Username is required" })}
              />
              {errors.email && <p className="text-error text-xs mt-1">{errors.email.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-error text-xs mt-1">{errors.password.message as string}</p>}
            </div>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-error/10 border border-error/20 rounded-xl text-error flex items-center text-sm">
                <ShieldAlert className="h-4 w-4 mr-2 flex-shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center py-3"
            >
              {isSubmitting ? (
                <><RefreshCw className="h-5 w-5 animate-spin mr-2" /> Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-8 text-text-muted">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
