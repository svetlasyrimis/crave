const { Router } = require('express');
const { User,Combo } = require('../models');
const bcrypt = require('bcrypt');
const { genToken, restrict } = require('../auth');
const { Op } = require('sequelize');
const userRouter = Router();
const SALT = 2;


userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const pwDigest = await bcrypt.hash(password, SALT);


  (pwDigest);
  const user = await User.create({
    name: name,
    password_digest: pwDigest,
    email: email
  });


  const { password_digest, ...userData } = user.dataValues;
  const token = genToken(userData)
  (user.dataValues);
  res.json({ user: userData, token });
  (user.dataValues);
});

userRouter.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ where: { name } });
    const isValidPass = await bcrypt.compare(password, user.password_digest);
    (isValidPass);
    if (isValidPass) {
      const { password_digest, ...userData } = user.dataValues;
      const token = genToken(userData);
      (userData)
      res.json({ token, user: userData });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (e) {
    (e.message);
    res.status(401).send('Invalid credentials');
  }
});

userRouter.get('/verify', restrict, (req, res) => {
  res.json({ user: res.locals });
});

userRouter.get('/:id/combos', async (req, res) => {
  const id = req.params.id;
  (id)
  const combos = await Combo.findAll({
    where: {
      userId: id
    }
  })
  (combos);
  res.json({combos})
})

userRouter.get('/:id/favorites', async (req, res) => {
  const id = req.params.id;
  (id)
  const combos = await Combo.findAll({
    where: {
      userId: id,
      isLiked: true
    }
  })
  (combos);
  res.json({combos})
})



module.exports = userRouter