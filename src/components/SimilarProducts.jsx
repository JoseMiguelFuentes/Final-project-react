
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCategoryThunk } from '../store/slices/similarProducts.slice';
import  {useNavigate, useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import cart from '../assets/images/cart4.png'












const SimilarProducts = (  ) => {


  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const [ items, setItems ] = useState([])
  const {id} = useParams()



  const products = useSelector( state => state.products)
  const categoryItems = useSelector( state => state.similarProducts)

  const categoryId = products.find( item => item.id == Number( id ) )?.category.id

  useEffect(()=>{
    dispatch( filterCategoryThunk( categoryId ) )
    let itemsFiltered = categoryItems?.filter( item => item.id !== Number( id ))
    setItems( itemsFiltered )
  },[categoryId])

  // useEffect(()=>{
  //   let itemsFiltered = categoryItems?.filter( item => item.id !== Number( id ))
  //   setItems( itemsFiltered )
  // },[id])
  


  console.log(items);





  return (
    <>
        <h3 style={{margin: '50px auto'}}>Maybe you might be interested</h3>
      <div className='product_card-box'>
        
        {
          items?.map( item => (
          <article onClick={ () => Navigate(`/productDetail/${item.id}`)}
            key={item.id} className='product-card'>
          
              
            <div className="product-image">
              <img src={item.productImgs[0]} alt="" />
              <img src={item.productImgs[1]} alt="" className="image-first" />
            </div>
              

              <div className='product-data'>
                <h4>{item.title}</h4>
            
              <p>Price: <br />${item.price}</p>
              </div>

              <div className='cart_box'><img src={cart} alt="" /></div>
          
        
          </article>
          ))
        } 
      </div>
    </>
  );
};

export default SimilarProducts;