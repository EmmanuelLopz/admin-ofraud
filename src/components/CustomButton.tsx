'use client';

import clsx from 'clsx';

type CustomButtonProps = {
  label: string | React.ReactNode;
  onClick?: () => void;
  className?: string;
} & React.ComponentProps<'button'>;

function CustomButton({ label, onClick, className, ...props }: CustomButtonProps) {
  const combinedClasses = clsx(
    'text-white',
    'py-2',
    'px-4', 
    'rounded-lg', 
    'active:scale-95',
    'transition', 
    'duration-200',
    'shadow-[0_0_15px_rgba(0,0,0,0.1)]',
    className
  );

  return (
    <button className={combinedClasses} onClick={onClick} {...props}>
      {label}
    </button>
  );
}

export default CustomButton;

