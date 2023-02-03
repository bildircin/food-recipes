'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:*/
     await queryInterface.createTable('user_roles', { 
        id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        userId:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        roleId:{
            type:Sequelize.INTEGER,
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
     await queryInterface.dropTable('user_roles');
     
  }
};