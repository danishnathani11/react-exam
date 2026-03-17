import * as types from './actionTypes';

const initialState = {
  recipes: [],
  loading: false,
  error: null,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RECIPES_REQUEST:
    case types.ADD_RECIPE_REQUEST:
    case types.UPDATE_RECIPE_REQUEST:
    case types.DELETE_RECIPE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: action.payload,
      };

    case types.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: [...state.recipes, action.payload],
      };

    case types.UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? action.payload : recipe
        ),
      };

    case types.DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
      };

    case types.FETCH_RECIPES_FAILURE:
    case types.ADD_RECIPE_FAILURE:
    case types.UPDATE_RECIPE_FAILURE:
    case types.DELETE_RECIPE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default recipeReducer;
