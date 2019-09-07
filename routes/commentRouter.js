const { Router } = require('express');
const { Comment, Combo } = require('../models');
const commentRouter = Router();

// const {restrict} = require('../auth')  gonna pass this as middleware when ready with logins



commentRouter.get('/', async (req, res) => {
  const comments = await Comment.findAll();
  res.json({ comments });
});



commentRouter.post('/', async (req, res) => {
  const combo = await Combo.findByPk(req.body.combo)
  const comment = await combo.createComment({ comment: req.body.comment });
  console.log(comment);
  res.json({ comment })
});

commentRouter.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const id = parseInt(req.params.id);
    await Comment.update(data, {
      where: { id },
    });
    const comment = await Comment.findOne({
      where: { id },
    });

    res.json({ comment });
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
})

commentRouter.delete('/:id', async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.id } })
    res.status(204).end()
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
})






module.exports = commentRouter