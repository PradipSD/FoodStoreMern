import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import RecipeCard from '../components/RecipeCard'
import Loader from '../components/Loader'
import { recipeApi } from '../services/api'

function Home() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    cuisine: 'All',
    difficulty: 'All',
    vegetarian: 'all',
  })

  const fetchRecipes = useCallback(async () => {
    setLoading(true)
    try {
      const params = {
        search: search || undefined,
        cuisine: filters.cuisine !== 'All' ? filters.cuisine : undefined,
        difficulty: filters.difficulty !== 'All' ? filters.difficulty : undefined,
        vegetarian: filters.vegetarian !== 'all' ? filters.vegetarian : undefined,
      }

      const { data } = await recipeApi.getAll(params)
      setRecipes(data)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch recipes')
    } finally {
      setLoading(false)
    }
  }, [filters, search])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRecipes()
    }, 250)

    return () => clearTimeout(timer)
  }, [fetchRecipes])

  const cuisines = useMemo(() => {
    const values = recipes.map((recipe) => recipe.cuisine).filter(Boolean)
    return ['All', ...new Set(values)]
  }, [recipes])

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this recipe?')
    if (!confirmed) return

    try {
      await recipeApi.remove(id)
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id))
      toast.success('Recipe deleted')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed')
    }
  }

  return (
    <section className="space-y-6">
      <div className="page-shell overflow-hidden rounded-2xl">
        <div className="border-b border-slate-200 bg-gradient-to-r from-cyan-600 to-teal-600 p-6 text-white md:p-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Recipe Collection</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/90 md:text-base">
            Discover, organize, and manage your recipes in one polished workspace.
          </p>
        </div>

        <div className="p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="section-title text-xl font-bold">Browse Recipes</h2>
            <span className="badge rounded-full border-slate-300 bg-white px-3 py-3 text-slate-700">
              {recipes.length} total
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search title, ingredient, cuisine..."
              className="input input-bordered border-slate-300 bg-white md:col-span-2"
            />

            <select
              value={filters.cuisine}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, cuisine: e.target.value }))
              }
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
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, difficulty: e.target.value }))
              }
              className="select select-bordered border-slate-300 bg-white"
            >
              <option value="All">All Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select
              value={filters.vegetarian}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, vegetarian: e.target.value }))
              }
              className="select select-bordered border-slate-300 bg-white"
            >
              <option value="all">All Types</option>
              <option value="true">Vegetarian</option>
              <option value="false">Non-Vegetarian</option>
            </select>

            <button
              type="button"
              className="btn rounded-full border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              onClick={() => {
                setSearch('')
                setFilters({ cuisine: 'All', difficulty: 'All', vegetarian: 'all' })
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader text="Loading recipes..." />
      ) : recipes.length === 0 ? (
        <div className="page-shell rounded-2xl border-dashed p-12 text-center">
          <h2 className="section-title text-xl font-semibold">No recipes found</h2>
          <p className="subtle-text mt-1 text-sm">
            Add a new recipe or adjust your search and filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Home
