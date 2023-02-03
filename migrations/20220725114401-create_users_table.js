'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:*/
     await queryInterface.createTable('users', { 
        id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        userGenderId:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        userName:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true
        },
        firstName:{
            type:Sequelize.STRING,
            allowNull:false
        },
        surName:{
            type:Sequelize.STRING,
            allowNull:false
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false
        },
        active:{
            type:Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:false
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
     await queryInterface.dropTable('users');
     
  }
};