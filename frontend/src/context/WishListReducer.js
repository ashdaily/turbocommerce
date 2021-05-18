import axios from "../util/Axios";
import { isLoggedIn } from "../util/Auth";

// TODO: REMOVE AFTER TESTING EVERYTHING
const Storage = () => {
  if (isLoggedIn) {
    axios
      .get(`api/customer/wishlist/`)
      .then((response) => {
        if (response.status === 200) {
          let wishlistData = [];
          if (response.data.count > 0) {
            response.data.results.map((item) =>
              wishlistData.push({
                id: item.id,
              })
            );
            localStorage.setItem("wishlistItems", JSON.stringify(wishlistData));
          } else {
            localStorage.setItem("wishlistItems", JSON.stringify([]));
          }
        }
      })
      .catch(() => {
        localStorage.setItem("wishlistItems", JSON.stringify([]));
      });
  }
};

export const sumWishlistItems = (items) => {
  // Storage();
  let totalWishlistItems =
    items.length > 0 ? items.reduce((total) => total + 1, 0) : 0;
  return { totalWishlistItems };
};

export const WishlistReducer = (state, action) => {
  switch (action.type) {
    case "SYNC_WISHLIST":
      const wishlistData = action.payload;
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistData));
      return {
        ...state,
        totalWishlistItems: wishlistData.length,
        wishlistItems: wishlistData,
      };
    case "ADD_ITEM_TO_WISHLIST":
      if (!state.wishlistItems.find((item) => item.id === action.payload.id)) {
        state.wishlistItems.push({
          id: action.payload.id,
        });
      }

      return {
        ...state,
        ...sumWishlistItems(state.wishlistItems),
        wishlistItems: [...state.wishlistItems],
      };
    case "REMOVE_ITEM_FROM_WISHLIST":
      return {
        ...state,
        ...sumWishlistItems(
          state.wishlistItems.filter((item) => item.id !== action.payload.id)
        ),
        wishlistItems: [
          ...state.wishlistItems.filter(
            (item) => item.id !== action.payload.id
          ),
        ],
      };
    default:
      return state;
  }
};
