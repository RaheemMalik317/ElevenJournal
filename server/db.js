const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:Aliyah&Nathan@localhost:5432/eleven-journal");

module.exports = sequelize;



/*  'postgres://user:pass@example.com:5432/dname'

 postgres = Identifies the database table to connect to. In our case, we are connecting to a postgres database.

user= The username in order to connect to the database. In our case, this username is postgres.

password: The password used for the local database. This is the password you used when you set up pgAdmin earlier and should be unique.

examle.com:5432: The host points to the local port for Sequelize. This is 5432.

dname: The name we choose in order to identify a specific database. */