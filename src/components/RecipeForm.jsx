import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

function RecipeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.recipes);

  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    category: 'Italian',
    dietaryPreferences: 'Non-Vegetarian',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Instructions are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newRecipe = {
      ...formData,
      dateAdded: new Date().toISOString(),
    };

    dispatch(addRecipe(newRecipe));
    navigate('/');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">Add New Recipe</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Recipe Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter recipe title"
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="ingredients" className="form-label">
                    Ingredients <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${errors.ingredients ? 'is-invalid' : ''}`}
                    id="ingredients"
                    name="ingredients"
                    rows="3"
                    value={formData.ingredients}
                    onChange={handleChange}
                    placeholder="Enter ingredients (comma separated)"
                  ></textarea>
                  {errors.ingredients && (
                    <div className="invalid-feedback">{errors.ingredients}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="instructions" className="form-label">
                    Instructions <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${errors.instructions ? 'is-invalid' : ''}`}
                    id="instructions"
                    name="instructions"
                    rows="5"
                    value={formData.instructions}
                    onChange={handleChange}
                    placeholder="Enter cooking instructions"
                  ></textarea>
                  {errors.instructions && (
                    <div className="invalid-feedback">{errors.instructions}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Italian">Italian</option>
                    <option value="Asian">Asian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="American">American</option>
                    <option value="Salad">Salad</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="dietaryPreferences" className="form-label">
                    Dietary Preferences
                  </label>
                  <select
                    className="form-select"
                    id="dietaryPreferences"
                    name="dietaryPreferences"
                    value={formData.dietaryPreferences}
                    onChange={handleChange}
                  >
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                  </select>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : 'Add Recipe'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeForm;
