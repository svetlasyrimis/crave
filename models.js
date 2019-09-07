const { Sequelize } = require('sequelize');

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    define: {
      underscored: true
    }
  });
} else {
  sequelize = new Sequelize({
    database: 'meal_match',
    dialect: 'postgres',
    define: {
      underscored: true,
    },
  });
}
const User = sequelize.define('user', {
  name: Sequelize.STRING,
  password_digest: Sequelize.STRING,
  email: Sequelize.STRING
});

const Combo = sequelize.define('combo', {
  foodId: Sequelize.INTEGER,
  food: Sequelize.STRING,
  foodImage: Sequelize.STRING,
  foodId: Sequelize.INTEGER,
  drink: Sequelize.STRING,
  drinkImage: Sequelize.STRING,
  drinkId: Sequelize.INTEGER,
  isLiked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    set: function (value) {
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      this.setDataValue('isLiked', value);
    }
  }
});



const Comment = sequelize.define('comment', {
  comment: Sequelize.STRING	 
 });	


User.hasMany(Combo);
Combo.belongsTo(User);
Combo.hasMany(Comment, { onDelete: 'cascade' });
Comment.belongsTo(Combo);



module.exports = {
  User,
  Combo,
  Comment,
  sequelize
};