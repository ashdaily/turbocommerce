import axios from "../util/Axios";
import ToastUtils from "../util/ToastUtils";
import ProductUtils from "../util/ProductUtils";

const Storage = (items) => {
  let cartIds = items.map((product) => product.id);
  if (cartIds) {
    axios
      .get(`/api/products/in-ids/?id=${cartIds}`)
      .then((response) => {
        if (response.status === 200) {
          let newCartData = items.map((item) => {
            let found = response.data.results.find(
              (product) => product.id === item.id
            );
            if (found) {
              let variant = found.product_variants.find(
                (variant) => variant.id === item.variant_id
              );
              if (variant && variant.in_stock) {
                item.in_stock = variant.in_stock;
              } else {
                item.in_stock = false;
              }
            } else {
              item.in_stock = false;
            }
            return item;
          });
          localStorage.setItem(
            "cartItems",
            JSON.stringify(newCartData.length > 0 ? newCartData : [])
          );
        } else {
          localStorage.setItem("cartItems", JSON.stringify([]));
        }
      })
      .catch(() => {
        localStorage.setItem("cartItems", JSON.stringify([]));
      });
  }
};

export const sumItems = (items) => {
  Storage(items);
  let totalCartItems = 0;
  let total = 0;
  if (items.length > 0) {
    totalCartItems = items.reduce((total) => total + 1, 0);
    total = items
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  }
  return { totalCartItems, total };
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (
        !state.cartItems.find(
          (item) =>
            item.id === action.payload.id &&
            item.variant_id === action.variant.id
        )
      ) {
        state.cartItems.push({
          id: action.payload.id,
          variant_id: action.variant.id,
          name: action.payload.product_name,
          price: action.variant.price,
          in_stock: true,
          size: action.variant.size.name,
          color: action.variant.color,
          image: ProductUtils.getFrontImage(action.payload),
          brand: action.payload.brand.brand_name,
          quantity: 1,
          product_url: `/${action.payload.child_category.parent_category.grand_parent_category.slug}/${action.payload.child_category.parent_category.slug}/${action.payload.child_category.slug}/${action.payload.slug}`
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter(
            (item) =>
              item.id !== action.productId ||
              item.variant_id !== action.variantId
          )
        ),
        cartItems: [
          ...state.cartItems.filter(
            (item) =>
              item.id !== action.productId ||
              item.variant_id !== action.variantId
          ),
        ],
      };

    case "CHANGE_CART_QTY":
      const { productId, variantId, qty } = action.payload;
      const cartItems = JSON.parse(JSON.stringify(state.cartItems));
      const itemIndex = cartItems.findIndex(
          (item) =>
              item.id === productId &&
              item.variant_id === variantId
      );
      if (itemIndex >= 0) {
        cartItems[itemIndex].quantity = qty;
      }
      return {
        ...state,
        ...sumItems(cartItems),
        cartItems: cartItems,
      };
    case "INCREASE":
      if (
        state.cartItems[
          state.cartItems.findIndex(
            (item) =>
              item.id === action.productId &&
              item.variant_id === action.variantId
          )
        ].quantity < 10
      ) {
        state.cartItems[
          state.cartItems.findIndex(
            (item) =>
              item.id === action.productId &&
              item.variant_id === action.variantId
          )
        ].quantity++;
      }
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "DECREASE":
      const tempIndex = state.cartItems.findIndex(
          (item) =>
              item.id === action.productId && item.variant_id === action.variantId
      );
      state.cartItems[
        tempIndex
      ].quantity--;
      if (state.cartItems[tempIndex].quantity === 0) {
        ToastUtils.showInfo('Product Removed');
      }
      return {
        ...state,
        cartItems: [...state.cartItems.filter((item) => item.quantity !== 0)],
        ...sumItems(state.cartItems.filter((item) => item.quantity !== 0)),
      };
    case "CHECKOUT":
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };
    case "CLEAR":
      return {
        cartItems: [],
        ...sumItems([]),
      };
    default:
      return state;
  }
};
