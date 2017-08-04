
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

function addStash(req, res) {
  console.log('/addStash');
  res.render('addStash.ejs');
}


module.exports = {
  home: home,
  inventory: inventory,
  addStash: addStash,
};
