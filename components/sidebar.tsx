"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Cloud, Server, Database, Settings, BarChart } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: '/', label: 'Dashboard', icon: BarChart },
    { href: '/instances', label: 'Instances', icon: Server },
    { href: '/storage', label: 'Storage', icon: Database },
    { href: '/networking', label: 'Networking', icon: Cloud },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <div className="flex flex-col w-64 bg-background border-r">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Multi-Cloud</h1>
      </div>
      <nav className="flex-1">
        {links.map((link) => (
          <Button
            key={link.href}
            variant="ghost"
            className={cn(
              "w-full justify-start px-4 py-2 text-left",
              pathname === link.href && "bg-muted"
            )}
            onClick={handleClick(link.href)}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;