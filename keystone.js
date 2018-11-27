require('dotenv').config();

var keystone = require('keystone');
var Twig = require('twig');

keystone.init({
  'cookie secret': process.env.COOKIE_SECRET,
  'name': 'keystonejs-headless-cms-tutorial',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'twig',
  'less': 'public',

  'twig options': { method: 'fs' },
  'custom engine': Twig.render,

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
});

keystone.import('models');

keystone.set('locals', {
    _: require('lodash'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable,
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
    users: 'users',
});

keystone.start();
