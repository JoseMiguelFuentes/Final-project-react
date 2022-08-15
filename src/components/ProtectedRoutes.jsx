
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {

  const token = localStorage.getItem( "token" )
  // console.log(token)
    
      if ( token !== '' ) {
        return <Outlet/>
      }else{
        return <Navigate to='/login' />
      }
   
};

export default ProtectedRoutes;