expect = require('chai').expect;
request = require('request');

describe('sheepList', function() {
  /*
   * Tests for the Breed API
   */

  let myApi;
  let myErr;
  let myResponse;
  let myBody;

  before(function(done) {
    myApi = 'http://localhost:3000/api/breed/';
    request(myApi, function(err, response, body) {
      myErr = err;
      console.log('err: ' + err);
      myResponse = response;
      if (typeof(body) === "string") {
        myBody = JSON.parse(body);
      } else {
        myBody = body;
      }
      done();
    });
  });

  it('should receive 200/ok HTTP status code', function() {
    expect(myResponse.statusCode).to.eq(200);
  });

  // /api/breed should return an array of all of the breed names in the breeds collection
  it('should return an array', function() {
    expect(myBody).to.be.an('array');
  });

  // there are currently 35 breeds in the seed.js file so this test is applicable only
  // after the db has been seeded/reseeded
  it('should have 35 items in the array (following a seed)', function(){
    expect(myBody.length).to.be.eq(35);
  });

  // the returned array of breed names is supposed to be alphabetized, and Alpaca - huacaya
  // is first, alphabetically
  it('should return \'Alpaca - huacaya\' for the first array element', function() {
    expect(myBody[0]).to.eq('Alpaca - huacaya');
  });

  // again, the returned array of breed names is supposed to be alphabetized, and Yak
  // comes last, alphabetically
  it('should return \'Yak\' for the last array element', function() {
    expect(myBody[myBody.length - 1]).to.eq('Yak');
  });

});

describe('sheepDetail', function() {
  let myApi;
  let myErr;
  let myResponse;
  let myBody;

  before(function(done) {
    myApi = 'http://localhost:3000/api/breed/Cormo';
    request(myApi, function(err, response, body) {
      myErr = err;
      console.log('err: ' + err);
      myResponse = response;
      if (typeof(body) === "string") {
        myBody = JSON.parse(body);
      } else {
        myBody = body;
      }
      done();
    });
  });

  it('should receive 200/ok HTTP status code', function() {
    expect(myResponse.statusCode).to.eq(200);
  });

  // /api/breed/:name returns the document for the requested breed
  it('should return an object', function() {
    expect(myBody).to.be.an('object');
  });

  // the seed file loads unique breeds, so /api/breed/:name should return 1 document
  it('should have 1 item in the array (following a seed)', function(){
    expect(myBody.breeds.length).to.be.eq(1);
  });

  // the returned document should be for the requested breed
  it('should return a name of \'Cormo\'', function() {
    expect(myBody.breeds[0].name).to.eq('Cormo');
  });

  // Cormo sheep originated in Australia, as everybody knows...
  it('should return an origin of \'Australia\'', function() {
    expect(myBody.breeds[0].origin).to.eq('Australia');
  });

  // Since all breed documents MUST have a description, this document better
  // have one!
  it('should have a description', function() {
    expect(myBody.breeds[0].description).to.not.be.empty;
  });

});