<<<<<<< HEAD

const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {

            res.render('shop/product-list',
                {
                    prods: products,
                    pageTitle: 'Shop',
                    path: '/products',
                });
        }).catch(err => {
            console.log(err);
        })
}
exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            res.render('shop/product-detail',
                {
                    product: product,
                    pageTitle: product.title,
                    path: '/products',

                });
        }).catch(err => {
            console.log(err);
        })

}

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {

            res.render('shop/index',
                {
                    prods: products,
                    pageTitle: 'All Products',
                    path: '/',

                });
        }).catch(err => {
            console.log(err);
        })
}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        ///.execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            console.log(req.user);
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        ///.execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, productData: {...i.productId._doc} };
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();         
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};
exports.getOrders = (req, res, next) => {
    Order.find({'user.userId' : req.user._id})
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {

    res.render('shop/checkout',
        {
            pageTitle: 'Checkout',
            path: '/checkout',

        })
};

=======

const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {

            res.render('shop/product-list',
                {
                    prods: products,
                    pageTitle: 'Shop',
                    path: '/products',
                });
        }).catch(err => {
            console.log(err);
        })
}
exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            res.render('shop/product-detail',
                {
                    product: product,
                    pageTitle: product.title,
                    path: '/products',

                });
        }).catch(err => {
            console.log(err);
        })

}

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {

            res.render('shop/index',
                {
                    prods: products,
                    pageTitle: 'All Products',
                    path: '/',

                });
        }).catch(err => {
            console.log(err);
        })
}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        ///.execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            console.log(req.user);
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        ///.execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, productData: {...i.productId._doc} };
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();         
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};
exports.getOrders = (req, res, next) => {
    Order.find({'user.userId' : req.user._id})
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {

    res.render('shop/checkout',
        {
            pageTitle: 'Checkout',
            path: '/checkout',

        })
};

>>>>>>> 58dbb0b7dbfef9105531a0ceb479ce8b8c01ca4e