import axios from "../util/Axios";

const Storage = (items) => {
  let Ids = items.map((product) => product.id);
  if (Ids) {
    axios
      .get(`/api/products/in-ids/?id=${Ids}`)
      .then((response) => {
        if (response.status === 200) {
          let newWishlistData = response.data.results;
          localStorage.setItem(
            "wishlistItems",
            JSON.stringify(newWishlistData.length > 0 ? newWishlistData : [])
          );
        } else {
          localStorage.setItem("wishlistItems", JSON.stringify([]));
        }
      })
      .catch(() => {
        localStorage.setItem("wishlistItems", JSON.stringify([]));
      });
  }
};

export const sumWishlistItems = (items) => {
  Storage(items);
  let totalWishlistItems =
    items.length > 0 ? items.reduce((total) => total + 1, 0) : 0;
  return { totalWishlistItems };
};

export const WishlistReducer = (state, action) => {
  switch (action.type) {
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
          state.wishlistItems.filter((item) => item.id !== action.productId)
        ),
        wishlistItems: [
          ...state.wishlistItems.filter((item) => item.id !== action.productId),
        ],
      };
    default:
      return state;
  }
};
