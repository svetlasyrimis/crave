const { Router } = require('express');
const { Combo, User, Comment } = require('../models');
const { restrict } = require('../auth');
const comboRouter = Router();

comboRouter.get('/', (req, res) => {
  res.json({ combo: "get route" });
});

comboRouter.get('/all', async (req, res) => {
  const combos = await Combo.findAll({
    include: [Comment]
  });
  
  res.json({ combos });
});

comboRouter.post('/', restrict, async (req, res) => {
  console.log(req.body)

  const newCombo = await Combo.create(req.body);
  const user = await User.findByPk(res.locals.id);
  console.log(user.id);
  // console.log(name)
  const answer = await newCombo.setUser(user);
  console.log(answer.dataValues);
  const combo = await Combo.findByPk(newCombo.id, {
    include: [Comment]
  })
  // console.log(combo);
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
comboRouter.get('/:id', async (req, res) => {
  const combo = await Combo.findByPk(req.params.id, { include: [Comment] });

  res.json({ combo });
})


comboRouter.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log("data" + data)
    await Combo.update(
      data, {
        where: {
          id,
        },
      });
    const combo = await Combo.findByPk(id);
    // console.log(combo)
    res.json(combo);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});



comboRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  const user = await User.findByPk(req.params.id);
  console.log(user);
  const combos = await Combo.findAll({
    where: {
      user_id: user.dataValues.id
    }
  });
  console.log(combos)
  res.json({ combos });

});






module.exports = comboRouter