
let db = require('../models');

/*
 * Static Endpoints
 */

function home(req, res) {  
  console.log('/');
  res.render('index');
}

function inventory(req, res) {
  console.log('/inventory');
  res.render('inventory');
}


module.exports = {
  home: home,
  inventory: inventory
};
