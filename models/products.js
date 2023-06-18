const Sequelize=require("sequelize")
const sequelize=require("../util/database")
const Product = sequelize.define('Product', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    }
  },
    {
      timestamps: false
    }
  );

  
  module.exports=Product