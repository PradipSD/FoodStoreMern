import { NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `btn btn-sm rounded-full px-5 ${
    isActive ? 'btn-primary text-primary-content shadow-sm' : 'btn-ghost'
  }`

function Navbar() {
  return (
    <div className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-lg font-bold text-white shadow">
            FR
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              MERN Project
            </p>
            <h1 className="text-base font-bold leading-none text-slate-900 md:text-lg">
              Food Recipe Manager
            </h1>
          </div>
        </NavLink>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/recipes/new" className={navLinkClass}>
            Add Recipe
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
