module.exports = function (app) {

    // const User = require("./models/User")
    // const Profile = require("./models/Profile");
    const Instrument = require("./models/Instrument");
    const Route = require("./models/Route");

    // app.use('/user', require('./features/generic')("user", User.User));
    app.use('/instrument', require('./features/generic')("instrument", Instrument.Instrument));
    // app.use('/profile', require('./features/generic')("profile", Profile.Profile));
    app.use('/route', require('./features/generic')("route", Route.Route));

    app.use('/', require('./routes/index'));
    // app.use('/g', require('./features/generic/g'));

    // app.use('/instrument', require('./features/instrument'));

    // app.use('/meta', require('./features/meta'));
    // app.use('/equipe', require('./features/equipe'));
    // app.use('/indicador', require('./features/indicador'));
    // app.use('/evidencia', require('./features/evidencia'));
    // app.use('/comment', require('./features/comment'));
    // app.use('/feedback', require('./features/feedback'));
    // app.use('/estrategia', require('./features/estrategia'));
    // app.use('/acao', require('./features/acao'));

    // app.use('/group', require('./features/group'));
    app.use('/institution', require('./features/institution'));
    app.use('/user', require('./features/user'));
    app.use('/avaliador', require('./features/avaliador'));
    app.use('/profile', require('./features/profile'));
    app.use('/auth', require('./features/auth'));
    app.use('/send-mail', require('./features/send-mail'));
    app.use('/send-sms', require('./features/send-sms'));
    // app.use('/accessLevel', require('./features/accessLevel'));
    // app.use('/upload', require('./features/upload'));

    // app.use('/metadata', require('./features/metadata'));
    // app.use('/favorite', require('./features/favorite'));
}