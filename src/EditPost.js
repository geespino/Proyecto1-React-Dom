// src/EditPost.js
import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useAuth } from './auth';

function EditPost() {
  const { slug } = useParams();
  const { posts, editPost } = useOutletContext();
  const auth = useAuth();

  const post = posts.find(p => p.slug === slug);

  if (!post) return <p>Post no encontrado</p>;

  const canEdit = auth.user?.isAdmin || post.author === auth.user?.username;

  if (!canEdit) {
    return <p>No tienes permisos para editar este post.</p>;
  }

  return (
    <div>
      <h2>Editando: {post.title}</h2>
      {/* Aquí va tu formulario de edición */}
    </div>
  );
}

export { EditPost };
