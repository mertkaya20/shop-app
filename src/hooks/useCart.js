import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../store/slices/cartSlice";
import * as cartApi from "../api/cartApi";

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return {
    items,
    totalPrice,
    totalQuantity,
    addToCart: (product) => {
      dispatch(addToCart(product));
      cartApi.addToCart(product);
    },
    removeFromCart: (product) => {
      dispatch(removeFromCart(product));
      cartApi.deleteCart(product.id);
    },
    increaseQuantity: (product) => {
      dispatch(increaseQuantity(product));
      cartApi.updateCart(product.id, product);
    },
    decreaseQuantity: (product) => {
      dispatch(decreaseQuantity(product));
      cartApi.updateCart(product.id, product);
    },
    clearCart: () => {
      dispatch(clearCart());
    },
  };
};
