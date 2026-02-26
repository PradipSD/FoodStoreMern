import { Link } from 'react-router-dom'

function RecipeCard({ recipe, onDelete }) {
  const fallbackImage =
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80'

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <figure className="relative h-52 w-full overflow-hidden">
        <img
          src={recipe.coverImage || fallbackImage}
          alt={recipe.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
        <span
          className={`absolute right-3 top-3 badge border-0 ${
            recipe.vegetarian ? 'bg-emerald-500 text-white' : 'bg-white/90 text-slate-800'
          }`}
        >
          {recipe.vegetarian ? 'Vegetarian' : 'Non-Veg'}
        </span>
      </figure>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h2 className="line-clamp-1 text-lg font-bold text-slate-900">
            {recipe.title}
          </h2>
          <p className="line-clamp-2 text-sm text-slate-600">
            {recipe.instructions}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="badge border-cyan-200 bg-cyan-50 text-cyan-700">
            {recipe.cuisine}
          </span>
          <span className="badge border-amber-200 bg-amber-50 text-amber-700">
            {recipe.difficulty}
          </span>
          <span className="badge border-slate-200 bg-slate-50 text-slate-700">
            {recipe.time} mins
          </span>
          <span className="badge border-slate-200 bg-slate-50 text-slate-700">
            {recipe.servings} servings
          </span>
        </div>

        <p className="text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Ingredients:</span>{' '}
          {recipe.ingredients?.slice(0, 3).join(', ')}
          {recipe.ingredients?.length > 3 ? '...' : ''}
        </p>

        <div className="flex justify-end gap-2 pt-1">
          <Link
            to={`/recipes/${recipe._id}/edit`}
            className="btn btn-sm rounded-full border-0 bg-cyan-600 px-5 text-white hover:bg-cyan-700"
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-sm rounded-full border-0 bg-rose-500 px-5 text-white hover:bg-rose-600"
            onClick={() => onDelete(recipe._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default RecipeCard
