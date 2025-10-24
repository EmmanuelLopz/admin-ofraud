import { useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import { Reporte } from '@/src/types/types';
import { getProfileImageUrl } from '@/src/utils/imageUtils';

type ReportCardProps = {
  reporte: Reporte;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  hoveredContent?: React.ReactNode;
  isHovered?: boolean;
} & React.ComponentProps<'div'>;

function ReportCard({
  reporte,
  className,
  onClick,
  hoveredContent,
  isHovered = false,
  children,
  ...props
}: ReportCardProps) {
  return (
    <Card
      className={clsx("basis-5/12", className)}
      onClick={onClick}
      {...props}
    >
      {isHovered && hoveredContent ? (
        hoveredContent
      ) : (
        <>
          <div className="text-xl font-semibold text-center mb-4">
            {reporte.title}
          </div>
          <img
            src={getProfileImageUrl(reporte.report_pic_url)}
            alt={reporte.title}
            className="w-full h-48 object-cover rounded-md mb-5 shadow-xl"
          />
          <a
            href={reporte.reference_url}
            className="text-blue-500 hover:underline mb-2 block"
          >
            URL: {reporte.reference_url}
          </a>
          <p className="text-gray-700 mb-10">{reporte.description}</p>
          <p className="text-sm text-gray-500">Categoría: {reporte.category ? reporte.category.name : 'undf'}</p>
        </>
      )}

      {/* Contenido adicional, sin importar si está hovered o no */}
      {children}
    </Card>
  );
}

export default ReportCard;