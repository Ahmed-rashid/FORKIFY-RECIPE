'use strict';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { CLOSE_MODEL_TIME } from './config';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if(module.hot){
//   module.hot.accept();
// }

async function controlRecipes() {
  try {
    const hashId = window.location.hash.slice(1);

    if (!hashId) return;

    // update ressults view to mark selected search result

    resultsView.update(model.getSearchResultPage())
    bookmarkView.update(model.state.bookmarks);

    recipeView.renderSpinner();
    // 1. load recipe
    await model.loadRecipe(hashId);

    // 2.render Recipe

    const recipe = model.state.recipe;

    recipeView.render(recipe);

  
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
}
async function searchRecipe() {
  try {
    // render spinner
    resultsView.renderSpinner();
    // 1) geting search input value
    const searchQuery = searchView.getQuery();

    if (!searchQuery) return;

    // 2) loading sreaching
    await model.loadSearchResults(searchQuery);

    // 3) render search
   
    resultsView.render(model.getSearchResultPage());
    paginationView.render(model.state);

    
    // resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
}

// controlRecipes();
// window.addEventListener('hashchange', function(){
//  controlRecipes();
// })
function navigaionController(gotoPage){
  resultsView.render(model.getSearchResultPage(gotoPage));
  paginationView.render(model.state);
}

function updateServingController(newServing){
  model.updateServings(newServing);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

function bookmarkController(){
  if(!model.state.recipe.bookmark) model.addBookmark(model.state.recipe)
    else{
  if(model.state.recipe.bookmark)  model.delBookmark(model.state.recipe.id)
  }
  recipeView.render(model.state.recipe)
  bookmarkView.render(model.state.bookmarks)

  
}
function bookmarkViewController(){
bookmarkView.render(model.state.bookmarks)
}

async function uploadController(data){
  try{
    // render spinner
    addRecipeView.renderSpinner()
    // uploading recipe
  await model.uploadRecipe(data);
  // render recipe
  recipeView.render(model.state.recipe)

  // render bookmark
  bookmarkView.render(model.state.bookmarks)

  // rendering save message
  addRecipeView.renderMessage()

  // close window model
  setTimeout(() => {
    addRecipeView.toggleModel()
  }, CLOSE_MODEL_TIME*1000);
  

  }catch(err){
    console.log(err.message)
    addRecipeView.renderError(err.message)
  }
  
}

function init() {

  bookmarkView.addHandlerLoad(bookmarkViewController)
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHanderSearch(searchRecipe);
  paginationView.addClickHandler(navigaionController)
  recipeView.addHandlerUpdateServings(updateServingController)
  recipeView.addHandlerBookmark(bookmarkController);
  addRecipeView.addHandlerUpload(uploadController)
}
init();

