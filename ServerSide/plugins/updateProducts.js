module.exports = (products) => {
    const result = products.map(product => {
        // Limit the description length to 50 characters
        if (product.description.length > 50) {
            product.description = product.description.substring(0, 50);
        }
        // Round the price
        product.price = Math.round(product.price);
        // Remove the rating property
        delete product.rating;

        return product;
    });

    return result;
}


