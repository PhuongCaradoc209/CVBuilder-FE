import { useState } from 'react';

interface TemplateAvatarProps {
  src?: string;
  fullName?: string;
  className?: string;
  fallbackClassName?: string;
}

export function TemplateAvatar({ src, fullName = '', className = '', fallbackClassName = '' }: TemplateAvatarProps) {
  const [hasError, setHasError] = useState(false);

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

  const showFallback = !src || src === 'Not provided' || hasError;

  if (showFallback) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 text-gray-500 ${fallbackClassName || className}`}>
        <span className="font-bold">{initials || 'CV'}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={fullName}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
