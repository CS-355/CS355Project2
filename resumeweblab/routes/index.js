var express = require('express');
var router = express.Router();
var project2_dal = require('../model/projTwo_dal');


/* GET home page. */
router.get('/', (req, res, next) =>
{
  //res.render('index', { title: 'Project 2' });
    project2_dal.getPrograms()
    .then(result =>
{

    let programs = result[0]
    // split into programs and subquery results
    let subquery = result[1]
    res.render('projTwo/listAllPrograms', {programs, subquery})
}

)
});

module.exports = router;
