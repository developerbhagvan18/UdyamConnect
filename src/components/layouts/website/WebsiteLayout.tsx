import React from 'react';
import Link from 'next/link';
import WebsiteNavbar from './WebsiteNavbar';
import WebsiteFooter from './WebsiteFooter';

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <WebsiteNavbar />
      <main className="flex-1">{children}</main>
      <WebsiteFooter />
    </div>
  );
}
