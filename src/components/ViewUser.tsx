import UserAvatar from './UserAvatar';

interface ViewUserProps {
  user: {
    profile_pic_url: string;
    name: string;
    email: string;
    creation_date: string;
    admin: boolean;
    update_date: string;
  };
}

export default function ViewUser({ user }: ViewUserProps) {

  const formatDate = (dateString: string) => {
    if (!dateString || dateString.trim() === '' || dateString === 'null' || dateString === 'undefined') {
      return null;
    }
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString; // Return original if can't parse
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-6">
        <UserAvatar 
          profilePicUrl={user.profile_pic_url}
          name={user.name}
          size="xl"
          className="w-40 h-40"
        />
      </div>
      <h3 className="flex justify-center mb-4 text-xl font-semibold text-[#060025]">
        {user.name}
      </h3>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {/* Columna 1 */}
        <div>
          <div className="space-y-2">
            <label className="text-sm text-gray-600 block mb-1">Correo:</label>
            <p className="text-sm text-gray-900">{user.email}</p>
            <label className="text-sm text-gray-600 block mb-1">Fecha de creación:</label>
            <p className="text-sm text-gray-900">{formatDate(user.creation_date) || user.creation_date}</p>
          </div>
        </div>

        {/* Columna 2 */}
        <div>
          <div className="space-y-2">
            <label className="text-sm text-gray-600 block mb-1">Rol:</label>
            <p className="text-sm text-gray-900">{user.admin ? 'Administrador' : 'Usuario'}</p>
            <label className="text-sm text-gray-600 block mb-1">Fecha de actualización:</label>
            <p className="text-sm text-gray-900">
              {formatDate(user.update_date) || 'Never updated'}
            </p>
          </div>
        </div>
      </div>
      <p><b>Likes:</b> </p>
      <p><b>Comentarios:</b> </p>
    </div>
  );
}
