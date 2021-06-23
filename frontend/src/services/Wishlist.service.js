import {getRequest} from "../util/AxiosServiceUtils";

export async function serviceGetWishlistData(params) {
    return await getRequest('customer/wishlist', params);
}
