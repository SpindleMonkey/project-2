
let db = require('../models');
/*
 * JSON API Endpoints
 */

// GET /api                  documentation
function apiDoc(req, res) {  
  console.log('GET /api');
  res.json({
    message: 'Welcome to the stashy sheep breed list!',
    documentation_url: 'https://github.com/SpindleMonkey/project-2/api.md',
    base_url: 'http://localhost:3000',
    notes: 'If you search for a breed with more than one word in it\'s name, use \'%20\' for the space between words',
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes available endpoints'},
      {method: 'GET', path: '/api/breed', description: 'Lists all sheep breeds'},
      {method: 'GET', path: '/api/breed/:name', description: 'Lists info for a single breed'},
      {method: 'GET', path: '/api/breed/all', description: 'Lists all info for all breeds'},
      {method: 'POST', path: '/api/breed', description: 'Add a new sheep breed'},
      {method: 'DELETE', path: '/api/breed/:name', description: 'Delete a sheep breed by name'}
    ]
  });
}

// GET /api/breed            list of breeds (names only)
function apiIndex(req, res) {
  console.log('GET /api/breed');
  // return the list of breed names
  db.Breed.find({}, function(err, breeds) {
    let breedNames = [];
    breeds.forEach(function(singleBreed) {
      breedNames.push(singleBreed.name);
    });
    breedNames.sort();
    res.json(breedNames);
  });
}

// GET /api/breed/all      all the info for all the breeds
function apiShowAll(req, res) {
  console.log('GET /api/breed/all');
  // return JSON object of specified breed
  db.Breed.find({}, function(err, allBreeds) {
    if (err) res.send('ERROR::' + err);
    res.json({breeds: allBreeds});
  });
}

// GET /api/breed/:name      info for specified breed
function apiShow(req, res) {
  console.log('GET /api/breed/:name');
  // return JSON object of specified breed
  db.Breed.find({name: req.params.name}, function(err, oneBreed) {
    if (err) res.send('ERROR::' + err);
    res.json({breeds: oneBreed});
  });
}

// POST /api/breed           add a new breed
function apiNew(req, res) {
  console.log('POST /api/breed');
  // create a new breed in the db
  //console.log(req.body);
  if (!req.body.name) {
    res.status(503).send('cannot add a new breed without a name');
  } else if (!req.body.description) {
    res.status(503).send('cannot add a new breed without a description');
  } else if (!req.body.infoSource) {
    res.status(503).send('cannot add a new breed without any info sources');
  } else {
    //console.log('r.b.i: ' + req.body.infoSource);
    let infoList = req.body.infoSource.split(', ');
    //console.log('infoList: ' + infoList);
    //console.log('infoList.length: ' + infoList.length);
    let sheep = new db.Breed({
      name: req.body.name,
      origin: req.body.origin || '',
      status: req.body.status || '',
      stapleLength: req.body.stapleLength || '',
      fleeceWeight: req.body.fleeceWeight || '',
      fiberDiameter: req.body.fiberDiameter || '',
      description: req.body.description,
      image: req.body.image || 'n/a',
      infoSources: [],
      notes: req.body.notes || ''
    });

    //console.log(sheep.infoSources);
    for (let i = 0; i < infoList.length; i++) {
      sheep.infoSources.push(infoList[i]);
    }

    //console.log(sheep);
    db.Breed.create(sheep, function(err, sheepie) {
      if (err) res.status(503).send('could not add new sheep breed. sorry.');
      res.json(sheepie);
  } );
  }

}

// PUT /api/breed/:name      update a breed
function apiUpdate(req, res) {
  console.log('PUT /api/breed/:name');
  // update the specified breed
}

// DELETE /api/breed/:name   delete breed
function apiDelete(req, res) {
  console.log('DELETE /api/breed/:name');
  // delete the specified breed
}


module.exports = {
  apiDoc: apiDoc,
  apiIndex: apiIndex,
  apiShow: apiShow,
  apiShowAll: apiShowAll,
  apiNew: apiNew,
  apiUpdate: apiUpdate,
  apiDelete: apiDelete
};

