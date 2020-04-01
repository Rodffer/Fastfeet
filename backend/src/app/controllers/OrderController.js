import * as Yup from 'yup';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      deliveryman_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { id: req.body.deliveryman_id },
    });

    if (!deliverymanExists) {
      return res.status(400).json({ error: ' Deliveryman does not exists' });
    }

    const recipientExists = await Recipient.findOne({
      where: { id: req.body.recipient_id },
    });

    if (!recipientExists) {
      return res.status(400).json({ error: ' Recipient does not exists' });
    }

    const order = await Order.create(req.body);

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const {
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
      canceled_at,
      start_date,
      end_date,
    } = req.body;

    const orderExists = await Order.findByPk(id);

    if (!orderExists) {
      return res.status(400).json({ error: ' Order does not exists' });
    }

    await orderExists.update(req.body);

    return res.json({
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
      canceled_at,
      start_date,
      end_date,
    });
  }

  async index(req, res) {
    const orders = await Order.findAll({
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
      ],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(orders);
  }

  async delete(req, res) {
    const orderExists = await Order.findByPk(req.params.id);

    if (!orderExists) {
      return res.status(400).json({ message: 'Order does not exist.' });
    }

    await Order.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json({ message: 'Order Deleted' });
  }
}

export default new OrderController();
