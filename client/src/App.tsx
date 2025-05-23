// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BlogPostDetail from './pages/BlogPostDetail';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import CreateEditPost from './pages/CreateEditPost';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={<PrivateRoute adminOnly={true} />}>
              <Route index element={<AdminDashboard />} />
              <Route path="create-post" element={<CreateEditPost />} />
              <Route path="edit-post/:id" element={<CreateEditPost />} />
            </Route>

            {/* Catch-all for 404 */}
            <Route path="*" element={<h1 className="text-center text-3xl mt-10">404 - Page Not Found</h1>} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;