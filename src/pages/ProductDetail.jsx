


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';




import { useSelector, useDispatch} from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../styles/productDetail.css'
//images
import cart from '../assets/images/cart6.gif'




import { addCartThunk } from '../store/slices/cart.slice';
import { setProductsThunk } from '../store/slices/products.slice';
import Swal from 'sweetalert2';
//*Componentes
import CurrentProduct from '../components/CurrentProduct';
import ProductDescription from '../components/ProductDescription';


const ProductDetail = () => {

  const currentLocation = useLocation()
  
  const Navigate = useNavigate()
  
  
  const {id} = useParams()
  const dispatch = useDispatch()
  const [ currentProduct, setCurrentProduct ] = useState( {} )
  
  const [ productImgs, setProductImgs ] = useState( [] )
  const [ suggestedProduct, setSuggestedProduct ] = useState( [] )
  
    

  const lang = useSelector( state => state.language )
  const products = useSelector( state => state.products )
  
  
  useEffect(()=>{
    dispatch(setProductsThunk() )
  },[id])

  
  
  useEffect(()=>{
      const product = products.find( product => product.id ==   Number( id )  )
      setCurrentProduct( product )
      setProductImgs( product?.productImgs )
      
  },[products])
  useEffect(()=>{
    let suggested = products.filter( product => product?.category.id === currentProduct.category?.id )
    let suggestedFiltered = suggested.filter( product => product.id !== currentProduct.id) 
      setSuggestedProduct( suggestedFiltered )
      
  },[currentProduct])




    

    
      
  
  return (
    <div>
      
      <CurrentProduct currentProduct={currentProduct} productImgs={productImgs}/>
      <ProductDescription currentProduct={currentProduct}/>
      <>
        <h3 style={{margin: '50px auto'}}>{lang.similarProducts}</h3>
      <div className='product_card-box'>
        
        {
          suggestedProduct?.map( item => (
          <article onClick={ () => Navigate(`/productDetail/${item.id}`)}
            key={item.id} className='product-card'>
          
              
            <div className="product-image">
              <img src={item.productImgs[0]} alt="" />
              <img src={item.productImgs[1]} alt="" className="image-first" />
            </div>
              

              <div className='product-data'>
                <h4>{item.title}</h4>
            
                <p>{lang?.priceCard}: ${new Intl.NumberFormat().format(item.price)}</p>
              </div>

          </article>
          ))
        } 
      </div>
    </>
    </div>
  );
};

export default ProductDetail;