"use strict";
const app = require("../../server/server");
const { ObjectId } = require('mongodb');
const { all } = require("../../server/server");
module.exports = function (StaticCourse) {
  StaticCourse.getCourseDetails = function (
    static_course_id,
    user_id,
    cb
  ) {
    if (!user_id||!static_course_id) {
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
    // console.log(static_course_id)
    // StaticCourse.findById("6198836e7770a4ec686972e5", function(err, test){
    //   console.log(test)
    // })


    Promise.all([userValidation])
    .then(()=>{
      let result = {static_course_id: static_course_id}
      // fetch grades
      let gradesPromise = new Promise((resolve, reject)=>{
        StaticCourse.findById(
          static_course_id,
          function(err, courseInstance){
            if(err){
              reject(err);
            }else{
              if(courseInstance){
                // console.log(courseInstance)
                result.coursename_id = courseInstance.courseName_id;
                result.description = courseInstance.description;
                result.prof_id = courseInstance.professor_id;
                result.professor_name = courseInstance.professor_name;
                result.course_name = courseInstance.course_name;
                result.class_day = courseInstance.class_day;
                result.start_time = courseInstance.start_time;
                result.end_time = courseInstance.end_time;
                result.place = courseInstance.place;
                result.course_num = courseInstance.course_number;
                result.capacity = courseInstance.capacity;
                // fetch all grades on this course name
                new Promise((resolve1, reject1)=>{
                  app.models.Grade.find(
                    {
                      where: {"courseName_id": courseInstance.courseName_id}
                    },
                    function(err, gradeListInstance){
                      if(err){
                        reject1(err)
                      }else{
                        if(gradeListInstance){
                          new Promise((resolve2, reject2)=>{
                            let all_grades = {
                              gpa_avg: 0,
                              grade_a_count: 0,
                              grade_b_count: 0,
                              grade_c_count: 0,
                              grade_d_count: 0,
                              grade_f_count: 0,
                              grade_p_count: 0,
                              grade_np_count: 0
                            }
                            for(let i in gradeListInstance){
                              let gradeInstance = gradeListInstance[i];
                              all_grades.gpa_avg += gradeInstance.gpa_avg;
                              all_grades.grade_a_count += gradeInstance.grade_a_count;
                              all_grades.grade_b_count += gradeInstance.grade_b_count;
                              all_grades.grade_c_count += gradeInstance.grade_c_count;
                              all_grades.grade_d_count += gradeInstance.grade_d_count;
                              all_grades.grade_f_count += gradeInstance.grade_f_count;
                              all_grades.grade_p_count += gradeInstance.grade_p_count;
                              all_grades.grade_np_count += gradeInstance.grade_np_count;
                              if (gradeInstance.professor_id.toString() == result.prof_id.toString()){
                                let course_grades = gradeInstance;
                                result.course_grades = course_grades;
                              }
                              if (i==gradeListInstance.length-1){
                                all_grades.gpa_avg = (all_grades.gpa_avg/gradeListInstance.length).toFixed(2);
                                all_grades.grade_a_count = (all_grades.grade_a_count/gradeListInstance.length).toFixed(0);
                                all_grades.grade_b_count = (all_grades.grade_b_count/gradeListInstance.length).toFixed(0);
                                all_grades.grade_c_count = (all_grades.grade_c_count/gradeListInstance.length).toFixed(0);
                                all_grades.grade_d_count = (all_grades.grade_d_count/gradeListInstance.length).toFixed(0);
                                all_grades.grade_f_count = (all_grades.grade_f_count/gradeListInstance.length).toFixed(0);
                                all_grades.grade_p_count = (all_grades.grade_p_count/gradeListInstance.length).toFixed(0);
                                all_grades.grade_np_count = (all_grades.grade_np_count/gradeListInstance.length).toFixed(0);
                                result.all_grades = all_grades;
                                resolve2(true)
                              }
                            }
                          })
                          .then(()=>{
                            resolve1(true)
                          })
                          .catch((err)=>{
                            return cb(err)
                          })
                        }else{
                          reject1("NOT FOUND")
                        }
                      }
                    }
                  )
                })
                .then(()=>{
                  resolve(true)
                })
                .catch((err)=>{
                  return cb(err)
                })
              }else{
                reject("NOT FOUND!")
              }
            }
          }
        )
      })

      // fetch reviews
      let reviewsPromise = new Promise((resolve3, reject3)=>{
        let reviews = []
        app.models.Review.find(
          {
            where:{"coursename_id": result.coursename_id, "prof_id":result.prof_id}
          },
          function(err, reviewListInstance){
            if(err){
              reject3(err);
            }else{
              if(reviewListInstance){
                new Promise((resolve4, reject4)=>{
                  for(let j in reviewListInstance){
                    let reviewInstance = reviewListInstance[j];
                    let temp = {
                      review_id: reviewInstance['id'],
                      created: reviewInstance['created'],
                      attendance: reviewInstance['is_attendance'] ? "Mandatary" : "Not Mandatary",
                      is_online: reviewInstance['is_online'] ? "Yes" : "No",
                      grade_received: reviewInstance['grade_received'],
                      selected_labels: reviewInstance['chosen_labels'],
                      recomend_rate: reviewInstance['prof_recommend'],
                      difficulty_rate: Math.floor((reviewInstance['prof_difficulty']+reviewInstance['course_difficulty'])/2),
                      content: reviewInstance['content'],
                      thumbs_up: reviewInstance['thumbs_up'],
                      thumbs_down: reviewInstance['thumbs_down'],  
                    }
                    reviews.push(temp);
                    if(j == reviewListInstance.length-1){
                      resolve4(true)
                    }
                  }
                })
                .then(()=>{
                  result.reviews = reviews;
                  resolve3(true)
                })
                .catch((err)=>{
                  return cb(err)
                })
              }else{
                reject3("NOT FOUND!")
              }
            }
          }
        )
      })

      Promise.all([gradesPromise, reviewsPromise])
      .then(()=>{
        // console.log(result)
        return cb(null, result);
      })
      .catch((err)=>{
        return cb(err)
      })
      
    })
    .catch((errObj)=>{
      return cb(errObj)
    })
  };

  StaticCourse.remoteMethod("getCourseDetails", {
    description: "6-14-1 获取静态课程详情",
    http: { path: "/getCourseDetails", verb: "post" },
    accepts: [
      {
        arg: "static_course_id",
        type: "string",
        required: true,
        description: "静态课程ID",
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

  StaticCourse.disableRemoteMethodByName("upsert"); // disables PATCH /static_courses
  StaticCourse.disableRemoteMethodByName("find"); // disables GET /static_courses
  StaticCourse.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /static_courses
  StaticCourse.disableRemoteMethodByName("create"); // disables POST /static_courses
  StaticCourse.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /static_courses/{id}
  StaticCourse.disableRemoteMethodByName("findById"); // disables GET /static_courses/{id}
  StaticCourse.disableRemoteMethodByName("exists"); // disables HEAD /static_courses/{id}
  StaticCourse.disableRemoteMethodByName("replaceById"); // disables PUT /static_courses/{id}
  StaticCourse.disableRemoteMethodByName("deleteById"); // disables DELETE /static_courses/{id}
  StaticCourse.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /static_courses/change-stream
  StaticCourse.disableRemoteMethodByName("count"); // disables GET /static_courses/count
  StaticCourse.disableRemoteMethodByName("findOne"); // disables GET /static_courses/findOne
  StaticCourse.disableRemoteMethodByName("update"); // disables POST /static_courses/update
  StaticCourse.disableRemoteMethodByName("upsertWithWhere"); // disables POST /static_courses/upsertWithWhere
  StaticCourse.disableRemoteMethodByName("prototype.__get__course_name"); //disables GET /static_courses/{id}/course_name
  StaticCourse.disableRemoteMethodByName("prototype.__get__professor"); //disables GET /static_courses/{id}/professor
  StaticCourse.disableRemoteMethodByName("prototype.__get__year_term"); //disables GET /static_courses/{id}/year_term
};
