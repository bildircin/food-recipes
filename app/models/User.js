import Sequelize from 'sequelize'
import db from '../../db.js'
import Role from './Role.js';

const User = db.define('User', {
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
    tableName: 'users',
    timestamps: false
})



export default User
