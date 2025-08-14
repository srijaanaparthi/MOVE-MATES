import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Wallet } from "lucide-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function LogIn() {
  const navigate = useNavigate();
  const { connected, account } = useWallet();
  const { login, isLoading, error } = useAuth();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first using the Connect Wallet button in the header",
        variant: "destructive",
      });
      return;
    }

    try {
      await login();
      toast({
        title: "Success!",
        description: "Welcome back to MoveMates!",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "User not found. Please sign up first.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">Sign in to your MoveMates account</p>
        </div>

        {/* Wallet Connection Status */}
        {!connected ? (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur mb-6">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Wallet className="h-12 w-12 text-emerald-500 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800">Connect Your Wallet</h3>
                <p className="text-sm text-gray-600">
                  Use the "Connect Wallet" button in the header to connect your Aptos wallet
                </p>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-700">
                    💡 Tip: Look for the "Connect a Wallet" button in the top-right corner of the page
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm font-medium text-emerald-800">
                Wallet Connected: {account?.address?.toString().slice(0, 8)}...{account?.address?.toString().slice(-6)}
              </span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center text-gray-800">Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Click the button below to sign in with your connected wallet
                </p>
                
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!connected || isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In with Wallet"}
                </Button>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => navigate('/signin')}
                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
