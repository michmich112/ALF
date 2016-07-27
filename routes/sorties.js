var express = require('express');
var router  = express.Router();
var uuid    = require('uuid');
var fs = require("fs");

/* GET */
router.get('/search_input', function(req, res, next) {
  alert("fetching");
  console.log("fetching");
  res.reder('search_input', {title: 'ALF'});
  /*
  try{
    var sorties = [];
    // Read all files like a uuid .json in the data folder
    //  For each file, read it, add it to "sorties"
    res.render('sorties/index', { title: 'Alf', sorties: sorties });
  } catch(error){
      console.error(error);
  }*/
});

/* C.R.U.D. */

/* Create: */
router.get('/new', function(req, res, next) {
  res.render('sorties/new', { title: 'Alf' });
});

router.post('/', function(req, res, next) {
  try{
    var data = req.body;
    data.id = uuid.v1();
    console.log("Received Data to upload: ", data);
    fs.readFile('data/sorties-index-organisatrice.json', (err,index) => {
      if (err) throw err;
      index = JSON.parse(index);
      console.log("New index: ", index);
      if (! index[data.organisatrice]) { index[data.organisatrice] = []; }
      index[data.organisatrice].push(data.id);
      console.log("New index: ", index);
      fs.writeFile('data/sorties-index-organisatrice.json', JSON.stringify(index));
    });
    fs.writeFile('data/' + data.id + '.json',JSON.stringify(data));
  }
  catch (error)
  {
      console.error(error);
  }
});

/* Read: */
router.get('/search', function(req,res, next) {
  //var orgs = Object.keys(JSON.parse(fs.readFile('data/sorties-index-organisatrice.json',(err)=>{if(err) throw err;})));
  //res.render('search', {title: 'ALF', orgs: orgs});
  var value = req.body.organisatrice;
  alert(value);
  
  try{
    var uuids = [];
    fs.readFile('data/sorties-index-organisatrice.json', (err,index) => {
      if (err) throw err;
      index = JSON.parse(index);
      if (index[value]) {
          console.log("Found uuid: %s", index[value]);
          uuids = index[value];
      }
      var sorties = [];
      uuids.forEach(function(uuid) {
        fs.readFile('data/' + uuid + '.json', (err,data) => {
          if (err) throw err;
          data = JSON.parse(data);
          console.log("Loaded: %s", data);
          sorties.push(data);
        });
      });
      res.render('sorties/index', { title: 'Alf', sorties: sorties });
    });

  } catch(error){
      console.error(error);
  }
});

router.get('/:id', function(req, res, next) {
    fs.readFile('data/' + req.id + '.json', (err,data) => {
      if (err) throw err;
      data = JSON.parse(data);
      console.log("Loaded: %s", data);
    });
});

/* Update: */
router.get('/:id/edit', function(req, res, next){
});

//router.update('/:id', function(req, res, next) {
//});

/* Delete: */
router.delete('/:id', function(req, res, next) {
});

module.exports = router;