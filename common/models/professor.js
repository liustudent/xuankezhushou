"use strict";
const { ObjectId } = require('mongodb');
const app = require("../../server/server");

module.exports = function (Professor) {
  Professor.searchCourseByProf = function (
    ltx_school_id,
    prof_id,
    user_id,
    cb
  ) {
    if (!ltx_school_id || !prof_id || !user_id) {
      let errObj = new Error();
      errObj.name = "Empty field";
      errObj.message = "Empty field";
      errObj.status = 422;
      errObj.stack = ""
      return cb(errObj);
    }

    let schoolId;
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
    let schoolValidation = new Promise((resolve, reject) => {
      app.models.School.findOne(
        {
          where: {"ltx_school_id": ltx_school_id}
        },
        function(err, schoolInstance){
          if(err || !schoolInstance){
            let errObj = new Error();
            errObj.name = "Invalid school id";
            errObj.message = "Invalid school id";
            errObj.status = 410;
            errObj.stack = ""
            reject(errObj)
          }else{
            schoolId = schoolInstance.id;
            resolve(true)
          }
        }
      )
    })

    Promise.all([userValidation, schoolValidation])
    .then(()=>{
      let tempCourseNameIds = new Set();
      
      new Promise((resolveOut, rejectOut)=>{
        app.models.Proflink.find(
          {
            where: {'school_id': ObjectId(schoolId), 'prof_id':ObjectId(prof_id)}
          },
          function(err, courseInstance){
            if(err){
              rejectOut(err);
            }else{
              if(courseInstance){
                courseInstance.forEach(course => {
                  tempCourseNameIds.add(course.courseName_id.toString())
                });
                resolveOut(true);
              }
            }
          }
        )
      })
      .then(()=>{
        let result = []
        tempCourseNameIds = Array.from(tempCourseNameIds)
        console.log(tempCourseNameIds)
        new Promise((resolveIn, rejectIn)=> {
          app.models.CourseName.find(
            {
              where: {id:{inq: tempCourseNameIds}}
            },
            function(err, courseNameInstance){
              if(err){
                rejectIn(err)
              }else{
                if(courseNameInstance){
                  console.log(courseNameInstance)
                  courseNameInstance.forEach(cni => {
                    let temp = {
                      course_id: cni.id,
                      course_name_with_num: cni.name
                    }
                    result.push(temp)
                  });
                  resolveIn(true)
                }
              }
            }
          )
        })
        .then(()=>{
          return cb(null, result)
        })    
      })
    })
    .catch((errObj)=>{
      return cb(errObj)
    })
  };

  Professor.remoteMethod("searchCourseByProf", {
    description: "6-17 选择课程",
    http: { path: "/searchCourseByProf", verb: "post" },
    accepts: [
      {
        arg: "ltx_school_id",
        type: "string",
        required: true,
        description: "留同学App定义的学校ID",
      },
      {
        arg: "prof_id",
        type: "string",
        required: true,
        description: "6-16 选择的教授的ID",
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

  Professor.disableRemoteMethodByName("upsert"); // disables PATCH /professors
  Professor.disableRemoteMethodByName("find"); // disables GET /professors
  Professor.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /professors
  Professor.disableRemoteMethodByName("create"); // disables POST /professors
  Professor.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /professors/{id}
  Professor.disableRemoteMethodByName("findById"); // disables GET /professors/{id}
  Professor.disableRemoteMethodByName("exists"); // disables HEAD /professors/{id}
  Professor.disableRemoteMethodByName("replaceById"); // disables PUT /professors/{id}
  Professor.disableRemoteMethodByName("deleteById"); // disables DELETE /professors/{id}
  Professor.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /professors/change-stream
  Professor.disableRemoteMethodByName("count"); // disables GET /professors/count
  Professor.disableRemoteMethodByName("findOne"); // disables GET /professors/findOne
  Professor.disableRemoteMethodByName("update"); // disables POST /professors/update
  Professor.disableRemoteMethodByName("upsertWithWhere"); // disables POST /professors/upsertWithWhere
  Professor.disableRemoteMethodByName("prototype.__get__course_names"); //disables GET /professors/{id}/course_names
  Professor.disableRemoteMethodByName("prototype.__create__course_names"); //disables POST /professors/{id}/course_names
  Professor.disableRemoteMethodByName("prototype.__delete__course_names"); //disables DELETE /professors/{id}/course_names
  Professor.disableRemoteMethodByName("prototype.__findById__course_names"); //disables GET /professors/{id}/course_names/{fk}
  Professor.disableRemoteMethodByName("prototype.__updateById__course_names"); //disables PUT /professors/{id}/course_names/{fk}
  Professor.disableRemoteMethodByName("prototype.__destroyById__course_names"); //disables DELETE /professors/{id}/course_names/{fk}
  Professor.disableRemoteMethodByName("prototype.__count__course_names"); //disables GET /professors/{id}/course_names/count
  Professor.disableRemoteMethodByName("prototype.__exists__course_names"); //disables HEAD /professors/{id}/course_names/rel/{fk}
  Professor.disableRemoteMethodByName("prototype.__link__course_names"); //disable PUT /professors/{id}/course_names/rel/{fk}
  Professor.disableRemoteMethodByName("prototype.__unlink__course_names"); //disable DELETE /professors/{id}/course_names/rel/{fk}
  Professor.disableRemoteMethodByName("prototype.__get__crawl_courses"); //disables GET /professors/{id}/crawl_courses
  Professor.disableRemoteMethodByName("prototype.__create__crawl_courses"); //disables POST /professors/{id}/crawl_courses
  Professor.disableRemoteMethodByName("prototype.__delete__crawl_courses"); //disables DELETE /professors/{id}/crawl_courses
  Professor.disableRemoteMethodByName("prototype.__findById__crawl_courses"); //disables GET /professors/{id}/crawl_courses/{fk}
  Professor.disableRemoteMethodByName("prototype.__updateById__crawl_courses"); //disables PUT /professors/{id}/crawl_courses/{fk}
  Professor.disableRemoteMethodByName("prototype.__destroyById__crawl_courses"); //disables DELETE /professors/{id}/crawl_courses/{fk}
  Professor.disableRemoteMethodByName("prototype.__count__crawl_courses"); //disables GET /professors/{id}/crawl_courses/count
  Professor.disableRemoteMethodByName("prototype.__get__static_courses"); //disables GET /professors/{id}/static_courses
  Professor.disableRemoteMethodByName("prototype.__create__static_courses"); //disables POST /professors/{id}/static_courses
  Professor.disableRemoteMethodByName("prototype.__delete__static_courses"); //disables DELETE /professors/{id}/static_courses
  Professor.disableRemoteMethodByName("prototype.__findById__static_courses"); //disables GET /professors/{id}/static_courses/{fk}
  Professor.disableRemoteMethodByName("prototype.__updateById__static_courses"); //disables PUT /professors/{id}/static_courses/{fk}
  Professor.disableRemoteMethodByName(
    "prototype.__destroyById__static_courses"
  ); //disables DELETE /professors/{id}/static_courses/{fk}
  Professor.disableRemoteMethodByName("prototype.__count__static_courses"); //disables GET /professors/{id}/static_courses/count
};
