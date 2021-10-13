import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialstate = {
  loading:false,
  cart : cartItems,
  total:0,
  amount:0
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialstate)

  const clearcart = () =>{
    dispatch({
      type : 'CLEAR_CART'
    })
  }

  const removecart = (id) =>{
    dispatch({
      type:'REMOVE_CART',
      payload:id
    })
  }

  const increasecart = (id) =>{
    dispatch({
      type : 'INCREASE_CART',
      payload:id
    })
  }

  const decreasecart =(id) =>{
    dispatch({
      type : 'DECREASE_CART',
      payload:id
    })
  }

  useEffect(()=>{
    dispatch({
      type:'GET_TOTALS'
    })
  },[state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearcart,
        removecart,
        increasecart,
        decreasecart
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
