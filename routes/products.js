var express = require('express');
var router = express.Router();
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

function getProducts(pid, callback) {
  mongo.connect(url, {  // Create the DB connection
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
    (err, client) => {  // The callback will be called if the connection was succeded
      if (err) { throw err; }
      const db = client.db("onlinestore");  // get reference to the DB
      const collection = db.collection("products"); // Get reference to the collection
      const query = {}    // Empty query to get all data
      if (pid) query.prodid = parseInt(pid);  // If you need certain product
      collection.find(query).toArray((err, items) => {
        // console.log(query)
        // if (err) { throw err; }
        // code goes here
        // console.log(items)
        callback(err, items)
      });

    }
  );

}

// const products = [
//   {
//     prodid: 1,
//     name: "Men Shirts",
//     size: 'Small',
//     price: 10.5,
//     imgpath: '/images/shirts1.jpg'
//   },
//   {
//     prodid: 2,
//     name: "Men Shirts",
//     size: 'Med',
//     price: 11.5,
//     imgpath: '/images/shirts2.jpg'
//   },
//   {
//     prodid: 5,
//     name: "Woman Shirts",
//     size: 'Small',
//     price: 12.5,
//     imgpath: '/images/women3.png'
//   }
// ]
/* GET all products listing. */
router.get('/', function (req, res, next) {
  // Read the products list from the DB
  getProducts(null, // null => get all products
    function (err, proddata) { // Callback function, will be called when the data from the DB is ready
      if (err) throw err
      // Render the PUG template with the product data we got from the DB
      res.render('products', {
        myproducts: proddata
      });
    }
  );
});

/* GET one product listing. */
router.get('/details/:productid', function (req, res, next) {
  const prodid = req.params.productid
  getProducts(prodid,
    function (err, data) {
      if (err) throw err
      res.render('products', {
        myproducts: data,
        isdetails: true
      });
    }
  );
});

module.exports = router;
