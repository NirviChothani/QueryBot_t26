import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Sparkles, Database, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // SAVE USER FROM BACKEND (SOURCE OF TRUTH)
      localStorage.setItem("user", JSON.stringify(data.user));

      // ALWAYS GO TO MAIN PAGE
      navigate("/");

    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert("Backend not reachable");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background/95 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-success/10 rounded-full blur-2xl animate-pulse delay-500" />
        
        {/* Floating particles */}
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-primary/40 rounded-full animate-float" />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-accent/60 rounded-full animate-float delay-700" />
        <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-success/50 rounded-full animate-float delay-300" />
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-md z-10">
        {/* Login Card */}
        <div className="glass-card-elevated p-8 space-y-8 transform hover:scale-[1.02] transition-transform duration-300">
          {/* Header Section */}
          <div className="text-center space-y-4">
            {/* Logo Container with enhanced styling */}
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 glow-primary mb-4 group">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse" />
              <img
                src="/QueryBot_logo.png"
                alt="QueryBot Logo"
                className="h-14 w-14 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
              />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-accent animate-pulse" />
            </div>

            {/* Title with enhanced typography */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">
                Query<span className="text-gradient-primary">Bot</span>
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Bot className="w-4 h-4" />
                <span className="text-sm font-medium">AI-powered SQL Assistant</span>
                <Database className="w-4 h-4" />
              </div>
            </div>
            
            {/* Welcome message */}
            <p className="text-sm text-muted-foreground/80 max-w-xs mx-auto leading-relaxed">
              Welcome back! Sign in to continue your data exploration journey.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background/80 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12 h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background/80 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border/50" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Sign In
                  <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">New to QueryBot?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Create an account to get started
            </button>
          </div>

          {/* Footer */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground/60">
              By signing in, you agree to our{" "}
              <button className="text-primary hover:underline">Terms of Service</button>
              {" "}and{" "}
              <button className="text-primary hover:underline">Privacy Policy</button>
            </p>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground/40">
            <div className="w-1 h-1 bg-primary/40 rounded-full animate-pulse" />
            <span>Powered by AI</span>
            <div className="w-1 h-1 bg-accent/40 rounded-full animate-pulse delay-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
  