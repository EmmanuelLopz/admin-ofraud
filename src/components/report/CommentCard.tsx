// src/components/CommentCard.tsx
import clsx from 'clsx';
import { Commenta } from '@/src/types/types';
import Card from '../Card';

type CommentCardProps = {
  comment: Commenta;
  className?: string;

} & React.ComponentProps<'div'>;

function CommentCard({ comment, className, onClick, ...props }: CommentCardProps) {
  const combinedClasses = clsx(
    className
  );

  return (
    <Card className={combinedClasses} onClick={onClick}>
        <div className="flex flex-row gap-x-5 gap-y-0">
            {/* profile photo */}
            <img 
                src={comment.user.photo_url} 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover"
            />

            <div className="flex flex-col justify-start items-start">
                <div className="flex flex-row gap-3 justify-center items-center">
                    <div className="text-lg font-semibold">{comment.user.name}</div>
                    <div className="text-sm text-gray-500">2d</div>
                </div>
                
                <div className="text-gray-600">{comment.content}</div>
            </div>
            
        </div>
    </Card>
  );
}

export default CommentCard;