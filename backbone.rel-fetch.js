/**
 * @class  backbone.rel-fetch
 * @name   Backbone Relation Fetch
 * @desc   Backbone rel-fetch extends your Models to partially fetch your collection using Backbone.Rel relations.
*/
(function () {

  var singularize
    , noop
    , root = this
    , _ = root._;

  if (!_ && (typeof require !== 'undefined')) {
    _ = require('underscore')._;
  }

  // poor singularize fallback
  singularize = _.memoize(_.singularize || function (word) {
    return word.replace(/s$/, '');
  });

  // no operation callback
  noop = function () {
    return;
  };

  /**
   * Get the relationship options
   *
   * @param {Model} self
   * @param {String} rel
   * @param {String} key
   * @return {Collection|Null}
   */
  function getOptions(self, rel, key) {
    return self[rel]
      ? self[rel]()[key]
      : null;
  }

  /**
   * Constructor
   *
   * @param {Model|Collection} self
   * @param {String} key
   * @param {Options} callbacks (success and error)
   * @return {RelHandler}
   */
  function RelHandler(self, key, callbacks) {
    this.self = self;
    this.key = key;
    this.callbacks = callbacks || {};
  }

  /**
   * Searches the relations for the self object
   *
   * @return {Model|Array<Model>|Null}
   */
  RelHandler.prototype.searchRelations = function () {
    return this.handleHasMany() || this.handleBelongsTo();
  };

  /**
   * Gets the belongsTo id attribute
   *
   * @return {Number}
   */
  RelHandler.prototype.findBelongsToIdAttribute = function () {
    var id_attr = singularize(this.key) + '_id';
    return this.self.get(id_attr);
  };

  /**
   * Handles the belongsTo relationship
   *
   * @return {Boolean}
   */
  RelHandler.prototype.handleBelongsTo = function () {
    var collection = getOptions(this.self, 'belongsTo', this.key)
      , result;

    if (!collection) {
      throw new Error('No collection was given');
    }

    if (_.isFunction(collection)) {
      throw new Error('belongsTo relation with funciton is not supported');
    }

    collection.partialFetch({
      filter: {id: this.findBelongsToIdAttribute()}
    , success: this.callbacks.success || noop
    , error: this.callbacks.error || noop
    });

    return true;
  };

  /**
   * Handles the hasMany relationship
   *
   * @return {Boolean}
   */
  RelHandler.prototype.handleHasMany = function () {
    var options = getOptions(this.self, 'hasMany', this.key)
      , filter;

    if (!options) {
      return false;
    }

    if (!options.collection) {
      throw new Error('No collection was given');
    }

    if (_.isFunction(options.filter)) {
      throw new Error('Filter cannot be a function');
    }

    filter = options.filter || {};
    if (_.isEmpty(filter)) {
      filter[options.id] = this.self.id;
    }

    options.collection.partialFetch({
      filter: filter
    , success: this.callbacks.success || noop
    , error: this.callbacks.error || noop
    });

    return true;
  };

  /**
   * Computes and gets the relationship
   *
   * @param {String} key
   * @param {Object} callbacks
   * @return {Boolean}
   */
  function relFetch(key, callbacks) {
    return (new RelHandler(this, key, callbacks)).searchRelations();
  }

  _.extend(Backbone.Model.prototype, {relFetch: relFetch});

}());
