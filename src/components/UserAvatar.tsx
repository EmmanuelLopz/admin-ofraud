import React from 'react';
import { getProfileImageUrl } from '@/src/utils/imageUtils';

interface UserAvatarProps {
  profilePicUrl?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16',
  xl: 'w-20 h-20'
};

export default function UserAvatar({ 
  profilePicUrl, 
  name, 
  size = 'md', 
  className = '' 
}: UserAvatarProps) {
  const avatarUrl = profilePicUrl ? getProfileImageUrl(profilePicUrl) : 'https://placehold.co/200';

  return (
    <div className={`${sizeClasses[size]} relative rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ${className}`}>
      <img
        src={avatarUrl}
        alt={`${name} profile`}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://placehold.co/200';
        }}
      />
    </div>
  );
}