import { API_URL } from './config';

import { TIMEOUT_SEC, RESULT_PER_PAGE_SEARCH,KEY } from './config';
// import { getJSON } from './helpers';
// import { sendJSON } from './helpers';
import {AJAX} from './helpers';
import { timeout } from './helpers';
export const state = {
  recipe: {},
  search: {
    results: [],
    query: '',
    page: 1,
    resultPerPage: RESULT_PER_PAGE_SEARCH,
  },
  bookmarks :[]
};

function convertingRecipeFormat(result) {
  const { recipe } = result.data;

  return {
    id: recipe.id,
    image: recipe.image_url,
    publisher: recipe.publisher,
    title: recipe.title,
    coockingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    serving: recipe.servings,
    url: recipe.source_url,
    ...(recipe.key&&{key:recipe.key}),
  };
}
export async function loadRecipe(id) {
  try {
    const res = Promise.race([
      await AJAX(`${API_URL}${id}?${KEY}`),
      timeout(TIMEOUT_SEC),
    ]);
    const result = await res;

    
    state.recipe = convertingRecipeFormat(result)
    if(state.bookmarks.some(el => el.id === id)) state.recipe.bookmark = true;
    else{
       state.recipe.bookmark = false;
    }
    
  } catch (err) {
    throw err;
  }
}

export async function loadSearchResults(query) {
  try {
    const res = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    

    state.search.results = res.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
        ...(recipe.key && {key:recipe.key})
      };
      
    });
    state.search.query = query;
    state.search.page = 1
  } catch (err) {
    throw err;
  }
}

export function getSearchResultPage(page = state.search.page){
    state.search.page = page 
  // const start = (page - 1) * state.search.resultPerPage 
  // const end = page * state.search.resultPerPage; 
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage

  return state.search.results.slice(start,end)
}

export function updateServings(newServings){
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity*newServings) / state.recipe.serving
  });
  state.recipe.serving = newServings
  // console.log(state.recipe.ingredients)
}
/*

THIS IS MY WAY OF SOLVING THE BOOKMARK
export function addBookmark(recipe){
if(recipe.bookmark) return
recipe.bookmark = true;
state.bookmarks.push(recipe);
}

export function delBookmark(id){
const [bookmarkID] = state.bookmarks.filter(el=>{
  if(el.id === id) return el.id
})
if(bookmarkID.id === id) state.recipe.bookmark = false
}
*/

function saveBookmark(){
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}

export function addBookmark(recipe){
  state.bookmarks.push(recipe)

  if(recipe.id === state.recipe.id) 
    state.recipe.bookmark = true
  saveBookmark()
}
export function delBookmark(id){

  const index = state.bookmarks.findIndex(el => el.id === id)
  state.bookmarks.splice(index,1)

  if (id === state.recipe.id) 
    state.recipe.bookmark = false;
    saveBookmark()
}

function init(){
  const storage = localStorage.getItem('bookmarks')
  if(storage) state.bookmarks = JSON.parse(storage)

}
init()
function quickClear() {
  localStorage.clear('bookmarks');
}
// quickClear()

export async function uploadRecipe(upRecipe) {

  try {
    const recipeArr = Object.entries(upRecipe);
    const ingRecipe = recipeArr.filter(
      ent => ent[0].startsWith('ingredient') && ent[1] !== ''
    ).map(ing=>{
      const ingArr  = ing[1].split(',').map(el => el.trim())
      if(ingArr.length !== 3) throw new Error('Wrong format')
      const [ quantity, unit, description] = ingArr
      return {quantity,unit,description}
    })

    /*
    const ingArr = ingRecipe.map(ent =>{
      const[ quantity, unit, description] = [...ent[1].replaceAll(' ', '').split(',')]
      return {quantity,unit,description}
    
    })
      */

 
    
    const newUploadRecipe = {
      title: upRecipe.title,
      source_url: upRecipe.sourceUrl,
      image_url: upRecipe.image,
      publisher: upRecipe.publisher,
      cooking_time: upRecipe.cookingTime,
      servings: upRecipe.servings,
      ingredients: ingRecipe,
    };

    const resApi = await sendJSON(`${API_URL}?key=${KEY}`,newUploadRecipe)
    const myFormat = convertingRecipeFormat(resApi)
    state.recipe = myFormat
    addBookmark(state.recipe)

    window.history.pushState(null,'',`#${state.recipe.id}`)

  } catch (err) {
    throw err
  }
}
function test(){
  console.log('hello world')
}