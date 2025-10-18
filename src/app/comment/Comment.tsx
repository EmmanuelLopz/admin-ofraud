'use client';
import MainLayout from '@/src/components/MainLayout';
import reportes from '@/src/types/reportExamples';
import CommentCard from '@/src/components/report/CommentCard';
import { Commenta } from '@/src/types/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; 
import ProtectedRoute from '@/src/wrappers/ProtectedRoute';

import { useAuth } from "@/src/context/AuthContext";
import { AuthRunner } from '@/src/wrappers/authRunner';
import axios from 'axios';

function Comment() {
    const [comment, setComment] = useState<Commenta | null>(null);
    const [refreshCounter, setRefreshCounter] = useState(0);
    const router = useRouter();

    const { accessToken, tryRefreshToken, logout, loadingTokens } = useAuth();
    
    const authRunner = new AuthRunner(
        () => accessToken,
        async() => {
            const refreshed = await tryRefreshToken();
            return refreshed ? accessToken : null;
        },
        logout
    );

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get("id") || "0", 10);

        const fetchComment = async () => {

            const comment = await authRunner.runWithAuth(async (token) => {
                if (loadingTokens) return;

                const res = await axios.get(
                    `http://localhost:3001/comment/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                return res.data;
            });

            if(!comment){
                console.log("No se cargo el comentario");
                return;
            }
            
            setComment(comment);
            console.log(comment);
        }

        fetchComment();

    }, [refreshCounter, accessToken, loadingTokens]);


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
            {/* <h1 className="text-5xl font-semibold text-[#060025] text-left">Comentario{comment.replies.length > 1 ? 's':''}</h1> */}
            </div>

            <div className="flex flex-col w-full justify-center items-center gap-10">
                <CommentCard 
                    comment={comment} 
                    className='w-2/3'
                />

                {/* <div className="w-3/5 gap-5">
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
                </div> */}
            </div>        
        </div>
        </MainLayout>
    </ProtectedRoute>
  );
}

export default Comment;