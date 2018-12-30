const intialState = {
    cart: []
}

const UPDATE_CART = 'UPDATE_CART';
const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

export function updateCart(item) {
    return {
        type: UPDATE_CART,
        payload: item
    }
}
export function deleteItemFromCart(cart){
    return{
        type: DELETE_ITEM_FROM_CART,
        payload: cart
    }
}
export function updateQuantity(cart){
    return{
        type: UPDATE_QUANTITY,
        payload: cart
    }
}

export default function Reducer(state = intialState,action){
    switch (action.type) {
        case UPDATE_CART:
            return Object.assign({}, state, { 
                cart: [...state.cart,action.payload]
            })
            case DELETE_ITEM_FROM_CART:
            return Object.assign({},state,{
                cart: action.payload
            })
            case UPDATE_QUANTITY:
                return Object.assign({},state,{
                    cart: action.payload
                })
            default:
                return state;
    }
}
