import { ReactNode } from 'react';

interface ResponsiveLayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
  info: ReactNode;
}

/**
 * Responsive Layout Component
 * Tự động điều chỉnh layout dựa trên kích thước màn hình
 * Desktop: 3 cột (sidebar + main + info)
 * Tablet: 2 cột (sidebar + main)
 * Mobile: 1 cột (main)
 */
export function ResponsiveLayout({ sidebar, main, info }: ResponsiveLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
      {/* Sidebar - Hidden on mobile, visible on tablet+ */}
      <div className="lg:col-span-1 order-2 lg:order-1 hidden md:block">
        <div className="sticky top-24">
          {sidebar}
        </div>
      </div>

      {/* Main Content - Full width on mobile, 2/3 on tablet, 1/2 on desktop */}
      <div className="lg:col-span-2 order-1 lg:order-2 col-span-1 md:col-span-2">
        {main}
      </div>

      {/* Info Panel - Hidden on mobile, visible on tablet+ */}
      <div className="lg:col-span-1 order-3 hidden lg:block">
        <div className="sticky top-24">
          {info}
        </div>
      </div>
    </div>
  );
}
