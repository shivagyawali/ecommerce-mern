import {
  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../constants/productConstant";

const INITIAL_STATE = {
  products: [],
};

const productReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        products: [...state.products, action.payload],
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT:
      return {
        product: action.payload,
      };
    case UPDATE_PRODUCT:
      return state.products.map((p) =>
        p._id === action.payload._id ? action.payload : p
      );
    case DELETE_PRODUCT:
      return {
        products: state.products.filter((p) => p._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export default productReducers;
