"use client";

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface ProtectedButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
}

export function ProtectedButton({ children, href, className, onClick }: ProtectedButtonProps) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    if (!isLoaded) {
      return; // Attendre que Clerk se charge
    }

    if (!user) {
      // Rediriger vers la page de connexion avec l'URL de retour
      router.push(`/sign-in?redirect_url=${encodeURIComponent(href)}`);
    } else {
      // Utilisateur connecté, naviguer vers la page
      router.push(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      disabled={!isLoaded}
    >
      {children}
    </button>
  );
}
