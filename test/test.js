/*global it, describe, before, beforeEach*/

var data = require('./data')
  , assert = require('assert')
  , sinon = require('sinon');

describe('relFetch', function () {
  var users, projects, tasks;

  beforeEach(function () {
    var instance = data.instance(1);

    users = instance.users;
    projects = instance.projects;
    tasks = instance.tasks;
  });

  it('calls partialFetch for a belongsTo relation', function () {
    var task = tasks.get(0)
      , result
      , stub;

    stub = sinon.stub(users, 'partialFetch');
    result = task.relFetch('user');

    sinon.assert.calledOnce(stub);
    assert.equal(result, true);
  });

  it('calls partialFetch for a hasMany relation', function () {
    var project = projects.get(0)
      , result
      , stub;

    stub = sinon.stub(users, 'partialFetch');
    result = project.relFetch('users');

    sinon.assert.calledOnce(stub);
    assert.equal(result, true);
  });
});
