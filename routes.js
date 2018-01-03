const Accounts = require('./app/controllers/accounts');
const Schnatts = require('./app/controllers/schnatts');
const Assets = require('./app/controllers/assets');

module.exports = [

  { method: 'GET', path: '/', config: Accounts.main },
  { method: 'GET', path: '/signup', config: Accounts.signup },
  { method: 'GET', path: '/login', config: Accounts.login },
  { method: 'POST', path: '/login', config: Accounts.authenticate },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'POST', path: '/register', config: Accounts.register },
  { method: 'GET', path: '/settings', config: Accounts.viewSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },


  { method: 'GET', path: '/home', config: Schnatts.home },
  { method: 'GET', path: '/report', config: Schnatts.report },
  { method: 'POST', path: '/message', config: Schnatts.message },
  { method: 'GET', path: '/mytimeline', config: Schnatts.myTimeline },
  { method: 'POST', path: '/mytimeline/{id}', config: Schnatts.deleteSchnatts },
  { method: 'GET', path: '/timeline/{id}', config: Schnatts.timeline },


  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];