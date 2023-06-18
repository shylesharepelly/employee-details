'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async getall(){
      const users1 = await User.findAll();
      return users1;
    }
    static async getDetails(id){
      const user2 = await User.findOne({
        where: {
          id: id
          }
        });
      return user2;
    }
    static async updatedata(id,name,job,phone,address,city,state,primary,phone1,relation1,second,phone2,relation2)
    {
      console.log("name",name)
      return this.update({
          name: name,
          job: job,
          phone: phone,
          address: address,
          city: city,
          state: state,
          primary: primary,
          phone1: phone1,
          relation1: relation1,
          second: second,
          phone2: phone2,
          relation2: relation2
          },  
          {
            where: { id: id }
          });
          
    }
    static async deleteUser(id){
      const user4 = await User.destroy({
        where: {
          id: id
          }
          });
          return user4;
    }

    static async remove(id) {
      return this.destroy({
        where: {
          id:id,
        },
      });
    }

  }
  User.init({
    name: DataTypes.STRING,
    job: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    primary: DataTypes.STRING,
    phone1: DataTypes.STRING,
    relation1: DataTypes.STRING,
    second: DataTypes.STRING,
    phone2: DataTypes.STRING,
    relation2: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};