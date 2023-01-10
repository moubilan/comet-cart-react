
const reducer = (state, action) => {
    if (action.type === 'CLEAR_CART') {
        return {...state, cart: []}
    } 
    if (action.type === 'REMOVE') {
        return {...state,
            cart: state.cart.filter( (item) => {
                return item.id !== action.payload})}
    }
    if (action.type === 'INCREASE') {
        let tempCart = state.cart.map( (item) => {
            if (item.id === action.payload) {
                return {...item, amount: item.amount + 1}
            }
            return item;
        })
        return {...state, cart: tempCart}
    }
    if (action.type === 'DECREASE') {
        let tempCart = state.cart
        .map( (item) => {
            if (item.id === action.payload) {
                return {...item, amount: item.amount - 1}
            }
            return item;
        })
        .filter( (item) => item.amount !==0)
        return {...state, cart: tempCart}
    }
    if (action.type === 'GET_TOTAL') {
        let {total, amount} = state.cart.reduce( (cartTotal, cartItem) => {
            const {price, amount} = cartItem
            const itemTotal = price * amount
            cartTotal.amount += amount
            cartTotal.total += itemTotal
            return cartTotal
        },
        {
            total : 0,
            amount: 0
        })
        total = parseFloat(total.toFixed(2))
        return {...state, amount, total}
    }
    if (action.type === 'LOADING') {
        return {...state, loading: true}
    }
    if (action.type === 'GET_ITEMS') {
        return {...state, cart: action.payload, loading: false}
    }
} 
export default reducer;