"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Edit, Eye, Trash2, X, Plus } from "lucide-react"; // <- X para cerrar, Plus para crear
import Modal from "../../components/ViewUserModal";
import CreateUserModal from "../../components/CreateUserModal";
import UpdateUserModal from "../../components/UpdateUserModal";
import ViewUser from "../../components/ViewUser";
import CustomButton from "@/src/components/CustomButton";
import Toast from "../../components/Toast";
import ProtectedRoute from "@/src/wrappers/ProtectedRoute";
import { useAuth } from "@/src/context/AuthContext";
import { AuthRunner } from "@/src/wrappers/authRunner";
import axios from "axios";
import DeleteUserModal from "@/src/components/DeleteUserModal";
import { getProfileImageUrl } from "@/src/utils/imageUtils";
import UserAvatar from "@/src/components/UserAvatar";

type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  salt?: string;
  creation_date: string;
  profile_pic_url: string;
  admin: boolean;
  update_date: string;
};

type PaginatedResponse = {
  users?: User[];
  data?: User[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    total: number;
    limit: number;
  };
  totalPages?: number;
  total?: number;
  currentPage?: number;
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const { accessToken, tryRefreshToken, logout, loadingTokens } = useAuth();
  const [toast, setToast] = useState<{show: boolean, message: string, type: 'success' | 'error'}>({
    show: false,
    message: '',
    type: 'success'
  });

  // API state management
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 10;

  // NEW: estado para modal y usuario seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
      // Keyboard navigation for pagination
      if (!isModalOpen && !isCreateModalOpen && !isDeleteModalOpen && !loading) {
        if (e.key === "ArrowLeft" && currentPage > 1) {
          e.preventDefault();
          handlePageChange(currentPage - 1);
        } else if (e.key === "ArrowRight" && currentPage < totalPages) {
          e.preventDefault();
          handlePageChange(currentPage + 1);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentPage, totalPages, isModalOpen, isCreateModalOpen, isUpdateModalOpen, isDeleteModalOpen, loading]);

  const openUserModal = (usuario: User) => {
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

  const openUpdateModal = (usuario: User) => {
    setSelectedUser(usuario);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
  };

  const openDeleteModal = (usuario: User) => {
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
    console.log("Usuario creado exitosamente");
    showToast("Usuario creado exitosamente", "success");
    fetchUsers(currentPage); // Refresh the users list
  };

  const handleUserUpdated = () => {
    console.log("Usuario actualizado exitosamente");
    showToast("Usuario actualizado exitosamente", "success");
    fetchUsers(currentPage); // Refresh the users list
  };

  const handleUserDeleted = () => {
    console.log("Usuario eliminado exitosamente");
    showToast("Usuario eliminado exitosamente", "success");
    fetchUsers(); // Refresh the users list
  };

  // Fetch users from API
  const fetchUsers = async (page: number = currentPage) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching users for page ${page} with limit ${usersPerPage}`);
      
      // First, get the total count of users
      const totalCount = await authRunner.runWithAuth(async (token) => {
        const countResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/count`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return countResponse.data.count || 0;
      });

      // Calculate total pages based on total count
      const calculatedTotalPages = Math.ceil(totalCount / usersPerPage);
      
      // Then fetch the paginated users
      const result: PaginatedResponse = await authRunner.runWithAuth(async (token) => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/paginated`,
          {
            params: {
              page: page,
              limit: usersPerPage,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      });

      if (result) {
        console.log('Fetched users:', result);
        console.log('Total users count:', totalCount);
        console.log('Calculated total pages:', calculatedTotalPages);
        
        const usersData = result.users || result.data || (Array.isArray(result) ? result : []);
        setUsuarios(usersData);
        
        // Use the calculated values from the count endpoint
        setTotalUsers(totalCount);
        setTotalPages(calculatedTotalPages);
        setCurrentPage(page);
        
        console.log('Pagination set:', { 
          totalUsers: totalCount, 
          totalPages: calculatedTotalPages, 
          currentPage: page 
        });
      } else {
        setError('No se pudieron cargar los usuarios');
      }
    } catch (error: any) {
      console.error('Error fetching users:', error);
      if (error.response?.status === 404) {
        setError('Endpoint no encontrado');
      } else if (error.response?.status === 401) {
        setError('No autorizado para ver usuarios');
      } else {
        setError('Error al cargar los usuarios');
      }
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    if (!loadingTokens && accessToken) {
      fetchUsers(1);
    }
  }, [accessToken, loadingTokens]);

  // Handle page change
  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage || loading) {
      return;
    }
    
    console.log(`Changing from page ${currentPage} to page ${newPage}`);
    setCurrentPage(newPage);
    await fetchUsers(newPage);
  };

  // Helper function to get profile image with placeholder (using utility)
  const getProfileImage = (url: string) => getProfileImageUrl(url);

  const filteredUsuarios = usuarios.filter(usuario =>
    searchTerm === '' ||
    usuario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (usuario.admin ? 'admin' : 'user').toLowerCase().includes(searchTerm.toLowerCase())
  );  return (
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
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-semibold text-[#060025]">Usuarios</h2>
                {!loading && (
                  <span className="text-sm text-gray-500">
                    {totalUsers} usuarios en total
                  </span>
                )}

              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => fetchUsers(currentPage)}
                  disabled={loading}
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                  title="Actualizar lista"
                >
                  ↻
                </button>
                <CustomButton
                  label="Crear Usuario"
                  onClick={openCreateModal}
                  className="bg-[#FF4400] hover:bg-[#e63d00]"
                />
              </div>
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
                placeholder="Buscar por nombre, email, ID o rol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border border-gray-200 rounded focus:border-[#FF4400] focus:ring-[#FF4400] py-2 w-full"
                disabled={loading}
              />
            </div>
          </div>

          {/* Tabla de usuarios */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Header de la tabla */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200" style={{ backgroundColor: "#060025" }}>
              <div className="col-span-1"><span className="text-sm text-white">Avatar</span></div>
              <div className="col-span-2"><span className="text-sm text-white">ID</span></div>
              <div className="col-span-2"><span className="text-sm text-white">Nombre</span></div>
              <div className="col-span-2"><span className="text-sm text-white">Email</span></div>
              <div className="col-span-2"><span className="text-sm text-white">Rol</span></div>
              <div className="col-span-3 flex"><span className="text-sm text-white">Acciones</span></div>
            </div>

            {/* Filas */}
            <div className="divide-y divide-gray-100">
              {loading ? (
                <div className="px-6 py-12 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4400]"></div>
                    <span className="ml-3 text-gray-600">Cargando usuarios...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={() => fetchUsers(currentPage)}
                    className="px-4 py-2 bg-[#FF4400] text-white rounded-md hover:bg-[#e63d00] transition-colors"
                  >
                    Reintentar
                  </button>
                </div>
              ) : filteredUsuarios.length > 0 ? (
                filteredUsuarios.map((usuario) => (
                  <div key={usuario.id} className="grid grid-cols-12 gap-3 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                    <div className="col-span-1 flex justify-center">
                      <UserAvatar 
                        profilePicUrl={usuario.profile_pic_url}
                        name={usuario.name}
                        size="sm"
                      />
                    </div>
                    <div className="col-span-2 overflow-hidden">
                      <span className="text-sm text-gray-600 break-words">{usuario.id}</span>
                    </div>
                    <div className="col-span-2 overflow-hidden">
                      <span className="text-sm text-gray-900 break-words">{usuario.name}</span>
                    </div>
                    <div className="col-span-2 overflow-hidden">
                      <span className="text-sm text-gray-600 break-words">{usuario.email}</span>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        usuario.admin 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {usuario.admin ? 'Admin' : 'User'}
                      </span>
                    </div>

                    {/* Acciones */}
                    <div className="col-span-3 flex gap-2 items-center">
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
                        onClick={() => openUpdateModal(usuario)}
                        className="bg-white hover:bg-gray-50 border-2 border-[#060025] text-[#060025] hover:text-[#060025] rounded px-2 py-1 text-sm flex items-center"
                        aria-label={`Editar ${usuario.name}`}
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

          {/* Pagination Controls */}
          {!error && !loading && totalUsers > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {`Mostrando ${((currentPage - 1) * usersPerPage) + 1} - ${Math.min(currentPage * usersPerPage, totalUsers)} de ${totalUsers} usuarios`}
              </div>
              
              {totalPages > 1 ? (
                <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1 || loading}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                
                <div className="flex gap-1">
                  {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = index + 1;
                    } else if (currentPage <= 3) {
                      pageNum = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + index;
                    } else {
                      pageNum = currentPage - 2 + index;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                        className={`px-3 py-1 text-sm rounded-md transition-colors disabled:opacity-50 ${
                          currentPage === pageNum
                            ? 'bg-[#FF4400] text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {loading && currentPage === pageNum ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-3 w-3 border-b border-white mr-1"></div>
                            {pageNum}
                          </div>
                        ) : (
                          pageNum
                        )}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages || loading}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
              ) : (
                <div className="text-sm text-gray-500">
                  Página 1 de 1
                </div>
              )}
            </div>
          )}
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
        <Modal onClose={closeCreateModal}>
          <CreateUserModal
            onClose={closeCreateModal}
            onUserCreated={handleUserCreated}
            authRunner={authRunner}
          />
        </Modal>
      )}

      {/* UPDATE USER MODAL */}
      {isUpdateModalOpen && selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onClose={closeUpdateModal}
          onUserUpdated={handleUserUpdated}
          authRunner={authRunner}
        />
      )}

      {/* DELETE USER MODAL */}
      {isDeleteModalOpen && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onClose={closeDeleteModal}
          onUserDeleted={(id: string) => {
            // Remove user from local state immediately for better UX
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

