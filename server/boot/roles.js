"use strict";
var util = require("../../common/utils/util");

module.exports = function (app) {
  var RoleMapping = app.models.RoleMapping;
  var Role = app.models.Role;

  var names = ["normal", "admin"];
  names.forEach(function (element) {
    Role.findOne({ where: { name: element } }, function (err, role) {
      if (err) {
      } else if (role) {
        util.roles[role.name] = role.id;
      } else {
        Role.create({ name: element }, function (err, r) {
          if (err) console.log(err);
          util.roles[element] = r.id;
        });
      }
    });
  });
};
