import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import RecipeForm from '../components/RecipeForm'
import { recipeApi } from '../services/api'

const initialFormState = {
  title: '',
  ingredients: '',
  instructions: '',
  time: 30,
  difficulty: 'Easy',
  cuisine: '',
  servings: 2,
  vegetarian: false,
  coverImage: '',
}

function CreateRecipe() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        ingredients: formData.ingredients
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
        time: Number(formData.time),
        servings: Number(formData.servings),
      }

      await recipeApi.create(payload)
      toast.success('Recipe added successfully')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add recipe')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-5xl space-y-5">
      <div className="page-shell rounded-2xl p-6 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
          Recipe Studio
        </p>
        <h1 className="section-title mt-1 text-3xl font-extrabold">Create Recipe</h1>
        <p className="subtle-text mt-2 text-sm">
          Fill all required details and submit.
        </p>
      </div>

      <RecipeForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Create Recipe"
        isSubmitting={isSubmitting}
      />
    </section>
  )
}

export default CreateRecipe
