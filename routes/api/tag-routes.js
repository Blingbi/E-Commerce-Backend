const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
		include: [
			{
				model: Product,
				attributes: ['id', 'product_name', 'price', 'stock'],
				through: ProductTag,
				as: 'tagged_products'
			}
		]
	})
		.then(dbData => res.json(dbData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
		where: { id: req.params.id },
		include: [
			{
				model: Product,
				attributes: ['id', 'product_name', 'price', 'stock'],
				through: ProductTag,
				as: 'tagged_products'
			}
		]
	})
		.then(dbData => res.json(dbData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create({
		tag_name: req.body.tag_name
	})
		.then(dbData => res.json(dbData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
		where: { id: req.params.id }
	}).then(dbData => {
		if (!dbData[0]) {
			res.status(404).json({ message: 'No user found with this ID!' });
			return;
		}
		console.log('Updated!');
		res.json(dbData);
	});
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
		where: { id: req.params.id }
	}).then(dbData => {
		if (!dbData) {
			res.status(404).json({ message: 'No user found with this ID!' });
			return;
		}
		console.log('Deleted!');
		res.json(dbData);
	});
  // delete on tag by its `id` value
});

module.exports = router;
