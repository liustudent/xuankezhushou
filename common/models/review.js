"use strict";

module.exports = function (Review) {
  Review.thumbsDown = function (review_id, user_id, cb) {
    if (review_id == "1") {
      let errObj = new Error();
      errObj.name = "School Not Exist";
      errObj.message = "School Not Exist";
      errObj.status = 404;
      return cb(errObj);
    }
    if (user_id == "1") {
      let errObj = new Error();
      errObj.name = "Invalid User";
      errObj.message = "Invalid User";
      errObj.status = 405;
      return cb(errObj);
    }
    let template = "success";
    return cb(null, template);
  };

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
    ],
    returns: { arg: "result", type: "string" },
  });

  Review.report = function (review_id, user_id, cb) {
    if (review_id == "1") {
      let errObj = new Error();
      errObj.name = "School Not Exist";
      errObj.message = "School Not Exist";
      errObj.status = 404;
      return cb(errObj);
    }
    if (user_id == "1") {
      let errObj = new Error();
      errObj.name = "Invalid User";
      errObj.message = "Invalid User";
      errObj.status = 405;
      return cb(errObj);
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
    ],
    returns: { arg: "result", type: "string" },
  });

  Review.thumbsUp = function (review_id, user_id, cb) {
    if (review_id == "1") {
      let errObj = new Error();
      errObj.name = "School Not Exist";
      errObj.message = "School Not Exist";
      errObj.status = 404;
      return cb(errObj);
    }
    if (user_id == "1") {
      let errObj = new Error();
      errObj.name = "Invalid User";
      errObj.message = "Invalid User";
      errObj.status = 405;
      return cb(errObj);
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
    cb
  ) {
    if (user_id == "1") {
      let errObj = new Error();
      errObj.name = "Invalid User";
      errObj.message = "Invalid User";
      errObj.status = 404;
      return cb(errObj);
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
