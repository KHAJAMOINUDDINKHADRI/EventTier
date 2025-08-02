import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Star, Crown, Gem, ArrowRight, Users, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Header */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EventTier</span>
          </div>
          
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link href="/events">
                <Button variant="ghost" className="hidden sm:flex">
                  My Events
                </Button>
              </Link>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Get Started</Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Event<span className="text-blue-600">Tier</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Access premium events tailored to your membership level. 
            From community meetups to exclusive CTO roundtables.
          </p>
          
          <SignedOut>
            <div className="flex gap-4 justify-center">
              <SignInButton mode="modal">
                <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="outline" size="lg" className="px-8 border-blue-200 hover:bg-blue-50">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <Link href="/events">
              <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700">
                <Calendar className="mr-2 h-5 w-5" />
                View Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}