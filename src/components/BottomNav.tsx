'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mic2, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Soundboard', path: '/', icon: Mic2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 w-full max-w-7xl mx-auto bg-white dark:bg-[#111] border-t border-gray-200 dark:border-gray-800 flex items-center justify-around z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] safe-area-pb">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-0.5 transition-colors duration-300",
              isActive ? "text-cyan-600 dark:text-cyan-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-2xl transition-all duration-300",
              isActive ? "bg-cyan-100 dark:bg-cyan-400/10" : "bg-transparent"
            )}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium tracking-wide">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
