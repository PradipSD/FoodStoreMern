import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import RecipeCard from '../components/RecipeCard'
import Loader from '../components/Loader'
import { recipeApi } from '../services/api'

const defaultFilters = {
  cuisine: 'All',
  difficulty: 'All',
  vegetarian: 'all',
}

const favoritesStorageKey = 'favoriteRecipes'

function Home() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [maxTime, setMaxTime] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [filters, setFilters] = useState(defaultFilters)
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(favoritesStorageKey) || '[]')
      return Array.isArray(stored) ? stored : []
    } catch {
      return []
    }
  })

  const fetchRecipes = useCallback(async () => {
    setLoading(true)
    try {
      const params = {
        search: search || undefined,
        cuisine: filters.cuisine !== 'All' ? filters.cuisine : undefined,
        difficulty: filters.difficulty !== 'All' ? filters.difficulty : undefined,
        vegetarian: filters.vegetarian !== 'all' ? filters.vegetarian : undefined,
        sortBy,
        maxTime: maxTime || undefined,
      }

      const { data } = await recipeApi.getAll(params)
      setRecipes(data)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch recipes')
    } finally {
      setLoading(false)
    }
  }, [filters, maxTime, search, sortBy])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRecipes()
    }, 250)

    return () => clearTimeout(timer)
  }, [fetchRecipes])

  useEffect(() => {
    localStorage.setItem(favoritesStorageKey, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  const cuisines = useMemo(() => {
    const values = recipes.map((recipe) => recipe.cuisine).filter(Boolean)
    return ['All', ...new Set(values)]
  }, [recipes])

  const visibleRecipes = useMemo(() => {
    if (!showFavoritesOnly) {
      return recipes
    }

    return recipes.filter((recipe) => favoriteIds.includes(recipe._id))
  }, [favoriteIds, recipes, showFavoritesOnly])

  const quickStats = useMemo(() => {
    const vegetarianCount = recipes.filter((recipe) => recipe.vegetarian).length
    return {
      total: recipes.length,
      vegetarian: vegetarianCount,
      quickMeals: recipes.filter((recipe) => Number(recipe.time) <= 30).length,
      hard: recipes.filter((recipe) => recipe.difficulty === 'Hard').length,
    }
  }, [recipes])

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this recipe?')
    if (!confirmed) return

    try {
      await recipeApi.remove(id)
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id))
      setFavoriteIds((prev) => prev.filter((recipeId) => recipeId !== id))
      toast.success('Recipe deleted')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed')
    }
  }

  const handleToggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  return (
    <section className="space-y-5">
      <div className="page-shell rounded-2xl p-5 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Smart Workspace
            </p>
            <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Recipe Collection</h1>
            <p className="max-w-2xl text-sm text-slate-600 md:text-base">
              Search, sort, and manage your recipes from one clean workspace.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500">Total</p>
              <p className="text-xl font-bold text-slate-900">{quickStats.total}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500">Vegetarian</p>
              <p className="text-xl font-bold text-slate-900">{quickStats.vegetarian}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500">Under 30m</p>
              <p className="text-xl font-bold text-slate-900">{quickStats.quickMeals}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500">Hard</p>
              <p className="text-xl font-bold text-slate-900">{quickStats.hard}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-shell rounded-2xl p-4 md:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-slate-900">Browse Recipes</h2>
          <div className="flex items-center gap-2">
            <span className="badge rounded-full border-slate-300 bg-white px-3 py-3 text-slate-700">
              {visibleRecipes.length} shown
            </span>
            <button
              type="button"
              className={`btn btn-sm rounded-full border px-4 ${
                showFavoritesOnly
                  ? 'border-rose-500 bg-rose-500 text-white hover:bg-rose-600'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              }`}
              onClick={() => setShowFavoritesOnly((prev) => !prev)}
            >
              {showFavoritesOnly ? 'Favorites Only' : 'Show Favorites'}
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search title, ingredient, cuisine..."
            className="input input-bordered border-slate-300 bg-white sm:col-span-2 lg:col-span-3 xl:col-span-2"
          />

          <select
            value={filters.cuisine}
            onChange={(e) => setFilters((prev) => ({ ...prev, cuisine: e.target.value }))}
            className="select select-bordered border-slate-300 bg-white"
          >
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>

          <select
            value={filters.difficulty}
            onChange={(e) => setFilters((prev) => ({ ...prev, difficulty: e.target.value }))}
            className="select select-bordered border-slate-300 bg-white"
          >
            <option value="All">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={filters.vegetarian}
            onChange={(e) => setFilters((prev) => ({ ...prev, vegetarian: e.target.value }))}
            className="select select-bordered border-slate-300 bg-white"
          >
            <option value="all">All Types</option>
            <option value="true">Vegetarian</option>
            <option value="false">Non-Vegetarian</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered border-slate-300 bg-white"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title_asc">Title A-Z</option>
            <option value="title_desc">Title Z-A</option>
            <option value="time_asc">Cook Time Low-High</option>
            <option value="time_desc">Cook Time High-Low</option>
          </select>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="input input-bordered flex items-center gap-2 border-slate-300 bg-white">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Max Time</span>
            <input
              value={maxTime}
              onChange={(e) => setMaxTime(e.target.value.replace(/[^0-9]/g, ''))}
              type="text"
              className="w-16 text-sm"
              placeholder="60"
            />
            <span className="text-sm text-slate-500">min</span>
          </label>

          <button
            type="button"
            className="btn rounded-full border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            onClick={() => {
              setSearch('')
              setSortBy('newest')
              setMaxTime('')
              setShowFavoritesOnly(false)
              setFilters(defaultFilters)
            }}
          >
            Reset All
          </button>
        </div>
      </div>

      {loading ? (
        <Loader text="Loading recipes..." />
      ) : visibleRecipes.length === 0 ? (
        <div className="page-shell rounded-2xl border-dashed p-12 text-center">
          <h2 className="text-xl font-semibold text-slate-900">No recipes found</h2>
          <p className="mt-1 text-sm text-slate-600">
            Try different filters or turn off favorites-only mode.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favoriteIds.includes(recipe._id)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Home
