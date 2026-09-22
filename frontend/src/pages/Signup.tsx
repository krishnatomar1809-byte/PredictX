import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Activity, ShieldAlert, RefreshCw, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await axios.post('/users/register', {
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        password: data.password
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex">
      <div className="hidden lg:flex w-1/2 bg-surface flex-col justify-center items-center p-12 relative overflow-hidden border-r border-primary/10">
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="relative z-10 text-center max-w-md">
          <div className="bg-primary/20 p-4 rounded-3xl inline-block mb-8">
            <Activity className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Join PredictX</h2>
          <p className="text-text-muted text-lg leading-relaxed">
            Create an account to securely access prediction modules and manage your analysis history.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <div className="bg-primary/20 p-3 rounded-2xl inline-block mb-4">
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">PredictX</h2>
          </div>

          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-text-muted mb-8">Fill out the details below to get started.</p>

          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 text-center border-success/20 bg-success/5">
              <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Account Created!</h3>
              <p className="text-text-muted">Redirecting you to login...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Full Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="John Doe"
                  {...register("fullname", { required: "Full name is required" })}
                />
                {errors.fullname && <p className="text-error text-xs mt-1">{errors.fullname.message as string}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Username</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="johndoe123"
                  {...register("username", { required: "Username is required" })}
                />
                {errors.username && <p className="text-error text-xs mt-1">{errors.username.message as string}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Email</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="name@example.com"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                  })}
                />
                {errors.email && <p className="text-error text-xs mt-1">{errors.email.message as string}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input-field pr-10"
                    placeholder="Create a strong password"
                    {...register("password", { 
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-error text-xs mt-1">{errors.password.message as string}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input-field pr-10"
                    placeholder="Confirm your password"
                    {...register("confirmPassword", { 
                      required: "Please confirm your password",
                      validate: value => value === password || "Passwords do not match"
                    })}
                  />
                </div>
                {errors.confirmPassword && <p className="text-error text-xs mt-1">{errors.confirmPassword.message as string}</p>}
              </div>

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-error/10 border border-error/20 rounded-xl text-error flex items-center text-sm mt-2">
                  <ShieldAlert className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center py-3 mt-6"
              >
                {isSubmitting ? (
                  <><RefreshCw className="h-5 w-5 animate-spin mr-2" /> Creating Account...</>
                ) : 'Create Account'}
              </button>
            </form>
          )}

          <p className="text-center mt-8 text-text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
