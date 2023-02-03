import Sequelize from 'sequelize'
import db from '../../db.js'

const UserGender = db.define('UserGender', {
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
    tableName: 'user_genders',
    timestamps: false
})


export default UserGender