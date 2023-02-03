'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:*/
     await queryInterface.createTable('roles', { 
        id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        active:{
            type:Sequelize.BOOLEAN,
            allowNull:false
        },
        createdByUserID:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        createdDate:{
            type:Sequelize.DATE,
            allowNull:false
        },
        modifiedByUserID:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        modifiedDate:{
            type:Sequelize.DATE,
            allowNull:false
        }
     });
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:*/
     await queryInterface.dropTable('roles');
     
  }
};