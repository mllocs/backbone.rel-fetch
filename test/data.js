module.exports = (function () {
  var Models = {}
    , Collections = {}
    , users, tasks, projects;

  GLOBAL._ = require('underscore');
  GLOBAL.Backbone = require('backbone');
  require('backbone.partial-fetch');
  require('../backbone.rel-fetch');

  Models.Task = Backbone.Model.extend({
    belongsTo: function () {
      return {
        user: users
      };
    }
  });

  Models.User = Backbone.Model.extend({
    hasMany: function () {
      return {
        tasks: {collection: tasks, id: 'user_id'}
      };
    }
  , belongsTo: function () {
      return {
        project: projects
      };
    }
  });

  Models.Project = Backbone.Model.extend({
    hasMany: function () {
      return {
        users: {collection: users, id: 'project_id'}
      };
    }
  });

  Collections.Users = Backbone.Collection.extend({
    model: Models.User
  , url: function (options) {
      return 'http://rest-api-endpoint';
    }
  });

  Collections.Projects = Backbone.Collection.extend({
    model: Models.Project
  , url: function (options) {
      return 'http://rest-api-endpoint';
    }
  });

  Collections.Tasks = Backbone.Collection.extend({
    model: Models.Task
  , url: function (options) {
      return 'http://rest-api-endpoint';
    }
  });

  function instance() {
    projects = new Collections.Projects([
      {id: 0, owner_id: 0, name: 'project1'}
    ]);

    users = new Collections.Users([
      {id: 0, project_id: 0, name: 'user1'}
    ]);

    tasks = new Collections.Tasks([
      {id: 0, name: 'task1'}
    ]);

    return {
      projects: projects
    , users: users
    , tasks: tasks
    };
  }

  return {
    Collections: Collections
  , Models: Models
  , instance: instance
  };
})();
