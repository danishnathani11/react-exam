import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../redux/actions';
import { Link } from 'react-router-dom';

function RecipeList() {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDiet, setFilterDiet] = useState('All');

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const getFilteredAndSortedRecipes = () => {
    let filtered = [...recipes];

    if (filterCategory !== 'All') {
      filtered = filtered.filter((recipe) => recipe.category === filterCategory);
    }

    if (filterDiet !== 'All') {
      filtered = filtered.filter((recipe) => recipe.dietaryPreferences === filterDiet);
    }

    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'date') {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
      return 0;
    });

    return filtered;
  };

  const categories = ['All', ...new Set(recipes.map((recipe) => recipe.category))];
  const dietaryOptions = ['All', ...new Set(recipes.map((recipe) => recipe.dietaryPreferences))];
  const filteredRecipes = getFilteredAndSortedRecipes();

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

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mb-4">Recipe Collection</h2>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <label htmlFor="sortBy" className="form-label">
            Sort By:
          </label>
          <select
            id="sortBy"
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="date">Date Added</option>
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="filterCategory" className="form-label">
            Filter by Category:
          </label>
          <select
            id="filterCategory"
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="filterDiet" className="form-label">
            Filter by Dietary Preference:
          </label>
          <select
            id="filterDiet"
            className="form-select"
            value={filterDiet}
            onChange={(e) => setFilterDiet(e.target.value)}
          >
            {dietaryOptions.map((diet) => (
              <option key={diet} value={diet}>
                {diet}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No recipes found. Try adjusting your filters or add a new recipe!
        </div>
      ) : (
        <div className="row">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">
                    <span className="badge bg-primary me-2">{recipe.category}</span>
                    <span className="badge bg-success">{recipe.dietaryPreferences}</span>
                  </p>
                  <p className="card-text text-muted small">
                    {recipe.ingredients.substring(0, 100)}...
                  </p>
                  <Link to={`/recipe/${recipe.id}`} className="btn btn-outline-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;
