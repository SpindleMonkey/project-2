
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

function addStash(req, res, next) {
  console.log('/addStash');
  res.render('addStash');
}

function postStash(req, res) {
  console.log('POST /addStash');
  console.log(req.user);
  console.log(req.body);
  res.render('inventory');
}


module.exports = {
  home: home,
  inventory: inventory,
  addStash: addStash,
  postStash: postStash
};
