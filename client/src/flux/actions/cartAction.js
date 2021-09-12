import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  FAIL_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCart =
  (id, qty, sizeSelected,colorSelected, merchant) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.imageUrl.length > 0 && data.imageUrl[0].url,
        price: data.price,
        countInStock: data.countInStock,
        shippingOptions: data.shippingTo,
        qty,
        sizeSelected,
        colorSelected,
        merchant
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// export const saveShippingAddress =  (body) => async (dispatch, getState) => {
//   try {

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.post("/api/users/shipping", body, config);

//     console.log(data)

//     dispatch({
//       type: CART_SAVE_SHIPPING_ADDRESS,
//       payload: data,
//     });

//     localStorage.setItem("shippingAddress", data);
//   } catch (error) {
//     dispatch({
//       type: FAIL_SAVE_SHIPPING_ADDRESS,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
