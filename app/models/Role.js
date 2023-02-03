import Sequelize from 'sequelize'
import db from '../../db.js'
import User from './User.js';

const Role = db.define('Role', {
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
},
{
    tableName: 'roles',
    timestamps: false
})


export default Role
