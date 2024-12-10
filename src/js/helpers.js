
export async function getJSON(url){
try {
    const res = fetch(url);
    const mydata = (await res).json();
    const result = await mydata;

    if (res.ok) throw new Error(`${result.status}`);
    return result;
    
} catch (err) {
    throw err
}
}

export async function AJAX(url,uploadRecipe=undefined) {
  try {

    const res = uploadRecipe ? fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadRecipe),
    }) : fetch(url);

    const mydata = (await res).json();
    const result = await mydata;

    if (res.ok) throw new Error(`${result.status}`);
    return result;

    
  } catch (err) {
    throw err
  }
}

export async function sendJSON(url,uploadRecipe) {
  try {
    const res = fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadRecipe),
    });
    const mydata = (await res).json();
    const result = await mydata;

    if (res.ok) throw new Error(`${result.status}`);
    return result;
  } catch (err) {
    throw err;
  }
}

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};