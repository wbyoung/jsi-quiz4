'use strict';

var City = require('./city');
var fs = require('fs');

/**
 * A class for countries.
 *
 * @constructor
 * @param {String} name The country name.
 */
var Country = function(name) {
  this._name = name;
  this._cities = [];
};

/**
 * Add a new city.
 *
 * @param {String} name The name of the city.
 * @param {Object} details The details of the city.
 * @return {City} Returns the created city.
 * @see {@link City}
 */
Country.prototype.addCity = function(name, details) {
  var city = new City(name, details);
  this._cities.push(city);
  return city;
};

/**
 * Find small cities, those with populations less than 200,000.
 *
 * @return {Array.<String>} An array of small city names.
 */
Country.prototype.findSmallCities = function() {
  return this._cities.filter(function(city) {
    var population = city.getPopulation();
    return population < 0.2;
  }).map(function(city) {
    return city.getName();
  });
};

/**
 * Find medium cities, those with populations between 200,000 and 1 million.
 *
 * @return {Array.<String>} An array of medium city names.
 */
Country.prototype.findMediumCities = function() {
  return this._cities.filter(function(city) {
    var population = city.getPopulation();
    return population > 0.2 && population < 1;
  }).map(function(city) {
    return city.getName();
  });
};

/**
 * Find large cities, those with populations greater than 1 million.
 *
 * @return {Array.<String>} An array of large city names.
 */
Country.prototype.findLargeCities = function() {
  return this._cities.filter(function(city) {
    var population = city.getPopulation();
    return population > 1;
  }).map(function(city) {
    return city.getName();
  });
};

/**
 * Load cities from a file asynchronously.
 *
 * @todo document this method fully.
 */
Country.prototype.loadCities = function(cityFile, cb) {
  var self = this;

  // general steps:
  //   1. determine the inputs to the function & define the parameters
  //   1. `console.log` to really understand what you're working with
  console.log('cityFile: %j', cityFile);
  //   1. read the contents of the file that was given to you
  fs.readFile(cityFile, { encoding: 'utf8'}, function(err, contents) {
    if (err) { cb(err); return; }
    //   1. `console.log` the contents to really make sure you have what you
    //      think after reading the file.
    console.log('contents: %j', contents); 
    //   1. iterate each line of the file.
    var contentLines = contents.split('\n');
    console.log('contentLines: %j', contentLines);
    contentLines.forEach(function(line){
      //   1. `console.log` the line to make sure you have what you think.
      console.log('line: %j', line);
      //   1. do something to extract `cityName` and `cityPopulation` from the
      //      line.
      var splitLine = line.split(',');
      console.log('splitLine: %j', splitLine);
      var cityName = splitLine[0];
      var cityPopulation = parseFloat(splitLine[1]); // TODO: convert to number
      //   1. `console.log` each of these variables to really ensure you have what
      //      you think.
      console.log('cityName: %j',cityName);
      console.log('cityPopulation: %j',cityPopulation);
      
      //   1. call `addCity` with the required information for each city in the
      //      file. examples of calling `addCity` are in the tests.
      if (cityName) {
        self.addCity(cityName, { population: cityPopulation });
      }
    });
    //   1. indicate completion of the asynchronous operation when all cities
    //      have been added.
    console.log('all cities added!');
    cb(null);  
  });
};

module.exports = Country;
