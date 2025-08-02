import { UserButton } from '@clerk/nextjs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Star, Calendar, Gem } from 'lucide-react';
import { UserTier } from '@/lib/supabase';

interface UserHeaderProps {
  userTier: UserTier;
}

const tierConfig = {
  free: {
    icon: Calendar,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    bgColor: 'from-gray-50 to-gray-100',
  },
  silver: {
    icon: Star,
    color: 'bg-gray-200 text-gray-700 border-gray-300',
    bgColor: 'from-gray-100 to-gray-200',
  },
  gold: {
    icon: Crown,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    bgColor: 'from-yellow-50 to-yellow-100',
  },
  platinum: {
    icon: Gem,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    bgColor: 'from-purple-50 to-purple-100',
  },
};

export function UserHeader({ userTier }: UserHeaderProps) {
  const config = tierConfig[userTier];
  const Icon = config.icon;

  return (
    <Card className={`mb-8 bg-gradient-to-r ${config.bgColor} border-2`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon className="h-6 w-6" />
              <h1 className="text-2xl font-bold text-gray-900">Your Events</h1>
            </div>
            <Badge className={config.color} variant="outline">
              {userTier.toUpperCase()} MEMBER
            </Badge>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
        <p className="text-gray-600 mt-2">
          Welcome back! Here are the events available for your membership tier.
        </p>
      </CardContent>
    </Card>
  );
}