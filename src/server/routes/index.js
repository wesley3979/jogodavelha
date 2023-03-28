const user = require('./userRoutes')

const routes = (app) => {
    app.use('/user', user)
}

module.exports = routes;
