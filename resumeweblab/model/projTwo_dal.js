var mysql = require('mysql')
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION*/
var connection = mysql.createConnection(db.config);


exports.getPrograms = () =>
{
  return new Promise((resolve, reject) =>
    {
      let mysql = `select * from program;`;
      connection.query(mysql, (err, result) =>
        {
          err ? reject(err) : resolve(result);
        });
    });

}

exports.getLanguagesUserPicked = (language_ids) =>
{
  return new Promise((resolve, reject) =>
  {
    let mysql = 'select * from language where language_id in ' + '(' + language_ids + ');';
    connection.query(mysql, (err, result) =>
      {
        console.log(mysql)
        err ? reject(err) : resolve(result);
      });
  });
}

exports.getStyles1 = () =>
{
  return new Promise((resolve, reject) =>
  {
    let mysql = `select * from style;`;
    connection.query(mysql, (err, result) =>
      {
        err ? reject(err) : resolve(result);
      });
  });
}

exports.getStyles = (style_id, program_id, language_id, person_id) =>
{
  return new Promise((resolve, reject) =>
  {
    let mysql = `call updateTables(${style_id}, ${program_id}, ${language_id}, ${person_id});`;
    connection.query(mysql, (err, result) =>
      {
        err ? reject(err) : resolve(result);
      });
  });
}

exports.getAllLanguages = () =>
{
  return new Promise((resolve, reject) =>
  {
    let mysql = ` select l.language_name, l.language_id
                  from language as l
                  left join language_person as lp on lp.language_id = l.language_id
                  where lp.language_id is null;`;
    connection.query(mysql, (err, result) =>
      {
        err ? reject(err) : resolve(result);
      });
  });
}

exports.getUserName = (person_id) =>
{
  return new Promise((resolve, reject) =>
  {
    let mysql = `select person_name from person where person_id = ${person_id};`;
    connection.query(mysql, (err, result) =>
      {
        err ? reject(err) : resolve(result);
      });
  });
}
exports.getPeopleWithXContributionsF = (contributions_number) =>
{

  return new Promise((resolve, reject) =>
  {
    let myquery = `call getPeopleWithXContributions(${contributions_number});`;
    connection.query(myquery, (err, result) =>
    {

      console.log(myquery, "\n")
      err ? reject(err) : resolve(result);
    });
  });

}

exports.getUsersOfProgramF = (program_id) =>
{

  return new Promise((resolve, reject) =>
  {
    let myquery = `call getUsersOfProgram(${program_id});`;
    connection.query(myquery, (err, result) =>
    {

      console.log(myquery, "\n")
      err ? reject(err) : resolve(result);
    });
  });

}

exports.insert = (data, item) =>
{
      console.log("item = ", item)
      return new Promise((resolve, reject) =>
      {
        let myquery = `insert into ${item} set ?`;
        connection.query(myquery, data, (err, result) =>
        {

          console.log(myquery, "\n", data)
          err ? reject(err) : resolve(result);
        });
      });
}
