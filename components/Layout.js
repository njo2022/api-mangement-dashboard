"use client";

import { Sidebar } from './Sidebar';

export function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-auto">
        <main className="h-full">
          {children}
        </main>
      </div>
    </div>
  );
}
