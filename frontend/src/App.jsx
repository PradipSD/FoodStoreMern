import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreateRecipe from './pages/CreateRecipe'
import EditRecipe from './pages/EditRecipe'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div data-theme="corporate" className="min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/new" element={<CreateRecipe />} />
          <Route path="/recipes/:id/edit" element={<EditRecipe />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: { fontSize: '0.9rem' },
        }}
      />
    </div>
  )
}

export default App
