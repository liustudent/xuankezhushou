"use strict";
const app = require("../../server/server");
const { ObjectId } = require('mongodb');

module.exports = function (CourseName) {
  CourseName.getCourseSections = function (
    course_name_id,
    user_id,
    cb
  ) {
    if (!course_name_id || !user_id) {
      let errObj = new Error();
      errObj.name = "Empty field";
      errObj.message = "Empty field";
      errObj.status = 422;
      errObj.stack = ""
      return cb(errObj);
    }

    let userValidation = new Promise((resolve, reject) => {
      app.models.User.findOne(
        {
          where: {"ltx_userid": user_id}
        },
        function(err, userInstance){
          if(err || !userInstance){
            console.log(err, userInstance)
            let errObj = new Error();
            errObj.name = "Invalid user id";
            errObj.message = "Invalid user id";
            errObj.status = 410;
            errObj.stack = ""
            reject(errObj)
          }else{
            resolve(true)
          }
        }
      )
    })
    
    Promise.all([userValidation])
    .then(()=>{
      let result = [];
      new Promise((resolve, reject)=>{
        app.models.CrawlCourse.find(
          {
            where: {"courseName_id": ObjectId(course_name_id)}
          },
          function(err, courseInstance){
            if(err){
              console.log(err);
              reject(err);
            }else{
              if(courseInstance){
                new Promise((resolveIn, rejectIn)=>{
                  for(let i in courseInstance){
                    let course = courseInstance[i];
                    let temp = {
                      crawl_course_id: course['id'],
                      course_section: course['section'],
                      course_code: course['course_code'],
                      class_day: course['class_day'],
                      start_time: course['start_time'],
                      end_time: course['end_time'],
                      enrolled_precent: course['enrolled_percent'],
                      course_type: course['course_type'],
                    }
                    result.push(temp);
                    if(i == courseInstance.length-1){
                      resolveIn(true)
                    }
                  }
                })
                .then(()=>{
                  resolve(true)
                })
              }else{
                reject(err)
              }
            }
          }
        )
      })
      .then(()=>{
        return cb(null, result)
      })
      .catch((err)=>{
        return cb(err)
      })
    })
    .catch((errObj)=>{
      return cb(errObj)
    })
  };

  CourseName.remoteMethod("getCourseSections", {
    description:
      "6-4 获取课程所有分节, 该API用于6-4页面获取课程所有分节列表，请求需要包含“6-3获取课程名称列表”请求返回的course_name_id，返回值包含一个状态code和data。\ndata的格式为array of object, 其中包含多个学科名称，按照字符串中数字从小到大排序（请求返回值已完成排序）",
    http: { path: "/getCourseSections", verb: "post" },
    accepts: [
      {
        arg: "course_name_id",
        type: "string",
        required: true,
        description: "6-3获取课程名称列表”请求返回的id",
      },
      {
        arg: "user_id",
        type: "string",
        required: true,
        description: "用户ID",
      }
    ],
    returns: { arg: "result", type: "array" },
  });

  CourseName.getHistoryGrades = function (
    course_name_ids,
    prof_id,
    user_id,
    cb
  ) {
    if (!course_name_ids && !prof_id) {
      let errObj = new Error();
      errObj.name = "Empty field";
      errObj.message = "Empty field";
      errObj.status = 422;
      errObj.stack = ""
      return cb(errObj);
    }

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
            resolve(true)
          }
        }
      )
    })
    
    course_name_ids = JSON.parse(course_name_ids)
    Promise.all([userValidation])
    .then(()=>{
      let result = {
        query_grades_all : [],
        course_grades: []
      }
      new Promise((resolveOut, rejectOut) => {
        for(let i in course_name_ids){
          CourseName.findOne(
            {
              where: {'_id': ObjectId(course_name_ids[i])}
            },
            function(err, courseNameInstance){
              if(err){
                console.log(err)
                rejectOut(err)
              }else{
                if(courseNameInstance){
                  let temp = {
                    query_name : courseNameInstance['name'],
                    query_gpa_avg : courseNameInstance['gpa_avg_for_all'],
                  }
                  if(parseFloat(temp.query_gpa_avg)<2){
                    temp.query_difficulty = '5.0'
                  }else if(parseFloat(temp.query_gpa_avg)<2.7){
                    temp.query_difficulty = '4.0'
                  }else if(parseFloat(temp.query_gpa_avg)<3.3){
                    temp.query_difficulty = '3.0'
                  }else if(parseFloat(temp.query_gpa_avg)<3.7){
                    temp.query_difficulty = '2.0'
                  }else{
                    temp.query_difficulty = '1.0'
                  }
                  result.query_grades_all.push(temp);

                  // use courseName to find static_course_list
                  new Promise((resolveIn, rejectIn) => {
                    app.models.StaticCourse.find(
                      {
                        where: {
                          'courseName_id': ObjectId(courseNameInstance['id']),
                          'professor_id': ObjectId(prof_id)
                        }
                      },
                      function(err, courseInstance){
                        if(err){
                          console.log(err);
                          rejectIn(err)
                        }else{
                          if(courseInstance){
                            courseInstance.forEach(course => {
                              let inTemp = {
                                static_course_id: course['id'],
                                year_term: course['term'] +" "+ course['year'],
                                static_course_name: courseNameInstance['name'],
                                prof_id: course['professor_id'],
                                prof_name: course['professor_name'],
                                course_avg_gpa: course['gpa_avg'],
                              }
                              if(inTemp.course_avg_gpa<2){
                                inTemp.recommend_rate = 1.0
                              }else if(inTemp.course_avg_gpa<2.7){
                                inTemp.recommend_rate = 2.0
                              }else if(inTemp.course_avg_gpa<3.3){
                                inTemp.recommend_rate = 3.0
                              }else if(inTemp.course_avg_gpa<3.7){
                                inTemp.recommend_rate = 4.0
                              }else{
                                inTemp.recommend_rate = 5.0
                              }
                              result.course_grades.push(inTemp);
                            });
                            resolveIn(true)
                          }else{
                            rejectIn('Invalid static course.');
                          }
                        }
                      }
                    )
                  })
                  .then(()=>{
                    resolveOut(true)
                  })

                }else{
                  rejectOut('Invalid course name.');
                }
              }
            }
          )
        }
        
      })
      .then(()=>{
        return cb(null, result)
      })
    })
    .catch((errObj) => {
      return cb(errObj)
    })
    
    
  };

  CourseName.remoteMethod("getHistoryGrades", {
    description:
      "6-13 查询成绩分布 , 该API用于6-13页面“立即查询“按钮，返回参数显示在6-14页面。\n\n学科和课号“回显”dept_name + static_course_name。",
    http: { path: "/getHistoryGrades", verb: "post" },
    accepts: [
      {
        arg: "course_name_ids",
        type: "string",
        required: true,
        description: "array of 课程ID",
      },
      {
        arg: "prof_id",
        type: "string",
        required: true,
        description: "教授ID",
      },
      {
        arg: "user_id",
        type: "string",
        required: true,
        description: "用户ID",
      }
    ],
    returns: { arg: "result", type: "object" },
  });
  CourseName.disableRemoteMethodByName("upsert"); // disables PATCH /course_names
  CourseName.disableRemoteMethodByName("find"); // disables GET /course_names
  CourseName.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /course_names
  CourseName.disableRemoteMethodByName("create"); // disables POST /course_names
  CourseName.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /course_names/{id}
  CourseName.disableRemoteMethodByName("findById"); // disables GET /course_names/{id}
  CourseName.disableRemoteMethodByName("exists"); // disables HEAD /course_names/{id}
  CourseName.disableRemoteMethodByName("replaceById"); // disables PUT /course_names/{id}
  CourseName.disableRemoteMethodByName("deleteById"); // disables DELETE /course_names/{id}
  CourseName.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /course_names/change-stream
  CourseName.disableRemoteMethodByName("count"); // disables GET /course_names/count
  CourseName.disableRemoteMethodByName("findOne"); // disables GET /course_names/findOne
  CourseName.disableRemoteMethodByName("update"); // disables POST /course_names/update
  CourseName.disableRemoteMethodByName("upsertWithWhere"); // disables POST /course_names/upsertWithWhere
  CourseName.disableRemoteMethodByName("prototype.__get__crawl_courses"); //disables GET /course_names/{id}/crawl_courses
  CourseName.disableRemoteMethodByName("prototype.__create__crawl_courses"); //disables POST /course_names/{id}/crawl_courses
  CourseName.disableRemoteMethodByName("prototype.__delete__crawl_courses"); //disables DELETE /course_names/{id}/crawl_courses
  CourseName.disableRemoteMethodByName("prototype.__findById__crawl_courses"); //disables GET /course_names/{id}/crawl_courses/{fk}
  CourseName.disableRemoteMethodByName("prototype.__updateById__crawl_courses"); //disables PUT /course_names/{id}/crawl_courses/{fk}
  CourseName.disableRemoteMethodByName(
    "prototype.__destroyById__crawl_courses"
  ); //disables DELETE /course_names/{id}/crawl_courses/{fk}
  CourseName.disableRemoteMethodByName("prototype.__count__crawl_courses"); //disables GET /course_names/{id}/crawl_courses/count
  CourseName.disableRemoteMethodByName("prototype.__get__professors"); //disables GET /course_names/{id}/professors
  CourseName.disableRemoteMethodByName("prototype.__create__professors"); //disables POST /course_names/{id}/professors
  CourseName.disableRemoteMethodByName("prototype.__delete__professors"); //disables DELETE /course_names/{id}/professors
  CourseName.disableRemoteMethodByName("prototype.__findById__professors"); //disables GET /course_names/{id}/professors/{fk}
  CourseName.disableRemoteMethodByName("prototype.__updateById__professors"); //disables PUT /course_names/{id}/professors/{fk}
  CourseName.disableRemoteMethodByName("prototype.__destroyById__professors"); //disables DELETE /course_names/{id}/professors/{fk}
  CourseName.disableRemoteMethodByName("prototype.__count__professors"); //disables GET /course_names/{id}/professors/count
  CourseName.disableRemoteMethodByName("prototype.__exists__professors"); //disables HEAD /course_names/{id}/professors/rel/{fk}
  CourseName.disableRemoteMethodByName("prototype.__link__professors"); //disable PUT /course_names/{id}/professors/rel/{fk}
  CourseName.disableRemoteMethodByName("prototype.__unlink__professors"); //disable DELETE /course_names/{id}/professors/rel/{fk}
  CourseName.disableRemoteMethodByName("prototype.__get__static_courses"); //disables GET /course_names/{id}/static_courses
  CourseName.disableRemoteMethodByName("prototype.__create__static_courses"); //disables POST /course_names/{id}/static_courses
  CourseName.disableRemoteMethodByName("prototype.__delete__static_courses"); //disables DELETE /course_names/{id}/static_courses
  CourseName.disableRemoteMethodByName("prototype.__findById__static_courses"); //disables GET /course_names/{id}/static_courses/{fk}
  CourseName.disableRemoteMethodByName(
    "prototype.__updateById__static_courses"
  ); //disables PUT /course_names/{id}/static_courses/{fk}
  CourseName.disableRemoteMethodByName(
    "prototype.__destroyById__static_courses"
  ); //disables DELETE /course_names/{id}/static_courses/{fk}
  CourseName.disableRemoteMethodByName("prototype.__count__static_courses"); //disables GET /course_names/{id}/static_courses/count
  CourseName.disableRemoteMethodByName("prototype.__get__users"); //disables GET /course_names/{id}/users
  CourseName.disableRemoteMethodByName("prototype.__create__users"); //disables POST /course_names/{id}/users
  CourseName.disableRemoteMethodByName("prototype.__delete__users"); //disables DELETE /course_names/{id}/users
  CourseName.disableRemoteMethodByName("prototype.__findById__users"); //disables GET /course_names/{id}/users/{fk}
  CourseName.disableRemoteMethodByName("prototype.__updateById__users"); //disables PUT /course_names/{id}/users/{fk}
  CourseName.disableRemoteMethodByName("prototype.__destroyById__users"); //disables DELETE /course_names/{id}/users/{fk}
  CourseName.disableRemoteMethodByName("prototype.__count__users"); //disables GET /course_names/{id}/users/count
  CourseName.disableRemoteMethodByName("prototype.__exists__users"); //disables HEAD /course_names/{id}/users/rel/{fk}
  CourseName.disableRemoteMethodByName("prototype.__link__users"); //disable PUT /course_names/{id}/users/rel/{fk}
  CourseName.disableRemoteMethodByName("prototype.__unlink__users"); //disable DELETE /course_names/{id}/users/rel/{fk}
};
