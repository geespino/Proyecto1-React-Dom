// App.js
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Menu } from './Menu';
import { AuthProvider, AuthRoute } from './auth';
import { HomePage } from './HomePage';
import { BlogPage } from './BlogPage';
import { BlogPost } from './BlogPost';
import { ProfilePage } from './ProfilePage';
import { LoginPage } from './LoginPage';
import { LogoutPage } from './LogoutPage';
import { EditPost } from './EditPost'; // nueva página de edición

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Menu />

          <Routes>
            {/* Ruta pública */}
            <Route path="/" element={<HomePage />} />

            {/* Blog con posts dinámicos */}
            <Route path="/blog" element={<BlogPage />}>
              <Route path=":slug" element={<BlogPost />} />
              {/* Ruta de edición protegida */}
              <Route
                path=":slug/edit"
                element={
                  <AuthRoute requiredRole="admin">
                    <EditPost />
                  </AuthRoute>
                }
              />
            </Route>

            {/* Login público */}
            <Route path="/login" element={<LoginPage />} />

            {/* Logout protegido */}
            <Route
              path="/logout"
              element={
                <AuthRoute>
                  <LogoutPage />
                </AuthRoute>
              }
            />

            {/* Perfil protegido */}
            <Route
              path="/profile"
              element={
                <AuthRoute>
                  <ProfilePage />
                </AuthRoute>
              }
            />

            {/* Ruta no encontrada */}
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
