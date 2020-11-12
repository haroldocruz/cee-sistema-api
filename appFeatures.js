
module.exports = function (app) {

  app.use('/', require('./routes/index'));
  // app.use('/g', require('./features/generic/g'));

  app.use('/instrument', require('./features/instrument'));

  // app.use('/meta', require('./features/meta'));
  // app.use('/equipe', require('./features/equipe'));
  // app.use('/indicador', require('./features/indicador'));
  // app.use('/evidencia', require('./features/evidencia'));
  // app.use('/comment', require('./features/comment'));
  // app.use('/feedback', require('./features/feedback'));
  // app.use('/estrategia', require('./features/estrategia'));
  // app.use('/acao', require('./features/acao'));
  
  // app.use('/user', require('./features/user'));
  // app.use('/accessLevel', require('./features/accessLevel'));
  // app.use('/upload', require('./features/upload'));

  // app.use('/metadata', require('./features/metadata'));
  // app.use('/favorite', require('./features/favorite'));
}