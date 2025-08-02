"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  getEvents,
  type Event,
  type UserTier,
  canAccessEvent,
} from "@/lib/supabase";
import { EventCard } from "@/components/EventCard";
import { TierUpgradeCard } from "@/components/TierUpgradeCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Star, Calendar, Gem, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const { user, isLoaded } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const userTier =
    (user?.unsafeMetadata?.tier as UserTier) ||
    (user?.publicMetadata?.tier as UserTier) ||
    "free";

  const tierConfig = {
    free: {
      icon: Calendar,
      color: "bg-gray-100 text-gray-800 border-gray-200",
      bgColor: "from-gray-50 to-gray-100",
    },
    silver: {
      icon: Star,
      color: "bg-gray-200 text-gray-700 border-gray-300",
      bgColor: "from-gray-100 to-gray-200",
    },
    gold: {
      icon: Crown,
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      bgColor: "from-yellow-50 to-yellow-100",
    },
    platinum: {
      icon: Gem,
      color: "bg-purple-100 text-purple-800 border-purple-200",
      bgColor: "from-purple-50 to-purple-100",
    },
  };
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load events");
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded) {
      fetchEvents();
    }
  }, [isLoaded]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to refresh events", err);
    } finally {
      setRefreshing(false);
    }
  };
  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Error Loading Events
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const accessibleEvents = events.filter((event) =>
    canAccessEvent(userTier, event.tier as UserTier)
  );
  const restrictedEvents = events.filter(
    (event) => !canAccessEvent(userTier, event.tier as UserTier)
  );
  const config = tierConfig[userTier];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Header */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EventTier</span>
            </Link>
            <Badge className={config.color} variant="outline">
              {userTier.toUpperCase()} MEMBER
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleRefresh}
              variant="ghost"
              size="sm"
              disabled={refreshing}
              className="hidden sm:flex"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">

        {accessibleEvents.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Available Events
              </h2>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {accessibleEvents.length} events
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessibleEvents.map((event) => (
                <EventCard key={event.id} event={event} accessible={true} />
              ))}
            </div>
          </section>
        )}

        {restrictedEvents.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-500">
                Upgrade to Access
              </h2>
              <Badge
                variant="outline"
                className="bg-orange-50 text-orange-700 border-orange-200"
              >
                {restrictedEvents.length} locked
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restrictedEvents.map((event) => (
                <EventCard key={event.id} event={event} accessible={false} />
              ))}
            </div>
          </section>
        )}

        <TierUpgradeCard currentTier={userTier} />
      </div>
    </div>
  );
}
