const express = require('express');

const Users = require('./userModel');
const restricted = require('../auth/restrictedMiddleware');

const router = express.Router();

// ------------
// Read - Users
// ------------
router.get('/', restricted, (req, res) => {
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
// router.delete('/logout', (req, res) => {
//     if (req.session) {
//         // check out the documentation for this method at
//         // https://www.npmjs.com/package/express-session, under
//         // Session.destroy().
//         req.session.destroy((err) => {
//             if (err) {
//                 res.status(400).json({ message: 'error logging out:', error: err });
//             } else {
//                 res.json({ message: 'logged out' });
//             }
//         });
//     } else {
//         res.end();
//     }
// });

module.exports = router;