expect = require('chai').expect;
request = require('request');

describe('sheepList', function() {
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

  it('should return an array', function() {
    expect(myBody).to.be.an('array');
  });

  it('should have 35 items in the array (following a seed)', function(){
    expect(myBody.length).to.be.eq(35);
  });

  it('should return \'Alpaca - huacaya\' for the first array element', function() {
    expect(myBody[0]).to.eq('Alpaca - huacaya');
  });

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

  it('should return an object', function() {
    expect(myBody).to.be.an('object');
  });

  it('should have 1 items in the array (following a seed)', function(){
    expect(myBody.breeds.length).to.be.eq(1);
  });

  it('should return a name of \'Cormo\'', function() {
    expect(myBody.breeds[0].name).to.eq('Cormo');
  });

  it('should return an origin of \'Australia\'', function() {
    expect(myBody.breeds[0].origin).to.eq('Australia');
  });

  it('should have a description', function() {
    expect(myBody.breeds[0].description).to.not.be.empty;
  })

});