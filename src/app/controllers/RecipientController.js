import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address_line_1: Yup.string().required(),
      number: Yup.string().required(),
      address_line_2: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Recipients fails' });
    }

    const {
      id,
      name,
      address_line_1,
      number,
      address_line_2,
      state,
      city,
      zip,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      address_line_1,
      number,
      address_line_2,
      state,
      city,
      zip,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      address_line_1: Yup.string().required(),
      number: Yup.string().required(),
      address_line_2: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Recipients fails' });
    }

    const { id } = req.body;

    const recipientExists = await Recipient.findByPk(id);

    if (!recipientExists)
      res.status(400).json({ error: 'Recipient not found.' });

    const recipient = await Recipient.findOne({ where: { id } });

    const {
      name,
      address_line_1,
      number,
      address_line_2,
      state,
      city,
      zip,
    } = await recipient.update(req.body);

    return res.json({
      name,
      address_line_1,
      number,
      address_line_2,
      state,
      city,
      zip,
    });
  }
}

export default new RecipientController();
