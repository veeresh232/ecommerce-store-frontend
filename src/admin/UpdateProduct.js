import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { getAllCategories, getProduct, updateProduct} from './helper/adminapicall'
const UpdateProduct = ({match}) => {
    const {user,token}= isAuthenticated();
    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        stock:'',
        photo:'',
        categories:[],
        category:{},
        loading: false,
        error: '',
        createdProduct:'',
        getRedirect: false,
        image:'',
        formData: new FormData()
    });

    let {name, description,price,stock,category, image,photo,categories,loading,error,createdProduct,getRedirect,formData} = values;

    const preLoad = (imageData,categoryData) =>{
      getAllCategories().then(data =>{
        if(data.error){
          setValues({...values,error:data.error});
        }else{
          setValues({categories:data,formData:new FormData(),error:'',category:categoryData,image:imageData,photo:{}});
          console.log(data);
          
        }
      })
    }

    const preLoadProduct = productId =>{
        getProduct(productId).then(data=>{
            if(data.error){
                setValues({...values,error:data.error});
            }else{
                var image = new Buffer(data.photo.data.data).toString('base64');
            var contentType = data.photo.contentType;
                setValues({...values,
                    name:data.name,
                    price:data.price,
                    description:data.description,
                    stock:data.stock,
                    category:data.category,
                    formData: new FormData(), 
                    error:'',
                    photo: data.photo,
                    image : `data:${contentType};base64,${image}`
                    })
                    preLoad(`data:${contentType};base64,${image}`,data.category);
            }
        })
    }
    useEffect(() => {
      //preLoad();
      preLoadProduct(match.params.productId);
    }, []);
    const onSubmit = (event) =>{      
       event.preventDefault();       
       setValues({...values,error:'',loading:true});
       updateProduct(match.params.productId,user._id,token,formData).then(data=>{
          if(data.error){
              setValues({...values,error:data.error});
          }else{
            var image = new Buffer(data.photo.data.data).toString('base64');
            var contentType = data.photo.contentType;
             setValues({...values,
            name:data.name,
            price:data.price,
            description:data.description,
            stock:data.stock,
            photo:data.photo,
            loading:false,
            error:'',
            formData: new FormData(),
            image : `data:${contentType};base64,${image}`,
            createdProduct:data.name})
          }
       }).catch();
    }

    const successMsg = ()=>(
      
      <div className="alert alert-success mt-3" style={{display: createdProduct?"":"none"}}>
        <h4>{createdProduct} updated Successfully!</h4>
      </div>
    )

    const errorMsg = ()=>(
      <div className="alert alert-danger mt-3" style={{display: error!=''?"":"none"}}>
        <h4>{error}!</h4>
      </div>
    )

    const handleChange = name => event =>{
        const value = name === 'photo'? event.target.files[0] : event.target.value;
        formData.set(name,value);
        setValues({...values,[name]:value});
    }
    const createProductForm = () => (
        <form >
             <div className="form-group">
             <span>Current photo</span>
             <br/>
              {photo && <img src={values.image} style={{width:300,height:150}} />}
             </div>
          <span>Post photo</span>
          <div className="form-group">
              
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
              defaultValue={category}
            >
              <option>Select</option>
              {categories.map((item,index) =>{
              return <option key={index}  value={item._id}>{item.name}</option>
              })}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Update Product
          </button>
        </form>
      );
    return (
        <Base
        title='Add a new Product'
        descrption='Showcase your new products'
        className='container bg-info p-4'>
        
            <Link to='/admin/dashboard' className='btn btn-md btn-dark mb-3'>Back</Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                  {successMsg()}
                  {errorMsg()}
                {createProductForm()}
                </div>
            </div>
        </Base>
    );
}

export default UpdateProduct;
