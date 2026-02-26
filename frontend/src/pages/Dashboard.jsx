import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'
import { recipeApi } from '../services/api'

function Dashboard() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data } = await recipeApi.getAll()
        setRecipes(data)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  const stats = useMemo(() => {
    const vegetarianCount = recipes.filter((recipe) => recipe.vegetarian).length
    const avgTime =
      recipes.length > 0
        ? Math.round(
            recipes.reduce((sum, recipe) => sum + Number(recipe.time || 0), 0) /
              recipes.length,
          )
        : 0
    const cuisineCount = new Set(recipes.map((recipe) => recipe.cuisine)).size

    return {
      total: recipes.length,
      vegetarian: vegetarianCount,
      nonVegetarian: recipes.length - vegetarianCount,
      avgTime,
      cuisineCount,
    }
  }, [recipes])

  if (loading) {
    return <Loader text="Loading dashboard..." />
  }

  return (
    <section className="space-y-6">
      <div className="page-shell rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Insights
        </p>
        <h1 className="mt-1 text-3xl font-extrabold">Recipe Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-200">
          Track your recipe collection, time averages, and cuisine variety.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="stat rounded-2xl border border-cyan-100 bg-white shadow-sm">
          <div className="stat-title">Total Recipes</div>
          <div className="stat-value text-primary">{stats.total}</div>
        </div>

        <div className="stat rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <div className="stat-title">Vegetarian</div>
          <div className="stat-value text-success">{stats.vegetarian}</div>
        </div>

        <div className="stat rounded-2xl border border-amber-100 bg-white shadow-sm">
          <div className="stat-title">Non-Vegetarian</div>
          <div className="stat-value text-warning">{stats.nonVegetarian}</div>
        </div>

        <div className="stat rounded-2xl border border-sky-100 bg-white shadow-sm">
          <div className="stat-title">Avg Time</div>
          <div className="stat-value text-info">{stats.avgTime}m</div>
        </div>

        <div className="stat rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="stat-title">Cuisines</div>
          <div className="stat-value">{stats.cuisineCount}</div>
        </div>
      </div>

      <div className="page-shell overflow-x-auto rounded-2xl">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Title</th>
              <th>Cuisine</th>
              <th>Difficulty</th>
              <th>Time</th>
              <th>Servings</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td className="font-semibold">{recipe.title}</td>
                <td>{recipe.cuisine}</td>
                <td>{recipe.difficulty}</td>
                <td>{recipe.time} min</td>
                <td>{recipe.servings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Dashboard
