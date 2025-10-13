// src/components/Card.tsx
import clsx from 'clsx';
import type { ReactNode } from 'react';

type CardProps = {
  children?: ReactNode;
  className?: string;

} & React.ComponentProps<'div'>;

function Card({ children, className, ...props }: CardProps) {
  const combinedClasses = clsx(
    'bg-white',
    'rounded-lg',
    'p-6',
    'shadow-[0_0_15px_rgba(0,0,0,0.1)]',
    className
  );

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
}

export default Card;