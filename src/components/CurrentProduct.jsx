import React, { useState,useEffect } from 'react';
import left from '../assets/images/leftCoin.png'
import right from '../assets/images/rightCoin.png'

import    '../styles/currentProduct.css'

import { useSelector } from 'react-redux';
//Images
import Auto from '../assets/images/auto.gif'
import Fixed from '../assets/images/fix.png'







const CurrentProduct = ({currentProduct,productImgs}) => {
  const [ imgIndex, setImgIndex ] = useState( 0 )
  const [ autoSwitch, setAutoSwitch ] = useState( true )
  


  const lang = useSelector( state => state.language )

  useEffect(()=>{
    if(  autoSwitch ){
      let changeImage = setTimeout(() => {
      if ( imgIndex == 2 ) {
        setImgIndex( 0 )
      }else{
        setImgIndex( imgIndex + 1)
      }
    }, 3000);
    setTimeout(()=>{
      clearTimeout(changeImage)
    },10000)
    }
    
  },[imgIndex, autoSwitch])

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
  const setImg =(url)=>{
    const found = (index) => index === url
    setImgIndex(productImgs.findIndex(found))
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

            <div className='galeryView'>
              { 
                productImgs?.map(url =>(
                  <div key={url} className={productImgs[imgIndex] === url ? 'galeryItem imgSelected' : 'galeryItem'} onClick={()=>setImg(url)}>
                    <img src={url}/>
                  </div>
                ))
              } 
              
            </div>
            
          </article>
          <article className='auto'
              onClick={ ()=> setAutoSwitch( !autoSwitch ) }
              style={{ boxShadow:  autoSwitch && '0px 0px 15px 5px rgb(92, 238, 34)'}}
            >
              <div className='auto-contain'><img src={autoSwitch ? Auto : Fixed} alt="auto"/></div>
              <p>{autoSwitch ? 'On':'Off'}</p> 
            
            </article>
          
        </div>
    </div>
  );
};

export default CurrentProduct;



