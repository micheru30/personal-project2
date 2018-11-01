const intialState = {
    cart: []
}

const UPDATE_CART = 'UPDATE_CART'

export function updateCart(item) {
    return {
        type: UPDATE_CART,
        payload: item
    }
}

export default function Reducer(state = intialState,action){
    switch (action.type) {
        case UPDATE_CART:
            return Object.assign({}, state, { 
                cart: [...state.cart,action.payload]
            })
        default:
            return state;
    }
}
