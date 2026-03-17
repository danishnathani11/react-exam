import axios from 'axios';
import * as types from './actionTypes';

const API_URL = 'http://localhost:3001';

export const fetchRecipesRequest = () => ({
  type: types.FETCH_RECIPES_REQUEST,
});

export const fetchRecipesSuccess = (recipes) => ({
  type: types.FETCH_RECIPES_SUCCESS,
  payload: recipes,
});

export const fetchRecipesFailure = (error) => ({
  type: types.FETCH_RECIPES_FAILURE,
  payload: error,
});

export const fetchRecipes = () => {
  return async (dispatch) => {
    dispatch(fetchRecipesRequest());
    try {
      const response = await axios.get(`${API_URL}/recipes`);
      dispatch(fetchRecipesSuccess(response.data));
    } catch (error) {
      dispatch(fetchRecipesFailure(error.message));
    }
  };
};

export const addRecipeRequest = () => ({
  type: types.ADD_RECIPE_REQUEST,
});

export const addRecipeSuccess = (recipe) => ({
  type: types.ADD_RECIPE_SUCCESS,
  payload: recipe,
});

export const addRecipeFailure = (error) => ({
  type: types.ADD_RECIPE_FAILURE,
  payload: error,
});

export const addRecipe = (recipe) => {
  return async (dispatch) => {
    dispatch(addRecipeRequest());
    try {
      const response = await axios.post(`${API_URL}/recipes`, recipe);
      dispatch(addRecipeSuccess(response.data));
    } catch (error) {
      dispatch(addRecipeFailure(error.message));
    }
  };
};

export const updateRecipeRequest = () => ({
  type: types.UPDATE_RECIPE_REQUEST,
});

export const updateRecipeSuccess = (recipe) => ({
  type: types.UPDATE_RECIPE_SUCCESS,
  payload: recipe,
});

export const updateRecipeFailure = (error) => ({
  type: types.UPDATE_RECIPE_FAILURE,
  payload: error,
});

export const updateRecipe = (id, recipe) => {
  return async (dispatch) => {
    dispatch(updateRecipeRequest());
    try {
      const response = await axios.put(`${API_URL}/recipes/${id}`, recipe);
      dispatch(updateRecipeSuccess(response.data));
    } catch (error) {
      dispatch(updateRecipeFailure(error.message));
    }
  };
};

export const deleteRecipeRequest = () => ({
  type: types.DELETE_RECIPE_REQUEST,
});

export const deleteRecipeSuccess = (id) => ({
  type: types.DELETE_RECIPE_SUCCESS,
  payload: id,
});

export const deleteRecipeFailure = (error) => ({
  type: types.DELETE_RECIPE_FAILURE,
  payload: error,
});

export const deleteRecipe = (id) => {
  return async (dispatch) => {
    dispatch(deleteRecipeRequest());
    try {
      await axios.delete(`${API_URL}/recipes/${id}`);
      dispatch(deleteRecipeSuccess(id));
    } catch (error) {
      dispatch(deleteRecipeFailure(error.message));
    }
  };
};

export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: types.LOGOUT_USER,
});
