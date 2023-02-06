import Sequelize from 'sequelize'
import db from '../../db.js'

const PasswordReset = db.define('PasswordReset', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    uuid:{
        type:Sequelize.STRING,
        allowNull:false
    },
    createdDate:{
        type:Sequelize.DATE,
        allowNull:false
    }
},
{
    tableName: 'password_resets',
    timestamps: false
})


export default PasswordReset
