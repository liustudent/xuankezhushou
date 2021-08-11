Example for POST /models/apiName
```js
  Model.apiName = function (var1, var2, cb) {
    return cb(null, "Success");
  };

  Model.remoteMethod("apiName", {
    description: "API creation example",
    http: { path: "/apiName", verb: "post" },
    accepts: [
      { arg: "var1", type: "string", required: true },
      { arg: "var2", type: "string", required: true },
    ],
    returns: { arg: "result", type: "string" },
  });
```
Example for POST /models/{id}/apiName
```js
  Model.prototype.apiName = function (var1, var2, cb) {
    return cb(null, "Success");
  };

  Model.remoteMethod("prototype.apiName", {
    description: "API creation example",
    http: { path: "/apiName", verb: "post" },
    accepts: [
      { arg: "var1", type: "string", required: true },
      { arg: "var2", type: "string", required: true },
    ],
    returns: { arg: "result", type: "string" },
  });
```
