/**
 * Created by Yash 1300 on 21-03-2018.
 */

const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const authenticationRoutes = require('./routes/auth_api');
const organisationRoutes = require('./routes/organisationRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 8000;
const db = process.env.DATABASE;

// Establishing connection to the database
mongoose.connect(db, function(err){
    if (err) {
        console.log("Error connecting the database"+err);
    } else {
        console.log("Database connected successfully...");

        // Attaching logger to the app
        app.use(logger('dev'));

        // Attaching body parser to the app to read request bodies
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        // Attaching "helmet" to the app to secure various HTTP headers and "compression" to compress the requests passing
        // through middle wares
        app.use(helmet());
        app.use(compression());

        // Attaching the routers to specific base routes
        app.use('/authenticate', authenticationRoutes);
        app.use('/organisation', organisationRoutes);
        app.use('/user', userRoutes);

        app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handler
        app.use(function(err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    }
});


// Starting the server
app.listen(port, function(){
    console.log("App running successfully on port number: " + port + "...");
});