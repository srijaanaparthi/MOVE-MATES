import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, Users, GraduationCap, CalendarClock, Award, Star, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-14">
      {/* Animated Icon Section */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg animate-bounce">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-md animate-pulse">
            <Users className="h-3 w-3 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 h-5 w-5 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-md animate-pulse delay-1000">
            <GraduationCap className="h-2.5 w-2.5 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome to MoveMates</h2>
          <p className="text-gray-600">Your learning journey starts here</p>
        </div>
      </div>

      <section className="text-center py-10">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
          MoveMates
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Study Circles, Peer-to-Peer Learning, and Tutor Booking with on-chain reputation, credentials, and escrow on Aptos.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/circles"><Button className="shadow-sm shadow-emerald-300">Explore Study Circles</Button></Link>
          <Link to="/peer"><Button variant="secondary" className="border border-emerald-100">Peer Learning</Button></Link>
          <Link to="/booking"><Button variant="secondary" className="border border-emerald-100">Tutor Booking</Button></Link>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="backdrop-blur bg-white/70 dark:bg-gray-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-emerald-500" /> Study Circles</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-6">
            Create or join topic-based circles with shared resources and on-chain participation proofs.
          </CardContent>
        </Card>
        <Card className="backdrop-blur bg-white/70 dark:bg-gray-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-blue-500" /> Peer-to-Peer Sessions</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-6">
            Teach to earn credits, spend credits to learn. Ratings and feedback stored on-chain.
          </CardContent>
        </Card>
        <Card className="backdrop-blur bg-white/70 dark:bg-gray-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarClock className="h-5 w-5 text-cyan-500" /> Tutor Booking</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-6">
            Availability, booking, and escrow payments with auto-refunds and release after sessions.
          </CardContent>
        </Card>
        <Card className="backdrop-blur bg-white/70 dark:bg-gray-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-emerald-500" /> On-Chain Credentials</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-6">
            Soulbound certificates and milestone badges for verifiable achievements.
          </CardContent>
        </Card>
        <Card className="backdrop-blur bg-white/70 dark:bg-gray-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-amber-500" /> Reputation</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-6">
            Transparent, tamper-resistant ratings and endorsements to build lasting profiles.
          </CardContent>
        </Card>
        <Card className="backdrop-blur bg-white/70 dark:bg-gray-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-rose-500" /> Engagement</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-6">
            Leaderboards, streaks, and quests to keep learning fun and rewarding.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}


