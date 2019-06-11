const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const hostname = '127.0.0.1';
const http = require('https');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://itkgqfhz:WZpooC7Jtjr7EdQ1a-2OhxvwWWdH0lZt@raja.db.elephantsql.com:5432/itkgqfhz');
const url = require('url');
const port = 7000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

const Model = Sequelize.Model;
class College extends Model {}
College.init({

	name:{
		type: Sequelize.STRING,
		allowNull: false,
		unique:true
	},

	image_path:{
		type: Sequelize.STRING,
		allowNull:false
	},

	address:{
		type:Sequelize.STRING,
		allowNull:false,
		unique:true
	},

	description:{
		type:Sequelize.TEXT,
		allowNull:false
	},

  population: {
		type:Sequelize.INTEGER,
		allowNull:false
  }

},
	{sequelize,modelName: 'college',timestamps: false}
);


class Student extends Model {}
Student.init({

	firstname:{
		type: Sequelize.STRING,
		allowNull: false,
	},

	lastname:{
		type: Sequelize.STRING,
		allowNull: false,
	},
	image_path:{
		type: Sequelize.STRING,
		allowNull:false
	},

	email:{
		type:Sequelize.STRING,
		allowNull:false,
		unique:true
	},

	gpa:{
		type:Sequelize.DOUBLE,
		allowNull:false
	}

},
	{sequelize,modelName: 'student',timestamps: false}
);

College.hasMany(Student);
Student.belongsTo(College);

sequelize.sync();

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })


app.listen(port, hostname, () => {});
require('./routes/college')(app,College,Student);
require('./routes/student')(app,College,Student);
console.log('Server started on port',config.PORT)
