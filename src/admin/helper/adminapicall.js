const { API } = require("../../backend");

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

//get all categories
export const getAllCategories = ()=>{
  return fetch(`${API}/categories`,{
    method: 'GET',    
  }).then(response=>{
    return response.json();
  })
  .catch(err=> alert(err));
}

export const getCategory = (categoryId)=>{
  return fetch(`${API}category/${categoryId}`,{
    method: 'GET',    
  }).then(response=>{
    return response.json();
  })
  .catch(err=> alert(err));
}


//get all products
export const getAllProducts = ()=>{
  return fetch(`${API}/products`,{
    method: 'GET',    
  }).then(response=>{
    return response.json();
  })
  .catch(err=> alert(err));
}

//create a product
export const createProduct = (userId,token,product) =>{
  return fetch(`${API}/product/create/${userId}`,{
    method: 'POST',
    headers: {
      Accept: "application/json",      
      Authorization: `Bearer ${token}`,
    },
    body : product,
  }).then((response)=>{
    return response.json();
  }).catch((err)=> alert(err));
}


//delete a product
export const deleteProduct = (productId,userId,token) =>{
  return fetch(`${API}/product/${productId}/${userId}`,{
    method: 'DELETE',
    headers: {
      Accept: "application/json",      
      Authorization: `Bearer ${token}`,
    }    
  }).then((response)=>{
    return response.json();
  }).catch((err)=> alert(err));
}

//delete a category
export const deleteCategory = (categoryId,userId,token) =>{
  return fetch(`${API}/category/${categoryId}/${userId}`,{
    method: 'DELETE',
    headers: {
      Accept: "application/json",      
      Authorization: `Bearer ${token}`,
    }    
  }).then((response)=>{
    return response.json();
  }).catch((err)=> alert(err));
}


//get a product
export const getProduct = (id)=>{
  return fetch(`${API}/product/${id}`,{
    method:'GET'
  }).then(response=>{
    return response.json();
  }).catch(err => alert(err));
}

//update a product

export const updateProduct = (productId,userId,token,product) =>{
  return fetch(`${API}product/${productId}/${userId}`,{
    method: 'PUT',
    headers: {
      Accept: "application/json",      
      Authorization: `Bearer ${token}`,
    },
    body : product,
  }).then((response)=>{
    return response.json();
  }).catch((err)=> alert(err));
}

//update a category

export const updateCategory = (categoryId,userId,token,category) =>{
  return fetch(`${API}category/${categoryId}/${userId}`,{
    method: 'PUT',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",    
      Authorization: `Bearer ${token}`,
    },    
    body : JSON.stringify(category)    
  }).then((response)=>{
    return response.json();
  }).catch((err)=> alert(err));
}