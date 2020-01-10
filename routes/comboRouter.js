const { Router } = require('express');
const { Combo, User, Comment } = require('../models');
const { restrict } = require('../auth');
const { Op } = require('sequelize');
const comboRouter = Router();

comboRouter.get('/', (req, res) => {
  res.json({ combo: "get route" });
});


// Get all the combos of the other users
comboRouter.get('/:id/all', async (req, res) => {
  const id = req.params.id;
  const combos = await Combo.findAll({
    where: {
      user_id: {
        [Op.ne]: id
      }
    },
    include: [{ model: Comment }],
    include: [{ model: User }]
  });

  res.json({ combos });
});

//post a combo 
comboRouter.post('/', restrict, async (req, res) => {
  (req.body)

  const newCombo = await Combo.create(req.body);
  const user = await User.findByPk(res.locals.id);
  
  // (name)
  const answer = await newCombo.setUser(user);
 
  const combo = await Combo.findByPk(newCombo.id, {
    include: [Comment]
  })
  // (combo);
  res.json({ combo });
});

comboRouter.delete('/:id', restrict, async (req, res) => {
  try {
    await Combo.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(`Success, combo is ${req.params.id} has been destroyed`);
  } catch (e) {
    console.log(e)
    res.status(401).send("Can't be deleted");
  }

})

//get one combo
comboRouter.get('/:id', async (req, res) => {
  const combo = await Combo.findByPk(req.params.id, { include: [Comment] });

  res.json({ combo });
})

//update a combo
comboRouter.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    ("data" + data)
    await Combo.update(
      data, {
      where: {
        id,
      },
    });
    const combo = await Combo.findByPk(id);
    
    res.json(combo);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});


// find all the combos of the current user
comboRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const user = await User.findByPk(req.params.id);
  const combos = await Combo.findAll({
    where: {
      user_id: user.dataValues.id
    }
  });
  res.json({ combos });

});






module.exports = comboRouter