require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./db/database");
const Employee = require("./Routes/Employee");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 3000;


app.use(Employee);

// Synchronize the database and start your application
sequelize.sync().then(() => {
    console.log('Database synchronized successfully.');
    // Start your application here
    app.listen(port, () => {
        console.log("Running on port 3000");
    }); 

}).catch((error) => {
    console.error('Unable to synchronize the database:', error);
});



