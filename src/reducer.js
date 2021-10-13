
const reducer = (state,action) =>{
    if(action.type === 'CLEAR_CART'){
        return {
            ...state ,
            cart : []
        }
    }

    if(action.type === 'REMOVE_CART'){
        return {
            ...state,
            cart: state.cart.filter((cartitems)=>cartitems.id !== action.payload)
        }
    }

    if(action.type === 'INCREASE_CART'){
        let tempcart = state.cart.map((cartitem)=> {
           // console.log(cartitem)
            if(cartitem.id === action.payload){
                return {
                    ...cartitem,
                    amount : cartitem.amount + 1
                }
            }
            return cartitem
        })
        return {
            ...state,
            cart: tempcart
        }
    }


    if(action.type === 'DECREASE_CART'){
        let tempcart = state.cart.map((cartitem)=> {
           // console.log(cartitem)
            if(cartitem.id === action.payload){
                return {
                    ...cartitem,
                    amount : cartitem.amount - 1
                }
            }
            return cartitem
        }).filter((items)=>items.amount !== 0)
        return {
            ...state,
            cart: tempcart
        }
    }

  if(action.type === 'GET_TOTALS'){
    //cartitem is number of items present
    //carttotal is price and amount
    let {total,amount} = state.cart.reduce((carttotal,cartitem)=>{
        console.log(cartitem)
        console.log(carttotal)
        const {price,amount} = cartitem;
        const itemtotal = price * amount;
        console.log(itemtotal)
        carttotal.amount += amount;
        carttotal.total+=itemtotal;
        return carttotal
        //return cartitem
    },{
        total:0,
        amount:0
    })
    total = parseFloat(total.toFixed(2))
      return {
          ...state,
          total,
          amount
      }
  }
    return state
}

export default reducer