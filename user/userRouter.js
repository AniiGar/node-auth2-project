const express = require('express');

const Users = require('./userModel');

const router = express.Router();

// -----------------
// Create - Register
// -----------------
router.post('/register', (req, res) => {
    const userData = req.body;
    const hash = bcrypt.hashSync(userData.password, 8);
    userData.password = hash;

    Users.add(userData)
        .then(user => {
            res.status(201).json(user);
          })
        .catch(err => {
            res.status(500).json({message: 'Failed to add new user'})
        })
})

// --------------
// Create - Login
// --------------
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy(username)
      .first()
      .then(user => {
        // check that passwords match
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          // we will return 401 if the password or username are invalid
          // we don't want to let attackers know when they have a good username
            res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
}); 

// router.post('/login', async (req, res) => {
//     let { username, password } = req.body;

//     try {
//         const user = await Users.findBy(username).first();
//         if (user && bcrypt.compareSync(password, user.password)) {
//             req.session.user = user;
//             res.status(200).json({ message: `Welcome ${user.username}!`, });
//         } else {
//             res.status(401).json({ message: 'invalid credentials' });
//         }
//     } catch (err) { 
//         res.status(500).json(error);
//     }
// });

// ------------
// Read - Users
// ------------
router.get('/', protected, (req, res) => {
    Users.find()
        .then( users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get users' });
        });
})

// ----------------
// Delete - Session
// ----------------
router.delete('/logout', (req, res) => {
    if (req.session) {
        // check out the documentation for this method at
        // https://www.npmjs.com/package/express-session, under
        // Session.destroy().
        req.session.destroy((err) => {
            if (err) {
                res.status(400).json({ message: 'error logging out:', error: err });
            } else {
                res.json({ message: 'logged out' });
            }
        });
    } else {
        res.end();
    }
});

// -----------------------------
// Middleware - Protected Routes
// -----------------------------
function protected(req, res, next) {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ message: 'You must login' });
    }
  }

module.exports = router;