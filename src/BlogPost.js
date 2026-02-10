// BlogPost.js
import React, { useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { useAuth } from './auth';

function BlogPost() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { posts, deletePost, editPost } = useOutletContext();
  const auth = useAuth();

  const blogpost = posts.find(post => post.slug === slug);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: blogpost?.title || "",
    content: blogpost?.content || ""
  });

  if (!blogpost) {
    return <p>Post no encontrado</p>;
  }

  const canDelete = auth.user?.isAdmin || blogpost.author === auth.user?.username;
  const canEdit   = auth.user?.isAdmin || blogpost.author === auth.user?.username;

  const returnToBlog = () => {
    navigate('/blog');
  };

  const handleDelete = () => {
    deletePost(blogpost.slug);
    navigate('/blog');
  };

  const handleEdit = () => {
    editPost(blogpost.slug, formData);
    setIsEditing(false);
  };

  return (
    <>
      <h2>{blogpost.title}</h2>
      <button onClick={returnToBlog}>Volver al blog</button>
      <p>{blogpost.author}</p>

      {isEditing ? (
        <>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <button onClick={handleEdit}>Guardar cambios</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <p>{blogpost.content}</p>
      )}

      {canDelete && (
        <button onClick={handleDelete}>Eliminar blogpost</button>
      )}

      {canEdit && !isEditing && (
        <button onClick={() => setIsEditing(true)}>Editar blogpost</button>
      )}
    </>
  );
}

export { BlogPost };


