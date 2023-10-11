const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash => {
      const user = new User({
        username: req.body.username,
        password: hash
    });
    user.save()
     .then(result =>{
        res.status(201).json({
           message:'User created successfully',
           result:result
        });
    })
    .catch(err => {
        res.status(500).json({
             error: err
            });
        });
    });
});


router.post('/login', (req, res)=>{
    let fetchedUser;
    User.findOne({username:req.body.username})
    .then(user=>{
    })
    .then(result=>{
        if(!result)
        {
            return res.sendStatus(401).json(
                {
                    message: "Authentication Failure"
                });   
        }
        const token = jwt.sign({username:fetchedUser.username,userid:fetchedUser.id},
            'secret_this_should_be_longer_than_it_is',
            {expiresIn:'1h'});
            
            res.status(200).json({token:token});
        })
        .catch(err =>{
            return res.status(401).json({
                message:"Authentication Failure"
            });
        })
    })
module.exports = router