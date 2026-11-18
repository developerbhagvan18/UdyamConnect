import WebsiteLayout from '@/src/components/layouts/website/WebsiteLayout';

export default function Layout({ children }: LayoutProps<"/">) {
  return <WebsiteLayout>{children}</WebsiteLayout>;
}
