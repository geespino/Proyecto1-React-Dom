import React from 'react';
import { useAuth } from './auth';
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const auth = useAuth();
  const { username } = useParams();

  // Validar que el username de la URL coincide con el usuario autenticado
  if (auth.user?.username !== username) {
    return <p>No tienes permisos para ver este perfil.</p>;
  }

  return (
    <>
      <h1>Perfil</h1>
      <p>Welcome, {auth.user.username}</p>
    </>
  );
}

export { ProfilePage };
