const express = require('express');
const router = express.Router();
const db  = require('./dbConnection');
const { signupValidation, loginValidation } = require('./validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', loginValidation, (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
      (err, result) => {
        console.log(req.body.email)
        // user does not exists
        if (err) {
        //   throw err;
          return res.status(400).send({
            msg: err
          });
        }
        console.log(result)
        if (!result.length) {
          return res.status(401).send({
            msg: 'Email or password is incorrect! 1'
          });
        }
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            console.log(req.body.password)
            console.log("password atas")
            // wrong password
            if (bErr) {
            //   throw bErr;
              return res.status(401).send({
                msg: 'Email or password is incorrect! 2'
              });
            }
            if (bResult) {
              const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
              db.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
              );
              return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Username or password is incorrect! 30'
            });
          }
        );
      }
    );
  });
   
module.exports = router