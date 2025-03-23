const Product = require('../models/Product');

// Initial 2 default products if DB is empty
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    if (products.length === 0) {
        await Product.insertMany([
            { name: 'Product A', description: 'Desc A', price: 100, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9' },
            { name: 'Product B', description: 'Desc B', price: 200, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8' }
        ]);
    }
    const updatedProducts = await Product.find();
    res.json(updatedProducts);
};
