/**
 *
 * assumes the following structure as data.
 *
 * {
 *   "namespace": <namespace>,
 *   "data": {}
 * }

/**
 * @constructor
 *
 * options:
 *   endpoint {string}
 */
var ActiveSocket = function(options) {
  this._options = options;
  this._endpoint = options.endpoint;
  this._sock = new SockJS(this._endpoint);
  this._ns = {};
  var that = this;

  this._sock.onopen = function(e) {
    that.trigger('open');
  };

  this._sock.onmessage = function(e) {
    var rawData = JSON.parse(e.data);
    that.trigger(rawData.namespace, rawData.data);
  };

  this._sock.onclose = function(e) {
    that.trigger('close');
  };
};

/**
 * @method
 *
 * namespace {string}
 * data {object}
 */
ActiveSocket.prototype.trigger = function(namespace, data) {
  for (var i in this._ns[namespace]) {
    this._ns[namespace][i](data, namespace);
  }

  // XXX: Untested
  for (var i in this._ns['*']) {
    this._ns['*'][i](data, namespace);
  }
};

/**
 * @method
 *
 * namespace {string}
 * cb {fn}
 */
ActiveSocket.prototype.on = function(namespace, cb) {
  if (!this._ns[namespace]) {
    this._ns[namespace] = [cb];
    return cb;
  }
  this._ns[namespace].push(cb);
  return cb;
};

/**
 * @method
 *
 * namespace {string}
 * data {object}
 */
ActiveSocket.prototype.emit = function(namespace, data) {
  this._sock.send(JSON.stringify({namespace: namespace, data: data}));
};


