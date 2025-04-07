const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors');
const routes = require('./Router/rolute')
const categoryroutes = require("./Router/CategoryRoute.js")
const productroutes = require("./Router/productRoutes")
const connectDB = require('./Config/db');
// const path = require('path');


 const port = process.env.PORT || 3001;;
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS (Notice the parentheses)
// app.use(formidable());
app.use(express.urlencoded({ extended: true }));


dotenv.config();

connectDB();

app.use('/user',routes)
app.use('/admin',categoryroutes)
app.use('/product',productroutes)


// Serve frontend static files
// app.use(express.static(path.join(__dirname, './client/build')));

// Catch-all route to serve index.html
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './client/build', 'index.html'));
// });

app.get("/home", (req, res) => {
    res.send("hello world");
});

app.listen(port, () => (
    console.log(`Server is started is ${port}`)
));  




