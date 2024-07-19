const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postapp', null, null, {
  dialect: 'mssql',
  dialectModule: require('msnodesqlv8'),
  dialectOptions: {
    options: {
      driver: 'SQL Server Native Client 11.0',
      trustedConnection: true
    }
  },
  host: 'localhost',
  logging: false 
});

const Post = sequelize.define('Post', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  conteudo: {
    type: DataTypes.TEXT
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: true
});

module.exports = { sequelize, Post };
