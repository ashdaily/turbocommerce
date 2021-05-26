import Constants from '../config/constants';

class ProductUtils {
    makeImageUrl = (src) => {
        return Constants.DEFAULT_IMAGE_URL + src;
    }

    getFrontImage = (product) => {
        let frontImage = 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png';
        if (product.product_variants.length >0) {
            const variant = product.product_variants[0];
            frontImage = variant.images.length > 0 ? this.makeImageUrl(variant.images[0]) : 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png';
        }
        return frontImage;
    }

    getImageArray = (product) => {
        const imageArr = [];
        product.product_variants.forEach((variant) => {
           variant.images.forEach((image) => {
              imageArr.push(this.makeImageUrl(image));
           });
        });

        return imageArr;
    }
}

export default new ProductUtils();
