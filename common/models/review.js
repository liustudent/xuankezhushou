"use strict";
const app = require("../../server/server");
const { filter } = require("compression");
const { ObjectId } = require('mongodb');

module.exports = function (Review) {
  Review.thumbsDown = function (review_id, user_id, cb) {
    if (!review_id && !user_id) {
      let errObj = new Error();
      errObj.name = "Empty field";
      errObj.message = "Empty field";
      errObj.status = 422;
      errObj.stack = ""
      return cb(errObj);
    }

    let real_user_id;
    let userValidation = new Promise((resolve, reject) => {
      app.models.User.findOne(
        {
          where: {"ltx_userid": user_id}
        },
        function(err, userInstance){
          if(err || !userInstance){
            let errObj = new Error();
            errObj.name = "Invalid user id";
            errObj.message = "Invalid user id";
            errObj.status = 410;
            errObj.stack = ""
            reject(errObj)
          }else{
            real_user_id = userInstance.id;
            resolve(true)
          }
        }
      )
    })

    Promise.all([userValidation])
    .then(()=>{
      Review.findById(
        ObjectId(review_id),
        function(err, reviewInstance){
          if(err){
            return cb(err)
          }else{
            if(reviewInstance){
              if(!reviewInstance.thumbed.includes(real_user_id.toString())){
                reviewInstance.thumbs_down = reviewInstance.thumbs_down+1;
                reviewInstance.thumbed.push(real_user_id.toString())
              }
              reviewInstance.save()
              return cb(null, "success")
            }
          }
        }
      )
    })
    .catch((errObj) => {
      return cb(errObj)
    })
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
      }
    ],
    returns: { arg: "result", type: "string" },
  });


  Review.report = function (review_id, user_id, cb) {
    if (!review_id && !user_id) {
      let errObj = new Error();
      errObj.name = "Empty field";
      errObj.message = "Empty field";
      errObj.status = 422;
      errObj.stack = ""
      return cb(errObj);
    }

    let real_user_id;
    let userValidation = new Promise((resolve, reject) => {
      app.models.User.findOne(
        {
          where: {"ltx_userid": user_id}
        },
        function(err, userInstance){
          if(err || !userInstance){
            let errObj = new Error();
            errObj.name = "Invalid user id";
            errObj.message = "Invalid user id";
            errObj.status = 410;
            errObj.stack = ""
            reject(errObj)
          }else{
            real_user_id = userInstance.id;
            resolve(true)
          }
        }
      )
    })

    Promise.all([userValidation])
    .then(()=>{
      Review.findById(
        ObjectId(review_id),
        function(err, reviewInstance){
          if(err){
            return cb(err)
          }else{
            if(reviewInstance){
              reviewInstance.reported = true;
              reviewInstance.save()
              return cb(null, "success")
            }
          }
        }
      )
    })
    .catch((errObj) => {
      return cb(errObj)
    })
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
      }
    ],
    returns: { arg: "result", type: "string" },
  });

  Review.thumbsUp = function (review_id, user_id, cb) {
    if (!review_id && !user_id) {
      let errObj = new Error();
      errObj.name = "Empty field";
      errObj.message = "Empty field";
      errObj.status = 422;
      errObj.stack = ""
      return cb(errObj);
    }

    let real_user_id;
    let userValidation = new Promise((resolve, reject) => {
      app.models.User.findOne(
        {
          where: {"ltx_userid": user_id}
        },
        function(err, userInstance){
          if(err || !userInstance){
            let errObj = new Error();
            errObj.name = "Invalid user id";
            errObj.message = "Invalid user id";
            errObj.status = 410;
            errObj.stack = ""
            reject(errObj)
          }else{
            real_user_id = userInstance.id;
            resolve(true)
          }
        }
      )
    })

    Promise.all([userValidation])
    .then(()=>{
      Review.findById(
        ObjectId(review_id),
        function(err, reviewInstance){
          if(err){
            return cb(err)
          }else{
            if(reviewInstance){
              if(!reviewInstance.thumbed.includes(real_user_id.toString())){
                reviewInstance.thumbs_up = reviewInstance.thumbs_up+1;
                reviewInstance.thumbed.push(real_user_id.toString())
              }
              reviewInstance.save()
              return cb(null, "success")
            }
          }
        }
      )
    })
    .catch((errObj) => {
      return cb(errObj)
    })
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
      }
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
    if (!coursename_id && !prof_id && !user_id && !course_difficulty && !course_reco && !prof_difficulty && !prof_reco) {
      let errObj = new Error();
      errObj.name = "Empty field";
      errObj.message = "Empty field";
      errObj.status = 422;
      errObj.stack = ""
      return cb(errObj);
    }
    
    if(chosen_labels) chosen_labels = JSON.parse(chosen_labels);

    let real_user_id;
    let userValidation = new Promise((resolve, reject) => {
      app.models.User.findOne(
        {
          where: {"ltx_userid": user_id}
        },
        function(err, userInstance){
          if(err || !userInstance){
            let errObj = new Error();
            errObj.name = "Invalid user id";
            errObj.message = "Invalid user id";
            errObj.status = 410;
            errObj.stack = ""
            reject(errObj)
          }else{
            real_user_id = userInstance.id;
            resolve(true)
          }
        }
      )
    })

    Promise.all([userValidation])
    .then(()=>{
      let reviewData = {
        user_id: ObjectId(real_user_id),
        coursename_id: ObjectId(coursename_id),
        prof_id: ObjectId(prof_id),
        is_online: is_online,
        course_difficulty: course_difficulty,
        course_recommend: course_reco,
        prof_difficulty: prof_difficulty,
        prof_recommend: prof_reco,
        content: review,
        is_attendance: is_attendance,
        grade_received: grade_received,
        chosen_labels: chosen_labels,
      }

      Review.findOrCreate(
        {where: reviewData},
        reviewData
      )
      .then(()=>{
        return cb(null, "success")
      })

    })
    .catch((errObj)=>{
      return cb(errObj)
    })
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
        type: "string",
        required: false,
        description: "已选择的标签",
      }
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
