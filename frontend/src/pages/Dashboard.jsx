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
            recipes.reduce((sum, recipe) => sum + Number(recipe.time || 0), 0) / recipes.length,
          )
        : 0

    const cuisineMap = recipes.reduce((acc, recipe) => {
      const key = recipe.cuisine || 'Unknown'
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

    const difficultyMap = recipes.reduce((acc, recipe) => {
      const key = recipe.difficulty || 'Unknown'
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

    const topCuisines = Object.entries(cuisineMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return {
      total: recipes.length,
      vegetarian: vegetarianCount,
      nonVegetarian: recipes.length - vegetarianCount,
      avgTime,
      cuisineCount: Object.keys(cuisineMap).length,
      topCuisines,
      difficultyMap,
    }
  }, [recipes])

  if (loading) {
    return <Loader text="Loading dashboard..." />
  }

  return (
    <section className="space-y-6">
      <div className="page-shell rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 p-6 text-white md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">Insights</p>
        <h1 className="mt-1 text-3xl font-extrabold">Recipe Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-200">
          View performance snapshots, cuisine mix, and difficulty balance at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="stat rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="stat-title">Total Recipes</div>
          <div className="stat-value text-slate-900">{stats.total}</div>
        </div>

        <div className="stat rounded-3xl border border-emerald-100 bg-white shadow-sm">
          <div className="stat-title">Vegetarian</div>
          <div className="stat-value text-emerald-600">{stats.vegetarian}</div>
        </div>

        <div className="stat rounded-3xl border border-amber-100 bg-white shadow-sm">
          <div className="stat-title">Non-Vegetarian</div>
          <div className="stat-value text-amber-600">{stats.nonVegetarian}</div>
        </div>

        <div className="stat rounded-3xl border border-sky-100 bg-white shadow-sm">
          <div className="stat-title">Avg Time</div>
          <div className="stat-value text-sky-600">{stats.avgTime}m</div>
        </div>

        <div className="stat rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="stat-title">Cuisines</div>
          <div className="stat-value text-slate-900">{stats.cuisineCount}</div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="page-shell rounded-3xl p-5">
          <h2 className="section-title text-lg font-bold">Top Cuisines</h2>
          <div className="mt-4 space-y-3">
            {stats.topCuisines.length === 0 ? (
              <p className="subtle-text text-sm">No cuisine data available.</p>
            ) : (
              stats.topCuisines.map(([cuisine, count]) => {
                const width = stats.total ? Math.max((count / stats.total) * 100, 8) : 0
                return (
                  <div key={cuisine}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">{cuisine}</span>
                      <span className="text-slate-500">{count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-orange-500"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <div className="page-shell rounded-3xl p-5">
          <h2 className="section-title text-lg font-bold">Difficulty Split</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <div key={level} className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">{level}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {stats.difficultyMap[level] || 0}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page-shell overflow-x-auto rounded-3xl">
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
