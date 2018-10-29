const intialState = {
    cart: ['hi','two',{item:1}]
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
                cart: action.item
            })
        default:
            return state;
    }
}
