var express = require('express');
var router = express.Router();
//var address_dal = require('../model/address_dal');
var project2_dal = require('../model/projTwo_dal');

router.get('/listAllPrograms', (req, res) =>
  {
    //console.log("got here")
    project2_dal.getPrograms()
    .then(result =>
      {

        let programs = result[0]
        // split into programs and subquery results
        let subquery = result[1]
        res.render('projTwo/listAllPrograms', {programs, subquery})
      }

    )
    //res.render('projTwo/listAllPrograms')
  }
)

router.get('/about', (req, res) =>
  {
    res.render('projTwo/About')
  }
)
router.get('/addProgramLanguageStyle', (req, res) =>
{
    console.log("make entry page for program language style")
    //
    res.render('projTwo/addProgramLanguageStyle');
    // go to addLanguge page
}
);

// add confirmation message
router.get('/addNewProgramLanguageStyle', (req, res) =>
{
  console.log(req.query)
  let program_name = req.query.name
  // get max value for language_link
  project2_dal.getMaxLanguageLink()
  .then(result =>
    {

      console.log(result[0].max_language_link)
      let language_link = result[0].max_language_link + 1
      let program = {program_name, language_link}

      // setup language object
      let language_name = req.query.language_name
      let language = {language_link, language_name}
      let program_id = 1

      let style_name = req.query.style_name
      let style = {style_name, program_id}
      project2_dal.insert(program, 'program')
      project2_dal.insert(language, 'language')
      project2_dal.insert(style, 'style')

      // put into a collection
      let persons = []
      persons.push(program_name)
      persons.push(language_name)
      persons.push(style_name)
      console.log("persons", persons)
      project2_dal.getPrograms()
      .then(result2 =>
        {
          console.log("result2", result2)
          let programs = result2[0]
          // go to another page and confirm the add
          // send a success status for the div on the copy of the same ejs file
          //let person_id = req.query.person_id
          console.log(req.query)
          let subquery = result2[1]
          console.log(subquery)
          //let success = true
          let success = true
          console.log("success", success)



          res.render('projTwo/listAllProgramsAndConfirmationMessage', {success, persons, programs, subquery})

        }
      )



      // setup style object
      // insert all 3 objects
      // update tables image and er diagram image
      // render all programs page with confirmation message for all 3 names and include their field names
    }
  )

}
);

router.get('/addLanguage', (req, res) =>
{
    //
    // go to addLanguge page
}
);

router.get('/addNewLanguage', () =>
{
    //
    // redirect back to the listAllPrograms page
}
)

router.get('/addStyle', () =>
{
    //
    // go to addStyle page
}
)
router.get('/addNewStyle', () =>
{
    //
    // redirect back to the listAllPrograms page
}
)

router.get('/addProgram', () =>
{
    // enter program
    // show the entry form for entering programs
}
)

router.get('/saveProgram', () =>
{
    // save program name into database
    // save users with the program into database
    // render the page listAllPrograms
}
)


router.get('/addUser', (req, res) =>
{
    console.log("need to add a new user", req.query)
    let program_id = req.query.program_id
    // get all known languages
    project2_dal.getAllLanguages()
    .then(result =>
      {
        let language = result
        console.log(language)
        project2_dal.getStyles1()
        .then(styles =>
          {
            // render enterDataForUser page
            res.render("projTwo/enterDataForUser", {language, program_id, styles});
          }
        )

      }
    )


}
)

router.get('/addNewUser', (req, res) =>
{

    console.log("here", req.query)
    //exit()
    let program_id = req.query.program_id
    let person_name = req.query.name
    let contribution_in_lines_of_code = req.query.contributions
    let user = {person_name, contribution_in_lines_of_code, program_id}
    // insert into person
    project2_dal.insert(user, 'person')
    .then(result =>
      {
          let person_id = result.insertId
          let user_id = result.insertId

          let language_id = req.query.language_id
          let style_id = req.query.style_id
          let language_person_object = {language_id, person_id, style_id}
          project2_dal.insert(language_person_object, 'language_person')
          .then(result =>
            {
              console.log("done")

              // start here
              ///
              //project2_dal.getStyles(req.query.style_id, req.query.language_id, req.query.program_id, req.query.person_id)
              //.then(result =>
                //{
              console.log("done changing things")
              project2_dal.getPrograms()
              .then(result =>
                {
                  console.log("result", result)
                  let programs = result[0]
                  // go to another page and confirm the add
                  // send a success status for the div on the copy of the same ejs file
                  //let person_id = req.query.person_id
                  console.log(req.query)
                  project2_dal.getUserName(person_id)
                  .then(person =>
                    {
                      console.log(person)
                      let success = true
                      let person_name = person[0].person_name

                      console.log("success", success)
                      let subquery = result[1]
                      console.log(subquery)
                      let persons = [person_name]

                      res.render('projTwo/listAllProgramsAndConfirmationMessage', {programs, persons, success, subquery})
                      //res.render('projTwo/listAllPrograms', {programs})
                    }
                  )


                }
              )
                  // render the all programs page now
                //}
              //)
              ////
              /*project2_dal.getStyles1()
              .then(styles =>
                {
                  project2_dal.getLanguagesUserPicked(language_id)
                  .then(languages =>
                    {
                      res.render('projTwo/pickStyleForEachLanguage', {languages, styles, user_id, program_id});
                    }
                  )
                }
              )*/
            }
          )

    }
    )

    //res.render('projTwo/pickStyleForEachLanguage', {languages, styles, user_id});

    // save the user data into tables
    // save name and contribution_in_lines_of_code to person table


}
)

router.get('/getPeopleFitting', (req, res) =>
  {
    console.log("got here", req.query)
    project2_dal.getPeopleWithXContributionsF(req.query.contributions_number)
    .then(result =>
      {
        console.log("result", result[0])
        let program = result[0]
        res.render('projTwo/showUsersWithHighAmountsOfContributions',{program})
      }
    )
  }
)

router.get('/pickStylePerLanguage', (req, res) =>
{

    console.log(req.query)

    console.log("done")
    // start here
    project2_dal.getStyles(req.query.style_id, req.query.language_id, req.query.program_id, req.query.person_id)
    .then(result =>
      {
        console.log("done changing things")
        project2_dal.getPrograms()
        .then(result =>
          {
            let programs = result
            // go to another page and confirm the add
            // send a success status for the div on the copy of the same ejs file
            let person_id = req.query.person_id
            project2_dal.getUserName(person_id)
            .then(person =>
              {
                console.log(person)
                let success = true
                let person_name = person[0].person_name
                console.log("success", success)
                let persons = [person_name]

                res.render('projTwo/listAllProgramsAndConfirmationMessage', {programs, persons, success})
                //res.render('projTwo/listAllPrograms', {programs})
              }
            )


          }
        )
        // render the all programs page now
      }
    )

    // render the listAllPrograms page with the confirmation message
}
)

router.get('/', (req, res) =>
{
    console.log("got here")
    project2_dal.getUsersOfProgramF(req.query.program_id)
    .then(result =>
      {
        console.log(result[0])
        let program = result[0]
        res.render('projTwo/viewPeopleWhoMadeProgram',{program})
        // load up page and print the data
      }
    )
    // get the styles and languages used in the program
    // get the users data
    // make a multidimentional array to hold all of the data collected
    // for each user for program
      // get all of the languga_person entries for the user(person_id, language_id)
    // for each language id
      // get the style ids from the language id

    // send the multidimentional array to the '/' page
}
)
router.get('/sqlCallsP1AndP2', () =>
{
    // run the procedure holding all of the calls
    // send the result to sqlCallsForP1AndP2
}
)

/*
for / page
program name
  languages:

  styles:

  users:
    user1
      name
      contributions
      language1, style1
      languagen, stylen
*/

module.exports = router;
