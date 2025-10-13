import { useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import { Reporte } from '@/src/types/types';

type ReportCardProps = {
  reporte: Reporte;
  className?: string;
  onClick?: () => void;
} & React.ComponentProps<'div'>;

function ReportCard({ reporte, className, onClick, ...props }: ReportCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className={clsx(
        'basis-5/12 transition-transform duration-300',
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {/* Contenido alternativo al hacer hover */}
      {hovered ? (
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold">{reporte.title}</div>
          <div className="text-gray-600 italic">Resumen del reporte</div>
        </div>
      ) : (
        <>
          <div className="text-xl font-semibold text-center mb-4">{reporte.title}</div>
          <img
            src={reporte.photo_url}
            alt={reporte.title}
            className="w-full h-48 object-cover rounded-md mb-5 shadow-xl"
          />
          <a href={reporte.url} className="text-blue-500 hover:underline mb-2 block">
            URL: {reporte.url}
          </a>
          <p className="text-gray-700 mb-10">{reporte.description}</p>
          <p className="text-sm text-gray-500">Categoría: {reporte.category}</p>
        </>
      )}
    </Card>
  );
}

export default ReportCard;
