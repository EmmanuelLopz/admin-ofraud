'use client';
import MainLayout from '@/src/components/MainLayout';
import reportes from '@/src/types/reportExamples';
import CommentCard from '@/src/components/report/CommentCard';
import { Commenta } from '@/src/types/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; 
import ProtectedRoute from '@/src/wrappers/ProtectedRoute';


function Comment() {
    const [comment, setComment] = useState<Commenta | null>(null);
    const [refreshCounter, setRefreshCounter] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const data = localStorage.getItem('activeComment');
        
        if (data) {
            try {

                const fetchedComment: Commenta = JSON.parse(data);
                setComment(fetchedComment);
                
            } catch (error) {
                console.error("Error parsing comment data from localStorage:", error);
                setComment(null);
            }
        } else {
            console.log("No comment data found in localStorage.");
            setComment(null);
        }

    }, [refreshCounter]);


    if (!comment) {
        return (
            <MainLayout>
                <div className="p-10">
                    <h1 className="text-2xl font-bold">No se encontró el comentario</h1>
                    <p>Intenta volver a la página anterior.</p>
                </div>
            </MainLayout>
        );
    }

    
  return (
    <ProtectedRoute>
        <MainLayout>
        <div className="flex flex-1 flex-col p-10 h-full overflow-y-scroll hide-scrollbar">
            
            <div className="p-x-10 mb-10">
            <h1 className="text-5xl font-semibold text-[#060025] text-left">Comentario{comment.replies.length > 1 ? 's':''}</h1>
            </div>

            <div className="flex flex-col w-full justify-center items-center gap-10">
                <CommentCard 
                    comment={comment} 
                    className='w-2/3'
                />

                <div className="w-3/5 gap-5">
                    <h2 className="text-lg font-normal text-gray-500 mb-2">{comment.replies.length > 0 ? 'Comentarios':''}</h2>

                    <div className="flex flex-col w-full gap-4">
                        { comment.replies.map((commentSon, index) => (
                            <CommentCard 
                                key={index} 
                                comment={commentSon} 
                                onClick={()=>{
                                    localStorage.setItem("activeComment", JSON.stringify(commentSon));
                                    setRefreshCounter(prev => prev + 1);
                                    router.push(`/comment?ts=${Date.now()}`); 
                                }}
                                className='cursor-pointer'
                            />
                        ))}
                    </div>
                </div>
            </div>        
        </div>
        </MainLayout>
    </ProtectedRoute>
  );
}

export default Comment;