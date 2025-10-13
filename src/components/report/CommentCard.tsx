// src/components/CommentCard.tsx
import clsx from 'clsx';
import { Commenta } from '@/src/types/types';
import type { ReactNode } from 'react';

type CommentCardProps = {
  comment: Commenta;
  className?: string;

} & React.ComponentProps<'div'>;

function CommentCard({ comment, className, ...props }: CommentCardProps) {
  const combinedClasses = clsx(
    'bg-white',
    'rounded-lg',
    'p-6',
    'shadow-[0_0_15px_rgba(0,0,0,0.1)]',
    className
  );

  return (
    <div className={combinedClasses} {...props}>
      {comment.user.name}
    </div>
  );
}

export default CommentCard;