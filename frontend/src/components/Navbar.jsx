import { NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `btn btn-sm rounded-full px-5 transition ${
    isActive
      ? 'border-0 bg-slate-900 text-white shadow-md hover:bg-slate-800'
      : 'btn-ghost text-slate-700 hover:bg-slate-100'
  }`

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <NavLink to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-orange-500 text-base font-bold text-white shadow">
            FR
          </span>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              MERN Recipe Suite
            </p>
            <h1 className="truncate text-sm font-extrabold leading-none text-slate-900 md:text-lg">
              Food Recipe Manager
            </h1>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/recipes/new" className={navLinkClass}>
            Add Recipe
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </nav>

        <div className="dropdown dropdown-end md:hidden">
          <button
            type="button"
            tabIndex={0}
            className="btn btn-sm rounded-xl border-slate-300 bg-white text-slate-700"
            aria-label="Open navigation"
          >
            Menu
          </button>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/recipes/new">Add Recipe</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar
