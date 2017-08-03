
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


/*
 * JSON API Endpoints
 */

// GET /api                  documentation
// GET /api/breed            list of breeds (names only)
// GET /api/breed/:name      info for specified breed
// POST /api/breed           add a new breed
// PUT /api/breed/:name      update a breed
// DELETE /api/breed/:name   delete breed


module.exports = {
  home: home,
  inventory: inventory
};
