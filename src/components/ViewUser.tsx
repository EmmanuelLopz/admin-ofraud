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
  return (
    <div>
      <div className="flex justify-center mb-6">
        <img
          src={user.profile_pic_url}
          alt={user.name}
          className="w-40 h-40 rounded-full object-cover"
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
            <p className="text-sm text-gray-900">{user.creation_date}</p>
          </div>
        </div>

        {/* Columna 2 */}
        <div>
          <div className="space-y-2">
            <label className="text-sm text-gray-600 block mb-1">Rol:</label>
            <p className="text-sm text-gray-900">{user.admin ? 'Administrador' : 'Usuario'}</p>
            <label className="text-sm text-gray-600 block mb-1">Fecha de actualización:</label>
            <p className="text-sm text-gray-900">{user.update_date}</p>
          </div>
        </div>
      </div>
      <p><b>Likes:</b> </p>
      <p><b>Comentarios:</b> </p>
    </div>
  );
}
