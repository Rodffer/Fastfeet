import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address_line_1: Sequelize.STRING,
        number: Sequelize.STRING,
        address_line_2: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zip: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;
