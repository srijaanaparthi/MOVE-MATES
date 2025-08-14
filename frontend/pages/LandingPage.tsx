import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, GraduationCap } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50">
      <div className="text-center space-y-8 px-4">
        {/* Animated Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg animate-bounce">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-md animate-pulse">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-md animate-pulse delay-1000">
              <GraduationCap className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome to MoveMates
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Study Circles, Peer-to-Peer Learning, and Tutor Booking with on-chain reputation, credentials, and escrow on Aptos.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => navigate('/signin')}
            className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Sign In
          </Button>
          <Button 
            onClick={() => navigate('/login')}
            variant="outline"
            className="px-8 py-3 text-lg font-semibold border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Log In
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center mx-auto">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800">Study Circles</h3>
            <p className="text-sm text-gray-600">Join topic-based learning communities</p>
          </div>
          <div className="text-center space-y-3">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mx-auto">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800">Peer Learning</h3>
            <p className="text-sm text-gray-600">Teach and learn from others</p>
          </div>
          <div className="text-center space-y-3">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center mx-auto">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800">Tutor Booking</h3>
            <p className="text-sm text-gray-600">Book sessions with verified tutors</p>
          </div>
        </div>
      </div>
    </div>
  );
}
