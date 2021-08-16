"use strict";

module.exports = function (Review) {
  Review.thumbsDown = function (review_id, user_id, error_test, cb) {
    if (error_test) {
      let errObj = new Error();
      if (error_test == 1) {
        errObj.name = "Invalid user";
        errObj.message = "Invalid user";
        errObj.status = 410;
        return cb(errObj);
      } else if (error_test == 2) {
        errObj.name = "Invalid review";
        errObj.message = "Invalid review";
        errObj.status = 417;
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
  }

  Review.remoteMethod("thumbsDown", {
    description: "评论点踩",
    http: { path: "/thumbsDown", verb: "post" },
    accepts: [
      {
        arg: "review_id",
        type: "string",
        required: true,
        description: "评论ID",
      },
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
    returns: { arg: "result", type: "string" },
  });


  Review.report = function (review_id, user_id, error_test, cb) {
    if (error_test) {
      let errObj = new Error();
      if (error_test == 1) {
        errObj.name = "Invalid user";
        errObj.message = "Invalid user";
        errObj.status = 410;
        return cb(errObj);
      } else if (error_test == 2) {
        errObj.name = "Invalid review";
        errObj.message = "Invalid review";
        errObj.status = 417;
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

  Review.remoteMethod("report", {
    description: "评论举报",
    http: { path: "/report", verb: "post" },
    accepts: [
      {
        arg: "review_id",
        type: "string",
        required: true,
        description: "评论ID",
      },
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
    returns: { arg: "result", type: "string" },
  });

  Review.thumbsUp = function (review_id, user_id, error_test, cb) {
    if (error_test) {
      let errObj = new Error();
      if (error_test == 1) {
        errObj.name = "Invalid user";
        errObj.message = "Invalid user";
        errObj.status = 410;
        return cb(errObj);
      } else if (error_test == 2) {
        errObj.name = "Invalid review";
        errObj.message = "Invalid review";
        errObj.status = 417;
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

  Review.remoteMethod("thumbsUp", {
    description: "评论点赞",
    http: { path: "/thumbsUp", verb: "post" },
    accepts: [
      {
        arg: "review_id",
        type: "string",
        required: true,
        description: "评论ID",
      },
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
    returns: { arg: "result", type: "string" },
  });

  Review.rateCourse = function (
    user_id,
    coursename_id,
    prof_id,
    is_online,
    course_difficulty,
    course_reco,
    prof_difficulty,
    prof_reco,
    review,
    is_attendance,
    grade_received,
    chosen_labels,
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
      } 
      else if (error_test == 2) {
        errObj.name = "Invalid course name";
        errObj.message = "Invalid course name";
        errObj.status = 413;
        return cb(errObj);
      } 
      else if (error_test == 3) {
        errObj.name = "Invalid professor";
        errObj.message = "Invalid professor";
        errObj.status = 415;
        return cb(errObj);
      } 
      else {
        errObj.name = "Invalid error test";
        errObj.message = "Invalid error test";
        errObj.status = 499;
        return cb(errObj);
      }
    }
    let template = "success";
    return cb(null, template);
  };

  Review.remoteMethod("rateCourse", {
    description: "评论点赞",
    http: { path: "/rateCourse", verb: "post" },
    accepts: [
      {
        arg: "user_id",
        type: "string",
        required: true,
        description: "用户ID",
      },
      {
        arg: "coursename_id",
        type: "string",
        required: true,
        description: "课程名称ID",
      },
      {
        arg: "prof_id",
        type: "string",
        required: true,
        description: "教授ID",
      },
      {
        arg: "is_online",
        type: "boolean",
        required: false,
        description: "是否为在线课程",
      },
      {
        arg: "course_difficulty",
        type: "number",
        required: true,
        description: "课程难度",
      },
      {
        arg: "course_reco",
        type: "number",
        required: true,
        description: "课程推荐指数",
      },
      {
        arg: "prof_difficulty",
        type: "number",
        required: true,
        description: "教授难度",
      },
      {
        arg: "prof_reco",
        type: "number",
        required: true,
        description: "教授推荐指数",
      },
      {
        arg: "review",
        type: "string",
        required: true,
        description: "评价",
      },
      {
        arg: "is_attendance",
        type: "boolean",
        required: false,
        description: "是否必须签到",
      },
      {
        arg: "grade_received",
        type: "string",
        required: false,
        description: "得到成绩",
      },
      {
        arg: "chosen_labels",
        type: "array",
        required: false,
        description: "已选择的标签",
      },
      {
        arg: "error_test",
        type: "number",
        required: false,
      },
    ],
    returns: { arg: "result", type: "string" },
  });

  Review.disableRemoteMethodByName("upsert"); // disables PATCH /reviews
  Review.disableRemoteMethodByName("find"); // disables GET /reviews
  Review.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /reviews
  Review.disableRemoteMethodByName("create"); // disables POST /reviews
  Review.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /reviews/{id}
  Review.disableRemoteMethodByName("findById"); // disables GET /reviews/{id}
  Review.disableRemoteMethodByName("exists"); // disables HEAD /reviews/{id}
  Review.disableRemoteMethodByName("replaceById"); // disables PUT /reviews/{id}
  Review.disableRemoteMethodByName("deleteById"); // disables DELETE /reviews/{id}
  Review.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /reviews/change-stream
  Review.disableRemoteMethodByName("count"); // disables GET /reviews/count
  Review.disableRemoteMethodByName("findOne"); // disables GET /reviews/findOne
  Review.disableRemoteMethodByName("update"); // disables POST /reviews/update
  Review.disableRemoteMethodByName("upsertWithWhere"); // disables POST /reviews/upsertWithWhere
  Review.disableRemoteMethodByName("prototype.__get__course_name"); //disables GET /reviews/{id}/course_name
  Review.disableRemoteMethodByName("prototype.__get__professor"); //disables GET /reviews/{id}/professor
};
