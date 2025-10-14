'use client';
import MainLayout from '@/src/components/MainLayout';
import reportes from '@/src/types/reportExamples';
import CommentCard from '@/src/components/report/CommentCard';
import { useRouter } from 'next/navigation';

function Comment() {
    const comment = reportes[0].comments[0]; // Ejemplo: tomar el primer comentario del primer reporte
    const router = useRouter();
  return (
    <MainLayout>
      <div className="flex flex-1 flex-col p-10 h-full overflow-y-scroll hide-scrollbar">
        
        <div className="p-x-10 mb-10">
          <h1 className="text-5xl font-semibold text-[#060025] text-left">Comentario{comment.replies.length > 0 ? 's' : ''}</h1>
        </div>

        <div className="flex flex-col w-full justify-center items-center gap-10">
            <CommentCard 
                comment={comment} 
            />

            <div className="w-3/5 gap-5">
                <h2 className="text-lg font-normal text-gray-500 mb-2">Comentarios</h2>

                <div className="flex flex-col w-full gap-4">
                    { comment.replies.map((comment, index) => (
                        <CommentCard 
                            key={index} 
                            comment={comment} 
                            onClick={()=>router.push("/comment")}
                            className='cursor-pointer'
                        />
                    ))}
                </div>
            </div>
        </div>        
      </div>
    </MainLayout>
  );
}

export default Comment;