import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address_line_1: Yup.string().required(),
      number: Yup.integer().required(),
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
      name: Yup.string(),
      address_line_1: Yup.string().required(),
      number: Yup.integer().required(),
      address_line_2: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Recipient Update fail' });
    }

    const recipient = await Recipient.findByPk(req.userId);

    const {
      id,
      name,
      address_line_1,
      number,
      address_line_2,
      state,
      city,
      zip,
    } = await recipient.update(req.body);

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
}

export default new RecipientController();
