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
    className
  );

  return (
    <div className={combinedClasses} {...props}>
      {comment.user.name}
    </div>
  );
}

export default CommentCard;