import { User, Group } from './'

User.belongsToMany(Group, { through: 'UserGroup', onDelete: 'CASCADE' });
Group.belongsToMany(User, { through: 'UserGroup', onDelete: 'CASCADE' });