


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';




import { useSelector, useDispatch} from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../styles/productDetail.css'
//images
import cart from '../assets/images/cart6.gif'
import left from '../assets/images/leftCoin.png'
import right from '../assets/images/rightCoin.png'
import Fixed from '../assets/images/fix.png'
import Auto from '../assets/images/auto.gif'

import { addCartThunk } from '../store/slices/cart.slice';
import { setProductsThunk } from '../store/slices/products.slice';
import Swal from 'sweetalert2';


const ProductDetail = () => {

  const currentLocation = useLocation()
  const [open, setOpen] = useState(false)
  const Navigate = useNavigate()
  
  
  const {id} = useParams()
  const dispatch = useDispatch()
  const [ currentProduct, setCurrentProduct ] = useState( {} )
  const [ autoSwitch, setAutoSwitch ] = useState( false )
  const [ productImgs, setProductImgs ] = useState( [] )
  const [ suggestedProduct, setSuggestedProduct ] = useState( [] )
  const [ imgIndex, setImgIndex ] = useState( 0 )
  const [ quantity, setQuantity ] = useState( 1 )
    

  const lang = useSelector( state => state.language )
  const products = useSelector( state => state.products )
  
  
  useEffect(()=>{
    dispatch(setProductsThunk() )
  },[id])

  useEffect(()=>{
    if(  autoSwitch ){
      let changeImage = setTimeout(() => {
      if ( imgIndex == 2 ) {
        setImgIndex( 0 )
      }else{
       setImgIndex( imgIndex + 1)
      }
    }, 1500);
    setTimeout(()=>{
      clearTimeout(changeImage)
    },10000)
    }
    
  },[imgIndex, autoSwitch])
  
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




    const nextImage = ()=>{
      if ( imgIndex >= 2 ) {
        setImgIndex( 0 )
      }else{
        setImgIndex( imgIndex + 1)
      }
    }
    const previousImage = ()=>{
      if ( imgIndex == 0 ) {
        setImgIndex( 2 )
      }else{
        setImgIndex( imgIndex - 1)
      }
    }

    const sendToCart =( )=>{
      
      const body = {
        id: currentProduct.id,
        quantity
      }
      dispatch( addCartThunk( body, lang.createErrorTitle, lang.createErrorText, lang.ProductSentError ) )
      setQuantity(1)
      Swal.fire(
        {title: lang.ready,
        text: lang.ProductSent,
        icon:'success',
        confirmButtonColor: '#50524f',
        toast:true, 
      })
      
    }
       
  
  return (
    <div>
      
        <h2>{currentProduct?.title}</h2>
        <div className='mother'>
          
          <article className='image_content'>
            <img src={productImgs?.[imgIndex]}
              className='main'
            alt="productImg" />
            <p className='left'
              onClick={ previousImage }
            ><img src={left} alt=""/></p>

            <p className='right'
              onClick={ nextImage }
            ><img src={right} alt=""/></p>
            
          </article>
          <article className='auto'
              onClick={ ()=> setAutoSwitch( !autoSwitch ) }
              style={{ boxShadow:  autoSwitch && '0px 0px 15px 5px rgb(92, 238, 34)'}}
            >
              <div className='auto-contain'><img src={autoSwitch ? Auto : Fixed} alt="auto"/></div>
              <p>{autoSwitch ? 'On':'Off'}</p> 
            
            </article>
          <article className='section1'>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}>
                Description
            </Button>
            <div style={{ minHeight: '150px'  }}>
              <Collapse in={open} dimension="height">
                <div id="example-collapse-text">
                  <div body style={{ width: '60%', marginRight: 'auto', marginLeft: 'auto', paddingTop: '1%' }}>
                    <p>{currentProduct?.description}</p>
                    <div className='quantity'>
                      <div className='quantity-name'>{lang.quantity}</div>
                      <div className='quantity-data'>

                        <button className='turn-quantity'
                        disabled={quantity === 1}
                        onClick={ ()=> setQuantity( quantity - 1)}
                        >
                          -
                          </button>
                        <p className='quantity-number'>{quantity}</p>
                        <button 
                        className='turn-quantity'
                        onClick={ ()=> setQuantity( quantity + 1)}>
                          +
                          </button>
                      </div>
                    </div>
                    <div className='buy' onClick={ sendToCart }>
                        {lang.addToCart}
                    </div>

                    <div className='box-price'>
                      <div className='price'>
                        {lang.price}{currentProduct?.price} / {lang.total}{quantity * currentProduct?.price}
                      </div>
                    </div>

                  </div>
                  
                </div>
              </Collapse>
            </div>
            
          </article>
        </div>
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