/**
 * Created by Yash 1300 on 21-03-2018.
 */

const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const authenticationRouter = require('./routes/authenticationRoutes');
const organisationRouter = require('./routes/organisationRoutes');
const userRouter = require('./routes/userRoutes').user_router;
const coordinatorRouter = require('./routes/userRoutes').coordinator_router;
const eventRouter = require('./routes/eventRoutes');

try {
    var config = require('./config');
} catch (e) {
    console.log("Using environment variables instead of config variables");
}

const app = express();
const port = process.env.PORT || 8000;
//const db = process.env.DATABASE || config.DATABASE;
const db = "mongodb://yash98:yash98@ds219879.mlab.com:19879/evento";
// Establishing connection to the database
mongoose.connect(db, (err) => {
    if (err) {
        console.log("Error connecting the database");
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
        app.use('/authenticate', authenticationRouter);
        app.use('/organisation', organisationRouter);
        app.use('/user', userRouter);
        app.use('/coordinator', coordinatorRouter);
        app.use('/event', eventRouter);

        app.use((req, res, next) => {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handler
        app.use((err, req, res, next) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.send('error');
        });

        // Starting the server
        app.listen(port, () => console.log("App running successfully on port number: " + port + "..."));
    }
});
