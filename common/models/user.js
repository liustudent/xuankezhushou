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
      // Role.findById(util.roles[roleName], function (err, role) {
      //   if (err) return next(err);
      //   if (role) {
      //     role.principals.create(
      //       {
      //         principalType: RoleMapping.USER,
      //         principalId: ctx.instance.id,
      //       },
      //       function (err, principal) {
      //         if (err) return next(err);
      //         console.log("Created principal:", principal);
      //         return next();
      //       }
      //     );
      //   } else return next(new Error("Role not found"));
      // });
    } else next();
  });
  User.getWatchList = function (user_id, error_test, cb) {
    if (error_test) {
      let errObj = new Error();
      if (error_test == 1) {
        errObj.name = "Invalid user";
        errObj.message = "Invalid user";
        errObj.status = 410;
        return cb(errObj);
      } else if (error_test == 2) {
        errObj.name = "Empty list but maybe have some";
        errObj.message = "Empty list but maybe have some";
        errObj.status = 421;
        return cb(errObj);
      } else {
        errObj.name = "Invalid error test";
        errObj.message = "Invalid error test";
        errObj.status = 499;
        return cb(errObj);
      }
    }
    let template = [
      {
        course_id: "1",
        course_name: "ECON 100A",
        course_section: "A",
        course_code: "20012",
        class_day: ["Tu", "Th"],
        start_time: "9:30",
        end_time: "10:50",
        status: "FULL",
      },
      {
        course_id: "2",
        course_name: "ECON 100A",
        course_section: "1",
        course_code: "20013",
        class_day: ["Tu", "Th"],
        start_time: "9:30",
        end_time: "10:50",
        status: "OPEN",
      },
    ];
    return cb(null, template);
  };

  User.remoteMethod("getWatchList", {
    description:
      "6-1 获取提醒列表, 该API用于6-1页面获取空位提醒列表，返回值包含一个状态code和data。\ndata的格式为array of object, 其中包含多节追踪课程，不需排序。",
    http: { path: "/getWatchList", verb: "post" },
    accepts: [
      {
        arg: "user_id",
        type: "string",
        required: true,
        description: "用户ID",
      },
      {
        arg: "error_test",
        type: "number",
        required: false,
      },
    ],
    returns: { arg: "result", type: "array" },
  });

  User.addToWatchList = function (user_id, crawl_course_id, error_test, cb) {
    if (error_test) {
      let errObj = new Error();
      if (error_test == 1) {
        errObj.name = "Invalid user";
        errObj.message = "Invalid user";
        errObj.status = 410;
        return cb(errObj);
      } else if (error_test == 2) {
        errObj.name = "Invalid crawl course";
        errObj.message = "Invalid user";
        errObj.status = 414;
        return cb(errObj);
      } else {
        errObj.name = "Invalid error test";
        errObj.message = "Invalid error test";
        errObj.status = 499;
        return cb(errObj);
      }
    }
    let template = "success";
    return cb(null, template);
  };

  User.remoteMethod("addToWatchList", {
    description:
      "6-4/6-6添加课程到提醒列表, 该API用于6-4/6-6页面，用于添加课程到提醒列表，请求需要包含“6-4获取课程所有分节”请求返回的crawl_course_id和留同学App给用户定义的ltx_userid，返回值包含一个状态code和result。",
    http: { path: "/addToWatchList", verb: "post" },
    accepts: [
      {
        arg: "user_id",
        type: "string",
        required: true,
        description: "用户ID",
      },
      {
        arg: "crawl_course_id",
        type: "string",
        required: true,
        description: "爬取课程编号",
      },
      {
        arg: "error_test",
        type: "number",
        required: false,
      },
    ],
    returns: { arg: "result", type: "string" },
  });

  User.removeFromWatchList = function (
    user_id,
    crawl_course_id,
    error_test,
    cb
  ) {
    if (error_test) {
      let errObj = new Error();
      if (error_test == 1) {
        errObj.name = "Invalid user";
        errObj.message = "Invalid user";
        errObj.status = 410;
        return cb(errObj);
      } else if (error_test == 2) {
        errObj.name = "Invalid crawl course";
        errObj.message = "Invalid crawl course";
        errObj.status = 414;
        return cb(errObj);
      } else {
        errObj.name = "Invalid error test";
        errObj.message = "Invalid error test";
        errObj.status = 499;
        return cb(errObj);
      }
    }

    let template = "success";
    return cb(null, template);
  };

  User.remoteMethod("removeFromWatchList", {
    description:
      "6-4/6-7 从提醒列表移出课程, 该API用于6-4/6-7页面，用于移出课程从提醒列表，请求需要包含“6-4/6-6获取课程所有分节”请求返回的crawl_course_id和留同学App给用户定义的ltx_userid，返回值包含一个状态code和result。",
    http: { path: "/removeFromWatchList", verb: "post" },
    accepts: [
      {
        arg: "user_id",
        type: "string",
        required: true,
        description: "用户ID",
      },
      {
        arg: "crawl_course_id",
        type: "string",
        required: true,
        description: "爬取课程编号",
      },
      {
        arg: "error_test",
        type: "number",
        required: false,
      },
    ],
    returns: { arg: "result", type: "string" },
  });

  User.bindLtxId = function (
    user_id,
    ltx_school_id,
    cb
  ) {
    if (!user_id){
      let errObj = new Error();
      errObj.name = "Invalid user";
      errObj.message = "Invalid user";
      errObj.status = 410;
      return cb(errObj);
    }
    if (!ltx_school_id){
      let errObj = new Error();
      errObj.name = "Invalid school id";
      errObj.message = "Invalid school id";
      errObj.status = 411;
      return cb(errObj);
    }

    User.findOne(
      {
        where: {"ltx_userid": user_id},
      }, 
      function (err, userInstance){
        if (err){
          console.log(err);
          return cb(err);
        }else{
          if (userInstance){
            // 学校变更
            userInstance['school_id'] = ltx_school_id.toString();
            userInstance.save();
            return cb(null, "school_change_success");
          }else{
            // 初次绑定学校
            let data = {}
            data['ltx_userid'] = user_id.toString();
            data['school_id'] = ltx_school_id.toString();
            data['password'] = user_id.toString();
            data['email'] = `${user_id}@turingedtech.com`;
            User.create(data, function(err, userInstance){
              if(err){
                console.log(err)
                return cb(err);
              }else{
                return cb(null, "success");
              }
            })
            return cb(null, "success");
          }
        }
      })
      

    // if (error_test) {
    //   let errObj = new Error();
    //   if (error_test == 1) {
    //     errObj.name = "Invalid user";
    //     errObj.message = "Invalid user";
    //     errObj.status = 410;
    //     return cb(errObj);
    //   } else if (error_test == 2) {
    //     errObj.name = "Invalid school id";
    //     errObj.message = "Invalid school id";
    //     errObj.status = 411;
    //     return cb(errObj);
    //   } else {
    //     errObj.name = "Invalid error test";
    //     errObj.message = "Invalid error test";
    //     errObj.status = 499;
    //     return cb(errObj);
    //   }
    // }
  };

  User.remoteMethod("bindLtxId", {
    description:
      "该API在用户于留同学App中成功绑定学校时使用，需要留同学用户ID和学校ID作为参数，返回结果显示success或者error。",
    http: { path: "/bindLtxId", verb: "post" },
    accepts: [
      {
        arg: "user_id",
        type: "string",
        required: true,
        description: "用户ID",
      },
      {
        arg: "ltx_school_id",
        type: "string",
        required: true,
        description: "留同学App学校ID",
      },
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
