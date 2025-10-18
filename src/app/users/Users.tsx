"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Edit, Eye, Trash2, X, Plus } from "lucide-react"; // <- X para cerrar, Plus para crear
import Modal from "../../components/ViewUserModal";
import CreateUserModal from "../../components/CreateUserModal";
import ViewUser from "../../components/ViewUser";
import CustomButton from "@/src/components/CustomButton";
import Toast from "../../components/Toast";
import ProtectedRoute from "@/src/wrappers/ProtectedRoute";
import { useAuth } from "@/src/context/AuthContext";
import { AuthRunner } from "@/src/wrappers/authRunner";
import axios from "axios";
import DeleteUserModal from "@/src/components/DeleteUserModal";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const { accessToken, tryRefreshToken, logout, loadingTokens } = useAuth();
  const [toast, setToast] = useState<{show: boolean, message: string, type: 'success' | 'error'}>({
    show: false,
    message: '',
    type: 'success'
  });

  // NEW: estado para modal y usuario seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | {
    id: string;
    name: string;
    email: string;
    password: string;
    salt: string;
    creation_date: string;
    profile_pic_url: string;
    admin: boolean;
    update_date: string;
  }>(null);

  const authRunner = new AuthRunner(
    () => accessToken,
    async () => {
      const refreshed = await tryRefreshToken();
      return refreshed ? accessToken : null;
    },
    logout
  );

  // Opcional: bloquear scroll del body cuando modal está abierto
  useEffect(() => {
    if (isModalOpen || isCreateModalOpen || isDeleteModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen, isCreateModalOpen, isDeleteModalOpen]);


  // Cerrar con ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setIsCreateModalOpen(false);
        setIsDeleteModalOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openUserModal = (usuario: any) => {
    setSelectedUser(usuario);
    setIsModalOpen(true);
  };
  
  const closeUserModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openDeleteModal = (usuario: any) => {
    setSelectedUser(usuario);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({
      show: true,
      message,
      type
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const handleUserCreated = () => {
    // Aquí podrías refrescar la lista de usuarios
    console.log("Usuario creado exitosamente");
    showToast("Usuario creado exitosamente", "success");
    // TODO: Refrescar la lista de usuarios desde la API
  };


  const handleUserDeleted = () => {
    // Aquí podrías refrescar la lista de usuarios
    console.log("Usuario eliminado exitosamente");
    showToast("Usuario eliminado exitosamente", "success");
    // TODO: Refrescar la lista de usuarios desde la API
  };
  
  // Original hardcoded array replaced with state
  const [usuarios, setUsuarios] = useState([
    {
      id: "1",
      name: "Ana García",
      email: "ana.garcia@example.com",
      password: "hash_pass_1",
      salt: "salt123",
      creation_date: "2025-01-15",
      profile_pic_url: "https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTIyMDYxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admin: false,
      update_date: "2025-01-15"
    },
    {
      id: "2",
      name: "Bruno Díaz",
      email: "bruno.diaz@example.com",
      password: "hash_pass_2",
      salt: "salt456",
      creation_date: "2025-02-20",
      profile_pic_url: "https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTIyMDYxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admin: true,
      update_date: "2025-02-20"
    },
    {
      id: "3",
      name: "Carla L M",
      email: "carla.lm@example.com",
      password: "hash_pass_3",
      salt: "salt789",
      creation_date: "2025-03-10",
      profile_pic_url: "https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTIyMDYxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admin: true,
      update_date: "2025-03-10"
    },
    {
      id: "4",
      name: "David Soto",
      email: "david.soto@example.com",
      password: "hash_pass_4",
      salt: "salta1b",
      creation_date: "2025-04-05",
      profile_pic_url: "https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTIyMDYxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admin: true,
      update_date: "2025-04-05"
    },
    {
      id: "5",
      name: "Elena Mora",
      email: "elena.mora@example.com",
      password: "hash_pass_5",
      salt: "saltc2d",
      creation_date: "2025-05-12",
      profile_pic_url: "https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTIyMDYxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admin: true,
      update_date: "2025-05-12"
    },
    {
      id: "6",
      name: "Fernando Paz",
      email: "fernando.paz@example.com",
      password: "hash_pass_6",
      salt: "salte3f",
      creation_date: "2025-06-18",
      profile_pic_url: "https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTIyMDYxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admin: true,
      update_date: "2025-06-18"
    },
    {
      id: "7",
      name: "Gisela Roca",
      email: "gisela.roca@example.com",
      password: "hash_pass_7",
      salt: "saltg4h",
      creation_date: "2025-07-21",
      profile_pic_url: "https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTIyMDYxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admin: true,
      update_date: "2025-07-21"
    },
    {
      id: "8",
      name: "Hugo Luna",
      email: "hugo.luna@example.com",
      password: "hash_pass_8",
      salt: "salti5j",
      creation_date: "2025-08-01",
      profile_pic_url: "https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTIyMDYxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admin: true,
      update_date: "2025-08-01"
    },
    {
      id: "9",
      name: "Irene Sol",
      email: "irene.sol@example.com",
      password: "hash_pass_9",
      salt: "saltk6l",
      creation_date: "2025-09-14",
      profile_pic_url: "https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTIyMDYxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admin: true,
      update_date: "2025-09-14"
    },
    {
      id: "10",
      name: "Javier Ríos",
      email: "javier.rios@example.com",
      password: "hash_pass_10",
      salt: "saltm7n",
      creation_date: "2025-09-25",
      profile_pic_url: "https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTIyMDYxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      admin: true,
      update_date: "2025-09-25"
    }
  ]);

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute>
    <div className="flex flex-row min-h-screen">
      <div className="w-1/6">
        <Sidebar />
      </div> 
         
      <main className="flex-1 bg-[#f6f7fb] p-10">
        <div>
          {/* Header con título, buscador y botón crear */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-semibold text-[#060025]">Usuarios</h2>
              <CustomButton
                label="Crear Usuario"
                onClick={openCreateModal}
                className="bg-[#FF4400] hover:bg-[#e63d00]"
              />
            </div>
            <div className="relative max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Buscar por nombre, email o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border border-gray-200 rounded focus:border-[#FF4400] focus:ring-[#FF4400] py-2 w-full"
              />
            </div>
          </div>

          {/* Tabla de usuarios */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Header de la tabla */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200" style={{ backgroundColor: "#060025" }}>
              <div className="col-span-2"><span className="text-sm text-white">ID</span></div>
              <div className="col-span-4"><span className="text-sm text-white">Nombre</span></div>
              <div className="col-span-3"><span className="text-sm text-white">Email</span></div>
              <div className="col-span-3 flex"><span className="text-sm text-white">Acciones</span></div>
            </div>

            {/* Filas */}
            <div className="divide-y divide-gray-100">
              {filteredUsuarios.length > 0 ? (
                filteredUsuarios.map((usuario) => (
                  <div key={usuario.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                    <div className="col-span-2"><span className="text-sm text-gray-600">{usuario.id}</span></div>
                    <div className="col-span-4"><span className="text-sm text-gray-900">{usuario.name}</span></div>
                    <div className="col-span-3"><span className="text-sm text-gray-600">{usuario.email}</span></div>

                    {/* Acciones */}
                    <div className="col-span-3 flex gap-5 ml-10">
                      {/* BOTÓN OJO -> abre modal */}
                      <button
                        type="button"
                        onClick={() => openUserModal(usuario)}
                        className="bg-green-600 hover:bg-green-700 text-white border-0 rounded px-2 py-1 text-sm flex items-center"
                        aria-label={`Ver ${usuario.name}`}
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        type="button"
                        className="bg-white hover:bg-gray-50 border-2 border-[#060025] text-[#060025] hover:text-[#060025] rounded px-2 py-1 text-sm flex items-center"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white border-0 rounded px-2 py-1 text-sm flex items-center"
                        onClick={() => openDeleteModal(usuario)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <p className="text-gray-500">No se encontraron usuarios que coincidan con la búsqueda.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {isModalOpen && selectedUser && (
        <Modal onClose={closeUserModal}>
          <ViewUser user={selectedUser} />
        </Modal>
      )}

      {/* CREATE USER MODAL */}
      {isCreateModalOpen && (
        <CreateUserModal
          onClose={closeCreateModal}
          onUserCreated={handleUserCreated}
          authRunner={authRunner}
        />
      )}

      {/* DELETE USER MODAL */}
      {isDeleteModalOpen && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onClose={closeDeleteModal}
          onUserDeleted={(id) => {
            setUsuarios(prev => prev.filter(u => u.id !== id));
            handleUserDeleted();
          }}
          authRunner={authRunner}
        />
      )}

      {/* TOAST NOTIFICATION */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
    </ProtectedRoute>
  );
}

