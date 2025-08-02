import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Lock, ExternalLink, ArrowUp } from "lucide-react";
import { Event, UserTier } from "@/lib/supabase";
import { format } from "date-fns";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

interface EventCardProps {
  event: Event;
  accessible: boolean;
}

const tierColors = {
  free: "bg-gray-100 text-gray-800 border-gray-200",
  silver: "bg-gray-200 text-gray-700 border-gray-300",
  gold: "bg-yellow-100 text-yellow-800 border-yellow-200",
  platinum: "bg-purple-100 text-purple-800 border-purple-200",
};

const tierIcons = {
  free: "🆓",
  silver: "🥈",
  gold: "🥇",
  platinum: "👑",
};

const tierProgression: Record<UserTier, UserTier | null> = {
  free: "silver",
  silver: "gold",
  gold: "platinum",
  platinum: null,
};

export function EventCard({ event, accessible }: EventCardProps) {
  const { user, isLoaded } = useUser();
  const eventDate = new Date(event.event_date);
  const formattedDate = format(eventDate, "MMM dd, yyyy");
  const formattedTime = format(eventDate, "h:mm a");

  const userTier =
    (user?.unsafeMetadata?.tier as UserTier) ||
    (user?.publicMetadata?.tier as UserTier) ||
    "free";
  const nextTier = tierProgression[userTier];

  const handleEventClick = () => {
    if (accessible) {
      console.log(`Opening ${event.title}...`);
    }
  };

  const handleUpgradeClick = async () => {
    if (!nextTier) {
      console.error("You are already at the highest tier!");
      return;
    }

    if (!user) {
      console.error("User not found. Please sign in again.");
      return;
    }

    try {
      console.log("Upgrading your tier...");

      // Update user metadata
      const result = await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          tier: nextTier,
        },
      });

      console.log(`Successfully upgraded to ${nextTier.toUpperCase()} tier!`);

      // Reload the page to reflect changes
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Upgrade failed:", error);
      console.error(
        `Upgrade failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const getUpgradeMessage = () => {
    if (accessible) return null;

    if (userTier === "platinum") {
      return "You're at the highest tier! This event is not available.";
    }

    return `Upgrade to ${
      event.tier.charAt(0).toUpperCase() + event.tier.slice(1)
    } to access this event`;
  };

  return (
    <Card
      className={`group transition-all duration-300 hover:shadow-xl ${
        accessible
          ? "border-2 cursor-pointer"
          : "opacity-75 hover:opacity-90"
      }`}
    >
      <div className="relative">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!accessible && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge className={tierColors[event.tier]} variant="outline">
            {tierIcons[event.tier]} {event.tier.toUpperCase()}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle
          className={`text-xl ${
            accessible ? "text-gray-900" : "text-gray-500"
          }`}
        >
          {event.title}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formattedTime}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription
          className={`mb-4 line-clamp-3 ${
            accessible ? "text-gray-600" : "text-gray-400"
          }`}
        >
          {event.description}
        </CardDescription>

        {accessible ? (
          <Button className="w-full" onClick={handleEventClick}>
            <ExternalLink className="mr-2 h-4 w-4" />
            View Details
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                {getUpgradeMessage()}
              </p>
              {userTier !== "platinum" && nextTier && (
                <Button
                  onClick={handleUpgradeClick}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <ArrowUp className="mr-2 h-4 w-4" />
                  Upgrade to{" "}
                  {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
