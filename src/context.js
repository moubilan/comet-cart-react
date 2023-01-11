import React, { useContext, useReducer, useEffect } from 'react'
// import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const initialState = {
  loading: false, cart: [], amount: 0, total:0
}

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  function clearCart() {
    dispatch({type : 'CLEAR_CART' })
  }

  function remove(id) {
    dispatch({type: 'REMOVE', payload: id})
  }

  function increase(id) {
    dispatch({type:'INCREASE', payload: id})
  }

  function decrease(id) {
      dispatch({type:'DECREASE', payload: id})
  }

  async function fetchData() {
    dispatch({type: 'LOADING'})
    const response = await fetch(url)
    const result = await response.json()
    dispatch({type: 'GET_ITEMS', payload: result})
    
  }

  useEffect( () => {
    fetchData()
  }, [])

  useEffect( () => {
    dispatch({type: 'GET_TOTAL'})
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state, clearCart, remove, increase, decrease
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
