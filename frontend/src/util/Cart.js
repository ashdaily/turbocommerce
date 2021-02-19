export const addToCart = (data, qty) => {

    let cartData = localStorage.getItem('cartItems');
    let cart = [];
    if (cartData && cartData.length > 0) {
        cart = JSON.parse(cartData);
        let found = cart.find(product => product.id === data.id);
        if (found) {
            found.qty ++;
        } else {
            cart.push({
                id: data.id,
                name: data.product_name,
                price: data.unit_price,
                qty: qty
            });
        }
    } else {
        cart.push({
            id: data.id,
            name: data.product_name,
            price: data.unit_price,
            qty: qty
        });
    }

    let count = 0;
    cart.forEach((item, index) => {
        count = count + item.qty
    })

    localStorage.setItem("cartItems", JSON.stringify(cart));
    localStorage.setItem("totalCartItems", count);
}

export const removeToCart = (id) => {
    let cartData = localStorage.getItem('cartItems');

    let cart = [];
    if (cartData && cartData.length > 0) {
        cart = JSON.parse(cartData);
        cart = cart.filter((cartItem) => cartItem.id !== id);
    }
    let count = 0;
    cart.forEach((item, i) => {
        count = count + item.qty
    })

    localStorage.setItem("cartItems", JSON.stringify(cart));
    localStorage.setItem("totalCartItems", count);
}

export const cartItems = localStorage.getItem('cartItems')


export const totalCartItems = localStorage.getItem('totalCartItems')