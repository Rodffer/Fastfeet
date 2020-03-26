import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address_line_1: Yup.string().required(),
      number: Yup.number().required(),
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
      address_line_1: Yup.string(),
      number: Yup.number(),
      address_line_2: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const {
      name,
      address_line_1,
      number,
      address_line_2,
      state,
      city,
      zip,
    } = req.body;

    const recipientExists = await Recipient.findByPk(id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exist.' });
    }

    await recipientExists.update(req.body);

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

  async index(req, res) {
    const recipient = await Recipient.findAll({
      attributes: [
        'id',
        'name',
        'address_line_1',
        'number',
        'address_line_2',
        'state',
        'city',
        'zip',
      ],
    });

    return res.json(recipient);
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ message: 'Recipient does not exist.' });
    }

    await Recipient.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json({ message: 'Recipient Deleted' });
  }
}

export default new RecipientController();
