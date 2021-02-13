export const addItemToCart = (item,next)=>{
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));        
        }
        cart.push({...item,count:1});
        localStorage.setItem('cart',JSON.stringify(cart));
        next();
    }
}

export const loadProductDataFromStorage = ()=>{

    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'));        
        }else{
            return [];
        }
    }
}

export const removeProductFromCart = (productId,next) =>{
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            cart = cart.filter(item =>{
                return item._id !== productId;
            });
            localStorage.setItem('cart',JSON.stringify(cart));
        }
    }
    next();
}

export const emptyCart = next =>{
    if(typeof window !== undefined){
        localStorage.removeItem('cart');
        next();
    }
}