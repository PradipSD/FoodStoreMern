import { Link } from 'react-router-dom'

function RecipeCard({ recipe, onDelete, onToggleFavorite, isFavorite }) {
  const fallbackImage =
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80'

  const shortIngredients = recipe.ingredients?.slice(0, 4) || []

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <figure className="relative h-52 w-full overflow-hidden">
        <img
          src={recipe.coverImage || fallbackImage}
          alt={recipe.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-transparent" />

        <button
          type="button"
          onClick={() => onToggleFavorite(recipe._id)}
          className={`btn btn-xs absolute left-3 top-3 rounded-full border-0 px-3 ${
            isFavorite
              ? 'bg-rose-500 text-white hover:bg-rose-600'
              : 'bg-white/90 text-slate-800 hover:bg-white'
          }`}
        >
          {isFavorite ? 'Favorited' : 'Favorite'}
        </button>

        <span
          className={`absolute right-3 top-3 badge border-0 ${
            recipe.vegetarian ? 'bg-emerald-500 text-white' : 'bg-amber-200 text-amber-950'
          }`}
        >
          {recipe.vegetarian ? 'Vegetarian' : 'Non-Veg'}
        </span>

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 pb-3 text-white">
          <span className="badge border-white/20 bg-white/15 text-xs text-white">
            {recipe.time} min
          </span>
          <span className="badge border-white/20 bg-white/15 text-xs text-white">
            {recipe.servings} servings
          </span>
        </div>
      </figure>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h2 className="line-clamp-1 text-xl font-bold text-slate-900">{recipe.title}</h2>
          <p className="line-clamp-2 text-sm text-slate-600">{recipe.instructions}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="badge border-teal-200 bg-teal-50 text-teal-700">{recipe.cuisine}</span>
          <span className="badge border-orange-200 bg-orange-50 text-orange-700">
            {recipe.difficulty}
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            Ingredients
          </p>
          <div className="flex flex-wrap gap-1.5">
            {shortIngredients.map((ingredient) => (
              <span
                key={`${recipe._id}-${ingredient}`}
                className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-700"
              >
                {ingredient}
              </span>
            ))}
            {recipe.ingredients?.length > 4 ? (
              <span className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500">
                +{recipe.ingredients.length - 4} more
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end">
          <Link
            to={`/recipes/${recipe._id}/edit`}
            className="btn btn-sm rounded-full border-0 bg-slate-900 px-5 text-white hover:bg-slate-800"
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
