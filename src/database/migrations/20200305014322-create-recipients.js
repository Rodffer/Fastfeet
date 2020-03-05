module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipients', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        // Full Name
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_line_1: {
        // Street address
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        // number
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address_line_2: {
        // Apartment, suite, floor,complement, etc.
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        // state, province, region
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        // City
        type: Sequelize.STRING,
        allowNull: false,
      },
      zip: {
        // zip codes
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
