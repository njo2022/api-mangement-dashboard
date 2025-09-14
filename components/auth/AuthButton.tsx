"use client";

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export function AuthButton() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.fullName || user.emailAddresses[0]?.emailAddress || "User"}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user.fullName?.charAt(0) || user.emailAddresses[0]?.emailAddress?.charAt(0)}
              </span>
            </div>
          )}
          <span className="text-gray-700 text-sm">
            {user.fullName || user.emailAddresses[0]?.emailAddress}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
        >
          Déconnexion
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => router.push('/sign-in')}
        className="text-gray-700 hover:text-gray-900 text-sm font-medium"
      >
        Connexion
      </button>
      <button
        onClick={() => router.push('/sign-up')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        S&apos;inscrire
      </button>
    </div>
  );
}
