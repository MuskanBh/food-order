import { useReducer } from 'react';
import CardContext from './cart-context';

const defaultCartState ={
  items:[],
  totalAmount:0
}

const cartReducer= (state,action)=>{
  // concat produces a new array - prefered way
  // push edits the exisiting array
  if(action.type==='ADD'){
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item)=> item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if(existingCartItem){
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount +action.item.amount
      }
      updatedItems=[...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  if(action.type==='REMOVE'){
    const exisitingCartItemInex = state.items.findIndex(
      (item)=> item.id ===action.id
    );
    const exisitingItem = state.items[exisitingCartItemInex]
    const updatedTotalAmount = state.totalAmount - exisitingItem.price;
    let updatedItems;
  if(exisitingItem.amount === 1){
    updatedItems = state.items.filter(item => item.id !== action.id)
  } else {
    const updatedItem = { ...exisitingItem, amount: exisitingItem.amount-1};
    updatedItems=[...state.items];
    updatedItems[exisitingCartItemInex]= updatedItem;
  }
  return{
    items: updatedItems,
    totalAmount: updatedTotalAmount
  };
}
if(action.type ==="CLEAR"){
  return defaultCartState
}
  
  return defaultCartState;
};

const CartProvider = (props)=>{
  const [cartState, dispatchCartAction] =useReducer(cartReducer, defaultCartState);
  const addItemToCartHandler=(item)=>{
    dispatchCartAction({type:'ADD', item: item});
  };
  const removeItemToCartHandler=(id)=>{
    dispatchCartAction({type:"REMOVE", id: id});
  }
  const clearCartHandler=()=>{
    dispatchCartAction({type:"CLEAR"});
  }
  const cartContext={
    items:cartState.items,
    totalAmount:cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem:removeItemToCartHandler,
    clearCart: clearCartHandler
  }
  return(
    <CardContext.Provider value={cartContext}>
      {props.children}
    </CardContext.Provider>
  );
  
}

export default CartProvider