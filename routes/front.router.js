/*
Imports & configuration
!! Don't edit this code unless you are sure of what you do !!
*/
// Class
const express = require ('express');
const classRouter = express.Router ({mergeParams: true});
const userCollection = require ('../data/users');
//

/*
Class definition
*/
class RouterClass {
  constructor () {}

  // Définition des routes
  routes () {
    /* 
        Route to display the home page
        - To send data to the route, juste add an object has second param
        */
    classRouter.get ('/', (req, res) => {
      let connected = false;
      if (typeof req.cookies['user-email'] !== 'undefined') {
        connected = true;
      }
      res.render ('index', {
        connected: connected,
        userCollection: userCollection,
      });
    });
    //

    /* 
        Route to connect a user
        - Make 2 const to get email and password from the request
        - Make a loop on the const 'userCollection'
        - Check if yoou find the email
        - Check if the password is correct
        - Send back the correct page
        */
    classRouter.get ('/login', (req, res) => {
      res.render ('login', {connected: false, error: false});
    });

    classRouter.post ('/login', (req, res) => {
      const email = req.body.email;
      const password = req.body.password;
      let user = null;
      let valid = false;
      let i = 0;

      while (i < userCollection.length && !valid) {
        if (
          userCollection[i].email === email &&
          userCollection[i].password === password
        ) {
          valid = true;
        }
        i++;
      }
      if (!valid) {
        res.render ('login', {connected: false, error: true});
      } else {
        res.cookie ('user-email', email);
        res.redirect ('/me');
        //res.render('me',{connectedUser: user});
      }
    });
    //

    /* 
        Route to display conneted user informations
        - Make a loop on the const 'userCollection'
        - Find the correct information about the user
        - Send back the correct page with the data
        */
    classRouter.get ('/me', (req, res) => {
      let found = false;
      let i = 0;
      let connectedUser = null;
      while (!found) {
        if (userCollection[i].email === req.cookies['user-email']) {
          found = true;
          connectedUser = userCollection[i];
        }
        i++;
      }
      res.render ('me', {connected: true, connectedUser: connectedUser});
    });
    //

    classRouter.get ('/deconnexion', (req, res) => {
      res.clearCookie ('user-email');
      res.redirect ('/');
    });

    /* 
        Route test API
        */
    classRouter.post ('/api', (req, res) => {
      return res.json (req.body);
    });
    //
  }

  /* 
    Initialize routes 
    !! Don't edit this code unless you are sure of what you do !!
    */
  init () {
    this.routes ();
    return classRouter;
  }
}
//

/*
Export class
!! Don't edit this code unless you are sure of what you do !!
*/
module.exports = RouterClass;
//
