import WebsiteNavbar from '@/src/components/layouts/website/WebsiteNavbar';
import WebsiteFooter from '@/src/components/layouts/website/WebsiteFooter';

export default function WebsiteGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <WebsiteNavbar />
      <main className="flex-1">{children}</main>
      <WebsiteFooter />
    </div>
  );
}
