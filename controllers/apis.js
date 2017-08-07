

const request = require('request');

const db = require('../models');


/*
 * JSON User API Endpoints
 */

function apiUser(req, res) {
  console.log('GET /api/user');
  console.log('req.user: ' + req.user);
  if (req.user) {
    db.User.find({'_id': req.user._id}, function(err, users) {
      if (err) {
        res.status(503).send('ERROR:' + err);
      } else {
        res.json(users[0]);
      }
    });
  } else {
    res.status(404).send('user not logged in');
  }
}

function apiUserWeather(req, res) {
  console.log('GET /api/user/weather');

  // Left geolocation way too late in the game, so I'm hardcoding the location :(
  let city = "Denver";
  let state = "CO";
  let qStr = '/q/' + state + '/' + city;

  // Require apiKey for Weather Underground
  let myKey;
  if (process.env.WUkey) {
    myKey = process.env.WUkey;
    //console.log('p.e: ' + myKey);
  } else {
    const env = require('../env.js');
    myKey = env.name;
    //console.log(myKey);
  }

  let theUrl = 'http://api.wunderground.com/api/' + myKey + '/conditions/' + qStr + '.json';

  // The actual request sending
  request(theUrl, function (err, response, body) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.json(body);
    }
  });

}

function apiNewStash(req, res) {
  console.log('POST /api/user/stash');
  console.log('req.user: ' + req.user);
  console.log('req.body: ' + req.body);
  console.log('req.body.item: ' + req.body.item);
  if (req.user) {
    console.log('there is a user');
    db.Stash.create(req.body, function(err, newStash) {
      console.log('call to db.Stash.create was made');
      if (err) {
        console.log('err during create');
        console.log('err: ' + err);
        res.status(503).send('ERROR::' + err);
      } else {
        console.log(req.user._id);
        console.log(newStash);
        db.User.update({_id: req.user._id}, { $push: {inventory: newStash} }, function(err, updatedUser) {
          if (err) {
            console.log('err during update');
            console.log('err: ' + err);
            res.status(503).send('ERROR::' + err);
          } else {
            res.json(updatedUser);
          }
        });
      }
    });
  }
}


/*
 * JSON Breed API Endpoints
 */

// GET /api                  documentation
function apiDoc(req, res) {  
  console.log('GET /api');
  res.json({
    message: 'Welcome to the stashy sheep breed list!',
    documentation_url: 'https://github.com/SpindleMonkey/project-2/api.md',
    base_url: 'http://localhost:3000',
    notes: 'If you search for a breed with more than one word in it\'s name, use \'%20\' for the space between words. If you\'re updating the infoSources field, use \', \' to separage multiple sources.',
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes available endpoints'},
      {method: 'GET', path: '/api/breed', description: 'Lists all sheep breeds'},
      {method: 'GET', path: '/api/breed/:name', description: 'Lists info for a single breed'},
      {method: 'GET', path: '/api/breed/all', description: 'Lists all info for all breeds'},
      {method: 'POST', path: '/api/breed', description: 'Add a new sheep breed'},
      {method: 'PUT', path: 'api/breed/:name', description: 'Update one of the breeds in the db'},
      {method: 'DELETE', path: '/api/breed/:name', description: 'Delete a sheep breed by name'}
    ]
  });
}

// GET /api/breed            list of breeds (names only)
function apiIndex(req, res) {
  console.log('GET /api/breed');
  // return the list of breed names
  db.Breed.find({}, function(err, breeds) {
    if (err) {
      res.status(404).send('ERROR::' + err);
    } else {
      let breedNames = [];
      breeds.forEach(function(singleBreed) {
        breedNames.push(singleBreed.name);
      });
      breedNames.sort();
      res.json(breedNames);
    }
  });
}

// GET /api/breed/all      all the info for all the breeds
function apiShowAll(req, res) {
  console.log('GET /api/breed/all');
  // return JSON object of specified breed
  db.Breed.find({}, function(err, allBreeds) {
    if (err) {
      res.send('ERROR::' + err);
    } else {
      res.json({breeds: allBreeds});
    }
  });
}

// GET /api/breed/:name      lists info for the specified freed
function apiShow(req, res) {
  console.log('GET /api/breed/:name');
  // return JSON object of specified breed
  db.Breed.find({name: req.params.name}, function(err, oneBreed) {
    if (err) {
      res.send('ERROR::' + err);
    } else {
      res.json({breeds: oneBreed});
    }
  });
}

// POST /api/breed           add a new breed
function apiNew(req, res) {
  console.log('POST /api/breed');
  // create a new breed in the db
  console.log(req.body);
  if (!req.body.name) {
    res.status(503).send('cannot add a new breed without a name');
  } else if (!req.body.description) {
    res.status(503).send('cannot add a new breed without a description');
  } else if (!req.body.infoSources) {
    res.status(503).send('cannot add a new breed without any info sources');
  } else {
    console.log('r.b.i: ' + req.body.infoSources);
    let infoList = req.body.infoSources.split(', ');
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
      if (err) {
        res.status(503).send('could not add new sheep breed. sorry.');
      } else {
        res.json(sheepie);
      }
    });
  }

}

// PUT /api/breed/:name      update a breed
function apiUpdate(req, res) {
  console.log('PUT /api/breed/:name');
  console.log(req.params.name);
  console.log(req.body);

  // update the specified breed
  db.Breed.find({'name': req.params.name}, function(err, sheep) {
    console.log(sheep);
    if (err) {
      res.status(404).send('ERROR: breed not found; you probably need to add this breed');
    } else {
      if (req.body.infoSources) {
        // get the list of new sources
        let infoList = req.body.infoSources.split(', ');
        // we're replacing the current list of sources with the new list
        req.body.infoSources = [];
        for (let i = 0; i < infoList.length; i++) {
          req.body.infoSources.push(infoList[i]);
        }
        console.log('srcs: ' + req.body.infoSources);
      }

      console.log(sheep[0]._id);
      db.Breed.update({ '_id': sheep[0]._id }, { $set: req.body }, function(err, updatedSheep) {
        if (err) {
          res.status(503).send('ERROR: could not update sheep info');
        } else {
          res.json(updatedSheep);
        }
      });
    }

  });
}

// DELETE /api/breed/:name   delete breed
function apiDelete(req, res) {
  console.log('DELETE /api/breed/:name');
  
  // delete the specified breed
  db.Breed.remove({'name': req.params.name}, function(err, lostSheep) {
    if (err) {
       res.status(404).send('could not remove that sheep');
     } else {
      res.json(lostSheep);
     }
  });
}


module.exports = {
  apiUser: apiUser,
  apiNewStash: apiNewStash,
  apiUserWeather: apiUserWeather,
  apiDoc: apiDoc,
  apiIndex: apiIndex,
  apiShow: apiShow,
  apiShowAll: apiShowAll,
  apiNew: apiNew,
  apiUpdate: apiUpdate,
  apiDelete: apiDelete
};

