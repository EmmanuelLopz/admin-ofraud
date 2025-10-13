// src/components/MainLayout.tsx
import clsx from 'clsx';
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

type MainLayoutProps = {
  children: ReactNode;
  className?: string;

} & React.ComponentProps<'div'>;

function MainLayout({ children, className, ...props }: MainLayoutProps) {
  const combinedClasses = clsx(
    'flex',
    'h-screen',
    'overflow-hidden',
    className
  );

  return (
    <div className={combinedClasses} {...props}>
        <div className="w-1/6">
            <Sidebar />
        </div>
        
        {children}
    </div>
  );
}

export default MainLayout;