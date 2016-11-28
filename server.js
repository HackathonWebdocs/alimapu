'use strict';

/**
 * ENV variables:
 *
 *  - HOST
 *  - PORT
 *
 *  - NODE_ENV
 *  - SECRET
 *  - URL
 *
 */

/**

 */

const express = require('express');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;


/**
 * Server module
 */

module.exports.startServer = function() {
    const app = express();

    app.locals.config = require('./config');


    /**
     * Bottstrap App
     */

    require('./config/express')(app);
    require('./app/routes')(app);

    /**
     * Start streaming
     */


    /**
     * Server
     */

    const serve = () => {
        const server = app.listen(port , host);
        const io = require('socket.io')(server);

        app.locals.config.io = io;

        console.warn(`App listening on ${host}:${port}`);
    };

    /**
     * Cleanup
     */

    const handleExit = () => {
        console.warn('Cleaning up');
        process.kill(process.pid, 'SIGINT');
    };

    process.once('SIGINT', handleExit);

    serve();
};


if (require.main === module) {
    module.exports.startServer();
}
