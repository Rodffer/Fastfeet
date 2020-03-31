import * as Yup from 'yup';

import Order from '../models/Order';
import File from '../models/File';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const orderExists = await Order.findOne({
      where: { id: req.body.id },
    });

    if (orderExists) {
      return res.status(400).json({ error: 'Order already exists.' });
    }
    const { product } = await Order.create(req.body);

    return res.json({
      product,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { name, email } = req.body;

    const deliverymanExists = await Deliveryman.findByPk(id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exist.' });
    }

    if (email) {
      const emailExists = await Deliveryman.findOne({
        where: { email },
      });
      if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      deliverymanExists.email = email;
    }

    if (name) {
      deliverymanExists.name = name;
    }

    await deliverymanExists.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async index(req, res) {
    const deliveryman = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryman);
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ message: 'Deliveryman does not exist.' });
    }

    await Deliveryman.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json({ message: 'Deliveryman Deleted' });
  }
}

export default new OrderController();
