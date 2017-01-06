const express = require('express');
const router = express.Router();
const categoriesCollection = require('../collections/categories');
const createCategory = require('../models/category');

router.get('/', (req, res) => {
  categoriesCollection
    .filter(category => category.userId === req.user.sub)
    .then(categories => res.json({categories}));
});

router.post('/', (req, res) => {
  const category = createCategory({
    userId: req.user.sub,
    name: req.body.name,
    description: req.body.description
  });
  categoriesCollection
    .add(category)
    .then(res.json);
});

router.delete('/:id', (req, res) => {
  const category = categoriesCollection
    .filter((category) => category.userId === req.user.sub)
    .filter((category) => category.id === req.params.id)
    [0];
  if (category) {
    // const index = categories.indexOf(category);
    // categories.splice(index, 1);
  }
  res
    .status(204)
    .json();
});

module.exports = router;
