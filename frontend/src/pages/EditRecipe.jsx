import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import RecipeForm from '../components/RecipeForm'
import Loader from '../components/Loader'
import { recipeApi } from '../services/api'

function EditRecipe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    time: 30,
    difficulty: 'Easy',
    cuisine: '',
    servings: 2,
    vegetarian: false,
    coverImage: '',
  })

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await recipeApi.getById(id)
        setFormData({
          title: data.title || '',
          ingredients: (data.ingredients || []).join('\n'),
          instructions: data.instructions || '',
          time: data.time || 30,
          difficulty: data.difficulty || 'Easy',
          cuisine: data.cuisine || '',
          servings: data.servings || 2,
          vegetarian: !!data.vegetarian,
          coverImage: data.coverImage || '',
        })
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load recipe')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id, navigate])

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

      await recipeApi.update(id, payload)
      toast.success('Recipe updated successfully')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <Loader text="Loading recipe..." />
  }

  return (
    <section className="mx-auto max-w-5xl space-y-5">
      <div className="page-shell rounded-3xl p-6 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
          Recipe Studio
        </p>
        <h1 className="section-title mt-1 text-3xl font-extrabold">Edit Recipe</h1>
        <p className="subtle-text mt-2 text-sm">
          Refine your recipe and keep your collection polished.
        </p>
      </div>

      <RecipeForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        isSubmitting={isSubmitting}
      />
    </section>
  )
}

export default EditRecipe
