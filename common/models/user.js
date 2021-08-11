"use strict";
const app = require("../../server/server");
var util = require("../utils/util");
module.exports = function (User) {
  // 创建新的账号的时候，分配它们的role
  User.observe("after save", function (ctx, next) {
    if (ctx.isNewInstance) {
      // var objects = { email: ctx.instance.email };

      ctx.instance.__create__accessTokens({}, function (err, token) {
        if (err) return next();
        ctx.instance["accessToken"] = token.id;
      });

      var Role = app.models.Role;
      var RoleMapping = app.models.RoleMapping;
      let roleName = "normal";
      if (ctx.instance.roleName) {
        roleName = ctx.instance.roleName;
      }
      Role.findById(util.roles[roleName], function (err, role) {
        if (err) return next(err);
        if (role) {
          role.principals.create(
            {
              principalType: RoleMapping.USER,
              principalId: ctx.instance.id,
            },
            function (err, principal) {
              if (err) return next(err);
              console.log("Created principal:", principal);
              return next();
            }
          );
        } else return next(new Error("Role not found"));
      });
    } else next();
  });
  User.getWatchList = function (ltx_userid, cb) {
    if (ltx_userid == "1") {
      let errObj = new Error();
      errObj.name = "User Not Exist";
      errObj.message = "User Not Exist";
      errObj.status = 404;
      return cb(errObj);
    }
    let template = [
      {
        _id: "1",
        course_name: "CS121",
        course_code: "12345",
        class_day: ["W", "M", "F"],
        start_time: "10:00",
        end_time: "11:00",
        status: "OPEN",
      },
      {
        _id: "2",
        course_name: "CS122",
        course_code: "54321",
        class_day: ["Tu", "Th"],
        start_time: "9:00",
        end_time: "10:00",
        status: "FULL",
      },
    ];
    return cb(null, template);
  };

  User.remoteMethod("getWatchList", {
    description: "Get watch list for a user",
    http: { path: "/getWatchList", verb: "post" },
    accepts: [{ arg: "ltx_userid", type: "string", required: true }],
    returns: { arg: "result", type: "array" },
  });

  User.addToWatchList = function (ltx_userid, crawl_course_id, cb) {
    if (ltx_userid == "1") {
      let errObj = new Error();
      errObj.name = "User Not Exist";
      errObj.message = "User Not Exist";
      errObj.status = 404;
      return cb(errObj);
    }
    if (crawl_course_id == "1") {
      let errObj = new Error();
      errObj.name = "Course Not Exist";
      errObj.message = "Course Not Exist";
      errObj.status = 405;
      return cb(errObj);
    }
    let template = "success";
    return cb(null, template);
  };

  User.remoteMethod("addToWatchList", {
    description: "add a course to watch list for a user",
    http: { path: "/addToWatchList", verb: "post" },
    accepts: [
      { arg: "ltx_userid", type: "string", required: true },
      { arg: "crawl_course_id", type: "string", required: true },
    ],
    returns: { arg: "result", type: "string" },
  });

  User.removeFromWatchList = function (ltx_userid, crawl_course_id, cb) {
    if (ltx_userid == "1") {
      let errObj = new Error();
      errObj.name = "User Not Exist";
      errObj.message = "User Not Exist";
      errObj.status = 404;
      return cb(errObj);
    }
    if (crawl_course_id == "1") {
      let errObj = new Error();
      errObj.name = "Course Not Exist";
      errObj.message = "Course Not Exist";
      errObj.status = 405;
      return cb(errObj);
    }

    let template = "success";
    return cb(null, template);
  };

  User.remoteMethod("removeFromWatchList", {
    description: "remove a course from watch list for a user",
    http: { path: "/removeFromWatchList", verb: "post" },
    accepts: [
      { arg: "ltx_userid", type: "string", required: true },
      { arg: "crawl_course_id", type: "string", required: true },
    ],
    returns: { arg: "result", type: "string" },
  });

  User.disableRemoteMethodByName("upsert"); // disables PATCH /users
  User.disableRemoteMethodByName("find"); // disables GET /users
  User.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /users
  User.disableRemoteMethodByName("create"); // disables POST /users
  User.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /users/{id}
  User.disableRemoteMethodByName("findById"); // disables GET /users/{id}
  User.disableRemoteMethodByName("exists"); // disables HEAD /users/{id}
  User.disableRemoteMethodByName("replaceById"); // disables PUT /users/{id}
  User.disableRemoteMethodByName("deleteById"); // disables DELETE /users/{id}
  User.disableRemoteMethodByName("prototype.__get__accessTokens"); // disable GET /users/{id}/accessTokens
  User.disableRemoteMethodByName("prototype.__create__accessTokens"); // disable POST /users/{id}/accessTokens
  User.disableRemoteMethodByName("prototype.__delete__accessTokens"); // disable DELETE /users/{id}/accessTokens
  User.disableRemoteMethodByName("prototype.__findById__accessTokens"); // disable GET /users/{id}/accessTokens/{fk}
  User.disableRemoteMethodByName("prototype.__updateById__accessTokens"); // disable PUT /users/{id}/accessTokens/{fk}
  User.disableRemoteMethodByName("prototype.__destroyById__accessTokens"); // disable DELETE /users/{id}/accessTokens/{fk}
  User.disableRemoteMethodByName("prototype.__count__accessTokens"); // disable  GET /users/{id}/accessTokens/count
  User.disableRemoteMethodByName("prototype.verify"); // disable POST /users/{id}/verify
  User.disableRemoteMethodByName("changePassword"); // disable POST /users/change-password
  User.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /users/change-stream
  User.disableRemoteMethodByName("confirm"); // disables GET /users/confirm
  User.disableRemoteMethodByName("count"); // disables GET /users/count
  User.disableRemoteMethodByName("findOne"); // disables GET /users/findOne
  User.disableRemoteMethodByName("login"); // disables POST /users/login
  User.disableRemoteMethodByName("logout"); // disables POST /users/logout
  User.disableRemoteMethodByName("resetPassword"); // disables POST /users/reset
  User.disableRemoteMethodByName("setPassword"); // disables POST /users/reset-password
  User.disableRemoteMethodByName("update"); // disables POST /users/update
  User.disableRemoteMethodByName("upsertWithWhere"); // disables POST /users/upsertWithWhere
  User.disableRemoteMethodByName("prototype.__get__courseNames"); //disables GET /users/{id}/courseNames
  User.disableRemoteMethodByName("prototype.__create__courseNames"); //disables POST /users/{id}/courseNames
  User.disableRemoteMethodByName("prototype.__delete__courseNames"); //disables DELETE /users/{id}/courseNames
  User.disableRemoteMethodByName("prototype.__findById__courseNames"); //disables GET /users/{id}/courseNames/{fk}
  User.disableRemoteMethodByName("prototype.__updateById__courseNames"); //disables PUT /users/{id}/courseNames/{fk}
  User.disableRemoteMethodByName("prototype.__destroyById__courseNames"); //disables DELETE /users/{id}/courseNames/{fk}
  User.disableRemoteMethodByName("prototype.__count__courseNames"); //disables GET /users/{id}/courseNames/count
  User.disableRemoteMethodByName("prototype.__exists__courseNames"); //disables HEAD /users/{id}/courseNames/rel/{fk}
  User.disableRemoteMethodByName("prototype.__link__courseNames"); //disable PUT /users/{id}/courseNames/rel/{fk}
  User.disableRemoteMethodByName("prototype.__unlink__courseNames"); //disable DELETE /users/{id}/courseNames/rel/{fk}
  User.disableRemoteMethodByName("prototype.__get__course_names"); //disables GET /users/{id}/course_names
  User.disableRemoteMethodByName("prototype.__create__course_names"); //disables POST /users/{id}/course_names
  User.disableRemoteMethodByName("prototype.__delete__course_names"); //disables DELETE /users/{id}/course_names
  User.disableRemoteMethodByName("prototype.__findById__course_names"); //disables GET /users/{id}/course_names/{fk}
  User.disableRemoteMethodByName("prototype.__updateById__course_names"); //disables PUT /users/{id}/course_names/{fk}
  User.disableRemoteMethodByName("prototype.__destroyById__course_names"); //disables DELETE /users/{id}/course_names/{fk}
  User.disableRemoteMethodByName("prototype.__count__course_names"); //disables GET /users/{id}/course_names/count
  User.disableRemoteMethodByName("prototype.__exists__course_names"); //disables HEAD /users/{id}/course_names/rel/{fk}
  User.disableRemoteMethodByName("prototype.__link__course_names"); //disable PUT /users/{id}/course_names/rel/{fk}
  User.disableRemoteMethodByName("prototype.__unlink__course_names"); //disable DELETE /users/{id}/course_names/rel/{fk}
};
