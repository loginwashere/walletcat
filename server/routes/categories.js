const express = require('express');
const router = express.Router();
const categoriesCollection = require('../collections/categories');
const createCategory = require('../models/category').create;
const updateCategory = require('../models/category').update;
const createUniqueRule = require('../models/category').createUniqueRule;

router.get('/', (req, res) => {
  categoriesCollection
    .filter(category => category.userId === req.user.sub)
    .then(categories => res.json({categories}));
});

router.post('/', (req, res) => {
  categoriesCollection
    .addUnique(
        createCategory({
          userId: req.user.sub,
          name: req.body.name,
          description: req.body.description
        }),
        createUniqueRule(req.user.sub, req.body.name)
    )
    .then(category => res.json(category));
});

router.put('/:id', (req, res) => {
  categoriesCollection
    .filterUpdate(
      c => c.userId === req.user.sub && c.id === req.params.id,
      updateCategory({
        name: req.body.name,
        description: req.body.description
      })
    )
    .then(category => category ? res.json(category) : res.status(404).json({
      error: 'Category not found'
    }));
});

router.delete('/:id', (req, res) => {
  categoriesCollection
    .filterOne(c => c.userId === req.user.sub && c.id === req.params.id)
    .then(category => {
      if (!category) {
        return res.status(404).json({
          error: 'Category not found'
        });
      }
      categoriesCollection.softDelete(category.id)
        .then(result => res.status(204).json());

    });
});

module.exports = router;
