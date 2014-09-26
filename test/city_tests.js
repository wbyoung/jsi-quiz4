var expect = require('chai').expect;
var City = require('../lib/city');

describe('City', function() {
  it('requires population to be created', function() {
    expect(function() { new City('Portland'); }).to.throw(/population is required/i);
  });

  it('can access name', function() {
    var city = new City('New York', { population: 2.3 });
    expect(city.getName()).to.eql('New York');
  });

  it('can access population', function() {
    var city = new City('New York', { population: 2.3 });
    expect(city.getPopulation()).to.eql(2.3);
  });
});
