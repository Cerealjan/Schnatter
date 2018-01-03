'use strict';
const Message = require('../models/message');
const User = require('../models/user');

exports.home = {

  handler: function (request, reply)
  {
    reply.view('home', { title: 'Schnattere' });
  },

};

exports.report = {

  handler: function (request, reply)
  {
    Message.find({}).populate('user').then(allMessages =>
    {
      reply.view('report', {
        title: 'Alle heutigen Schwätzer',
        schnatts: allMessages,
      });
    }).catch(err =>
    {
      reply.redirect('/');
    });
  },

};

exports.message = {

  handler: function (request, reply)
  {
    User.findOne({ email: request.auth.credentials.loggedInUser }).then(self =>
    {
      let data = request.payload;
      data.user = self
      const message = new Message(data);

      message.save().then(newMessage =>
      {
        reply.redirect('/report');
      });

    }).catch(err =>
    {
      console.log(err);
      reply.redirect('/');
    });
  },

};

exports.myTimeline = {

  handler: function (request, reply)
  {
    User.findOne({ email: request.auth.credentials.loggedInUser }).then(self =>
    {
      Message.find({ user: self }).then(allMessages =>
      {
        reply.view('mytimeline', {
          title: "Alle Schnatts von mir",
          schnatts: allMessages,


        });
      }).catch(error =>
      {
        reply.redirect('/home');
      });
    });
  }
};

exports.deleteSchnatts = {

  handler: function (request, reply)
  {
    Message.remove({ _id: request.params.id }).then(message =>
    {
      reply.redirect('/mytimeline');
    }).catch(err =>
    {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.timeline = {

  handler: function (request, reply)
  {
    console.log(request.id);
    User.findOne({ _id: request.params.id }).then(theOne =>
    {
      console.log(theOne);
      Message.find({ user: theOne }).populate('user').then(allMessages =>
      {
        reply.view('timeline', {
          title: "Alle Schnatts von ihm",
          schnatts: allMessages,
          username: theOne.firstName,

        });
      }).catch(error =>
      {
        reply.redirect('/home');
      });
    });
  }
};
