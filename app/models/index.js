/* 
import User from "./User";
import Role from "./Role";

const UserRole = sequelize.define('user_roles', {
    role: Sequelize.STRING
})

User.belongsToMany(Role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

Role.belongsToMany(User, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

export default  {
    UserRole,
    User,
    Role
} */