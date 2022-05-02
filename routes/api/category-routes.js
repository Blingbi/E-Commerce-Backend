const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// localhost:3001/api/categories/
router.get('/', (req, res) => {
  Category.findAll({
		include: [
			{
				model: Product,
				attributes: ['id', 'product_name', 'price', 'stock']
			}
		]
	})
		.then(dbData => res.json(dbData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});

  // find all categories
  // be sure to include its associated Products
});
// localhost:3001/api/categories/#
router.get('/:id', (req, res) => {
  Category.findOne({
		where: { id: req.params.id },
		include: [
			{
				model: Product,
				attributes: ['id', 'product_name', 'price', 'stock']
			}
		]
	})
		.then(dbData => res.json(dbData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
  // find one category by its `id` value
  // be sure to include its associated Products
});
// localhost:3001/api/categories{"Category_name:"Any Category"}
router.post('/', (req, res) => {
  // create a new category
  Category.create({
		category_name: req.body.category_name
	})
		.then(dbData => res.json(dbData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});
//localhost:3001/api/categories/[id to update]
router.put('/:id', (req, res) => {
  Category.update(req.body, {
		where: { id: req.params.id }
	})
		.then(dbData => {
			if (!dbData[0]) {
				res.status(404).json({ message: 'No user found with this ID!' });
				return;
			}
			console.log('Updated');
			res.json(dbData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
  // update a category by its `id` value
});
//localhost:3001/api/categories/[id to delete]
router.delete('/:id', (req, res) => {
  Category.destroy({
		where: { id: req.params.id }
	}).then(dbData => {
		console.log(dbData);
		if (!dbData) {
			res.status(404).json({ message: 'No user found with this ID!' });
			return;
		}
		console.log('Deleted');
		res.json(dbData);
	});
  // delete a category by its `id` value
});

module.exports = router;
