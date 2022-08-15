




// import React, {useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPurchasesThunk } from '../store/slices/Purchases.slice';
// const Purchases = () => {



//     const dispatch = useDispatch();
//     const purchases = useSelector(state => state.purchases.data?.purchases)
//     useEffect(() =>{
//         dispatch(getPurchasesThunk())
//     },[])


//     console.log(purchases);
//     return (
//         <div>
//             <h1> My Purchases</h1>
            
//             <div>
//             {
//                 purchases?.map(purchase =>(
//                     <div key={purchase?.id}>
//                     <hr />
//                         {purchase?.createdAt}
//                     <h3>
//                         {purchase?.cart.products[0]?.title}
//                     </h3>
//                     <div>
//                     PRICE: {purchase?.cart.products[0]?.price}
//                     </div>
//                     <hr />
//                     </div>
//                 ))
//             }
//             </div>
            
//         </div>
//     );
//  };
//  export default Purchases;



























import React from 'react';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import { useSelector } from 'react-redux'
import PurchaseItem from '../components/PurchaseItem';



const Purchases = () => {



  const purchases = useSelector( state => state.purchases)
  const dispatch = useDispatch()

    useEffect(()=>{
      dispatch( getPurchasesThunk( ) )
    },[])
    // console.log(purchases)
    const lang = useSelector( state => state.language )


    
    

  return (
    <div style={{marginBottom: '40px'}}>
      <h1>{lang.purchases}</h1>
      
      {
        purchases?.map( item => (
        <div key={item.id} className='purchase'>
          <PurchaseItem   products={item.cart.products} itemDate={item.createdAt}/>
        </div>
          
        ))
      }
    </div>
  );
};

export default Purchases;