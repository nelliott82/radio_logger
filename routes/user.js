const express = require('express');
const router = express.Router();

const userService = require('/services/userService');

router.get('/', function(req, res) {
  userService.getAll()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
});

router.get('/:id', function(req, res) {
  userService.getById(req.params.id)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
});

router.get('/', function(req, res, next) {
	connection.query('SELECT * from members', function (error, results, fields) {
	   if (error) throw error;
	   res.send(JSON.stringify(results));
   });
});

module.exports = router;