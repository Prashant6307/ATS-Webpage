import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Projects from './pages/Projects'
import Team from './pages/Team'
import Resources from './pages/Resources'
import Contact from './pages/Contact'
import Achievements from './pages/Achievements'
import Gallery from './pages/Gallery'
import NotFound from './pages/NotFound'
import MyRegistrations from './pages/MyRegistrations'
import Login from './auth/Login'
import Signup from './auth/Signup'
import SubmitProject from './pages/SubmitProject'
import MySubmissions from './pages/MySubmissions'
import Profile from './pages/Profile'
import AdminUsers from './pages/AdminUsers'
import AdminRoute from './components/AdminRoute'
import AdminDashboard from './pages/AdminDashboard'
import AdminEvents from './pages/AdminEvents'
import AdminProjects from './pages/AdminProjects'
import AdminSubmissions from './pages/AdminSubmissions'
import AdminAnnouncements from './pages/AdminAnnouncements'
import AdminTeam from './pages/AdminTeam'
import AdminGallery from './pages/AdminGallery'
import AdminContact from './pages/AdminContact'
import AdminRegistrations from './pages/AdminRegistrations'
import EventDetails from './pages/EventDetails'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Routes location={location}>

          {/* Public Routes */}

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/my-registrations" element={<MyRegistrations />} />
          <Route path="/submit-project" element={<SubmitProject />} />
          <Route path="/my-submissions" element={<MySubmissions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <AdminRoute>
                <AdminEvents />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <AdminRoute>
                <AdminProjects />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/submissions"
            element={
              <AdminRoute>
                <AdminSubmissions />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/announcements"
            element={
              <AdminRoute>
                <AdminAnnouncements />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/team"
            element={
              <AdminRoute>
                <AdminTeam />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <AdminRoute>
                <AdminGallery />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/contact"
            element={
              <AdminRoute>
                <AdminContact />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/registrations"
            element={
              <AdminRoute>
                <AdminRegistrations />
              </AdminRoute>
            }
          />

          {/* Authentication */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* 404 */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const location = useLocation()

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/signup'

  return (
    <>
      {!isAuthPage && <Navbar />}

      <AnimatedRoutes />

      {!isAuthPage && <Footer />}
    </>
  )
}