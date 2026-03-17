import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecipe, deleteRecipe } from '../redux/actions';

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recipes, loading } = useSelector((state) => state.recipes);
  const recipe = recipes.find((r) => r.id === parseInt(id));

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    category: '',
    dietaryPreferences: '',
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        category: recipe.category,
        dietaryPreferences: recipe.dietaryPreferences,
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (!formData.title.trim() || !formData.ingredients.trim()) {
      alert('Title and ingredients are required');
      return;
    }

    const updatedRecipe = {
      ...recipe,
      ...formData,
    };

    dispatch(updateRecipe(recipe.id, updatedRecipe));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      dispatch(deleteRecipe(recipe.id));
      navigate('/');
    }
  };

  if (!recipe) {
    return (
      <div className="container">
        <div className="alert alert-warning" role="alert">
          Recipe not found
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Recipes
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-body">
              {isEditing ? (
                <div>
                  <h2 className="card-title mb-4">Edit Recipe</h2>

                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Recipe Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="ingredients" className="form-label">
                      Ingredients
                    </label>
                    <textarea
                      className="form-control"
                      id="ingredients"
                      name="ingredients"
                      rows="3"
                      value={formData.ingredients}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="instructions" className="form-label">
                      Instructions
                    </label>
                    <textarea
                      className="form-control"
                      id="instructions"
                      name="instructions"
                      rows="5"
                      value={formData.instructions}
                      onChange={handleChange}
                    ></textarea>
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
                    <button className="btn btn-success" onClick={handleUpdate}>
                      Save Changes
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="card-title mb-3">{recipe.title}</h2>

                  <div className="mb-3">
                    <span className="badge bg-primary me-2">{recipe.category}</span>
                    <span className="badge bg-success">{recipe.dietaryPreferences}</span>
                  </div>

                  <div className="mb-4">
                    <h5>Ingredients:</h5>
                    <p className="text-muted">{recipe.ingredients}</p>
                  </div>

                  <div className="mb-4">
                    <h5>Instructions:</h5>
                    <p className="text-muted">{recipe.instructions}</p>
                  </div>

                  <div className="mb-4">
                    <small className="text-muted">
                      Added on: {new Date(recipe.dateAdded).toLocaleDateString()}
                    </small>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Recipe
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Delete Recipe
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate('/')}
                    >
                      Back to List
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
