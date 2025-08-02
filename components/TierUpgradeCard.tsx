"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Sparkles, Crown } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { UserTier } from "@/lib/supabase";

interface TierUpgradeCardProps {
  currentTier: UserTier;
}

const tierProgression: Record<UserTier, UserTier | null> = {
  free: "silver",
  silver: "gold",
  gold: "platinum",
  platinum: null,
};

const tierBenefits: Record<UserTier, string[]> = {
  free: ["Basic events", "Community content", "Newsletter access"],
  silver: ["Advanced workshops", "Technical deep-dives", "Priority support"],
  gold: [
    "Enterprise summits",
    "Architecture masterclasses",
    "Networking events",
  ],
  platinum: [
    "Exclusive roundtables",
    "Innovation workshops",
    "VIP access",
    "One-on-one sessions",
  ],
};

const tierDescriptions = {
  free: "Access to basic events and community content",
  silver: "Advanced workshops and technical content",
  gold: "Enterprise-level events and networking",
  platinum: "Exclusive VIP access to all premium events",
};

export function TierUpgradeCard({ currentTier }: TierUpgradeCardProps) {
  const { user, isLoaded } = useUser();
  const [upgrading, setUpgrading] = useState(false);
  const nextTier = tierProgression[currentTier];

  if (!nextTier) {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-purple-600" />
          </div>
          <CardTitle className="text-purple-800">
            You're at the highest tier!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-2">
            <p className="text-sm text-purple-700">
              Current tier:{" "}
              <span className="font-semibold">{currentTier.toUpperCase()}</span>
            </p>
            <p className="text-sm text-purple-600">
              {tierDescriptions[currentTier]}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      console.log("Upgrading your tier...");

      if (!user) {
        console.error("User not found. Please sign in again.");
        return;
      }

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
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge className="bg-black text-white">
            Upgrade to {nextTier.toUpperCase()} Tier
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-black mb-2">What you'll get:</h4>
          <ul className="space-y-1">
            {tierBenefits[nextTier].map((benefit, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-gray-500"
              >
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-2 flex-shrink-0"></span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <Button
          onClick={handleUpgrade}
          disabled={upgrading}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {upgrading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Upgrading...
            </>
          ) : (
            <>
              <ArrowUp className="mr-2 h-4 w-4" />
              Upgrade to {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
