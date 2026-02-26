const difficultyOptions = ['Easy', 'Medium', 'Hard']

function RecipeForm({ formData, onChange, onSubmit, submitLabel, isSubmitting }) {
  return (
    <form
      onSubmit={onSubmit}
      className="page-shell space-y-6 rounded-2xl p-5 md:p-8"
    >
      <div className="rounded-xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-teal-50 p-4">
        <h2 className="text-lg font-bold text-slate-900">Recipe Details</h2>
        <p className="mt-1 text-sm text-slate-600">
          Add clear details so anyone can cook this recipe confidently.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="form-control w-full">
          <span className="label-text mb-1 font-semibold text-slate-700">Title</span>
          <input
            required
            name="title"
            value={formData.title}
            onChange={onChange}
            type="text"
            placeholder="Paneer Butter Masala"
            className="input input-bordered w-full border-slate-300 bg-white"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1 font-semibold text-slate-700">Cuisine</span>
          <input
            required
            name="cuisine"
            value={formData.cuisine}
            onChange={onChange}
            type="text"
            placeholder="Indian"
            className="input input-bordered w-full border-slate-300 bg-white"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="form-control w-full">
          <span className="label-text mb-1 font-semibold text-slate-700">
            Time (minutes)
          </span>
          <input
            required
            min="1"
            name="time"
            value={formData.time}
            onChange={onChange}
            type="number"
            className="input input-bordered w-full border-slate-300 bg-white"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1 font-semibold text-slate-700">
            Difficulty
          </span>
          <select
            required
            name="difficulty"
            value={formData.difficulty}
            onChange={onChange}
            className="select select-bordered w-full border-slate-300 bg-white"
          >
            {difficultyOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1 font-semibold text-slate-700">Servings</span>
          <input
            required
            min="1"
            name="servings"
            value={formData.servings}
            onChange={onChange}
            type="number"
            className="input input-bordered w-full border-slate-300 bg-white"
          />
        </label>
      </div>

      <label className="form-control w-full">
        <span className="label-text mb-1 font-semibold text-slate-700">
          Ingredients (one per line)
        </span>
        <textarea
          required
          name="ingredients"
          value={formData.ingredients}
          onChange={onChange}
          rows="5"
          placeholder={'2 cups flour\n1 onion\n1 tsp salt'}
          className="textarea textarea-bordered w-full border-slate-300 bg-white"
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text mb-1 font-semibold text-slate-700">
          Instructions
        </span>
        <textarea
          required
          name="instructions"
          value={formData.instructions}
          onChange={onChange}
          rows="6"
          placeholder="Step-by-step method"
          className="textarea textarea-bordered w-full border-slate-300 bg-white"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="form-control w-full">
          <span className="label-text mb-1 font-semibold text-slate-700">
            Cover Image URL
          </span>
          <input
            name="coverImage"
            value={formData.coverImage}
            onChange={onChange}
            type="url"
            placeholder="https://example.com/recipe.jpg"
            className="input input-bordered w-full border-slate-300 bg-white"
          />
        </label>

        <label className="label mt-7 cursor-pointer justify-start gap-3 rounded-xl border border-slate-300 bg-white p-3">
          <input
            name="vegetarian"
            checked={formData.vegetarian}
            onChange={onChange}
            type="checkbox"
            className="checkbox checkbox-success"
          />
          <span className="label-text font-medium">Vegetarian Recipe</span>
        </label>
      </div>

      <button
        type="submit"
        className="btn rounded-full border-0 bg-cyan-600 px-7 text-white hover:bg-cyan-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Please wait...' : submitLabel}
      </button>
    </form>
  )
}

export default RecipeForm
