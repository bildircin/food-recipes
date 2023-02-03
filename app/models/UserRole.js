import Sequelize from 'sequelize'
import db from '../../db.js'
import User from './User.js';

const Role = db.define('UserRole', {
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
        allowNull:true
    },
    createdDate:{
        type:Sequelize.DATE,
        allowNull:false
    },
    modifiedByUserID:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    modifiedDate:{
        type:Sequelize.DATE,
        allowNull:false
    }
},
{
    tableName: 'user_roles',
    timestamps: false
})


export default Role
