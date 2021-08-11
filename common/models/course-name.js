"use strict";

module.exports = function (Coursename) {
  Coursename.getCourseSections = function (course_name_id, cb) {
    if (course_name_id=="1"){
      let errObj = new Error();
          errObj.name = "CourseName Not Exist";
          errObj.message = "CourseName Not Exist"
          errObj.status = 404;
          return cb(errObj);
    }
    let template = [
      {
        _id: "1",
        course_code:"12345",
        section:"A",
        course_type:"Lec",
        class_day:["M","W","F"],
        start_time:"10:00",
        end_time:"11:00",
        enrolled_percent:"50"
      },
      {
        _id: "2",
        course_code:"54321",
        section:"Z",
        course_type:"Dis",
        class_day:["M","W"],
        start_time:"9:00",
        end_time:"10:00",
        enrolled_percent:"70"
      },
    ];
    return cb(null, template);
  };

  Coursename.remoteMethod("getCourseSections", {
    description: "Get all sections for a course",
    http: { path: "/getCourseSections", verb: "post" },
    accepts: [{ arg: "course_name_id", type: "string", required: true }],
    returns: { arg: "result", type: "array" },
  });
  Coursename.disableRemoteMethodByName("upsert"); // disables PATCH /course_names
  Coursename.disableRemoteMethodByName("find"); // disables GET /course_names
  Coursename.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /course_names
  Coursename.disableRemoteMethodByName("create"); // disables POST /course_names
  Coursename.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /course_names/{id}
  Coursename.disableRemoteMethodByName("findById"); // disables GET /course_names/{id}
  Coursename.disableRemoteMethodByName("exists"); // disables HEAD /course_names/{id}
  Coursename.disableRemoteMethodByName("replaceById"); // disables PUT /course_names/{id}
  Coursename.disableRemoteMethodByName("deleteById"); // disables DELETE /course_names/{id}
  Coursename.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /course_names/change-stream
  Coursename.disableRemoteMethodByName("count"); // disables GET /course_names/count
  Coursename.disableRemoteMethodByName("findOne"); // disables GET /course_names/findOne
  Coursename.disableRemoteMethodByName("update"); // disables POST /course_names/update
  Coursename.disableRemoteMethodByName("upsertWithWhere"); // disables POST /course_names/upsertWithWhere
  Coursename.disableRemoteMethodByName("prototype.__get__crawl_courses"); //disables GET /course_names/{id}/crawl_courses
  Coursename.disableRemoteMethodByName("prototype.__create__crawl_courses"); //disables POST /course_names/{id}/crawl_courses
  Coursename.disableRemoteMethodByName("prototype.__delete__crawl_courses"); //disables DELETE /course_names/{id}/crawl_courses
  Coursename.disableRemoteMethodByName("prototype.__findById__crawl_courses"); //disables GET /course_names/{id}/crawl_courses/{fk}
  Coursename.disableRemoteMethodByName("prototype.__updateById__crawl_courses"); //disables PUT /course_names/{id}/crawl_courses/{fk}
  Coursename.disableRemoteMethodByName(
    "prototype.__destroyById__crawl_courses"
  ); //disables DELETE /course_names/{id}/crawl_courses/{fk}
  Coursename.disableRemoteMethodByName("prototype.__count__crawl_courses"); //disables GET /course_names/{id}/crawl_courses/count
  Coursename.disableRemoteMethodByName("prototype.__get__professors"); //disables GET /course_names/{id}/professors
  Coursename.disableRemoteMethodByName("prototype.__create__professors"); //disables POST /course_names/{id}/professors
  Coursename.disableRemoteMethodByName("prototype.__delete__professors"); //disables DELETE /course_names/{id}/professors
  Coursename.disableRemoteMethodByName("prototype.__findById__professors"); //disables GET /course_names/{id}/professors/{fk}
  Coursename.disableRemoteMethodByName("prototype.__updateById__professors"); //disables PUT /course_names/{id}/professors/{fk}
  Coursename.disableRemoteMethodByName("prototype.__destroyById__professors"); //disables DELETE /course_names/{id}/professors/{fk}
  Coursename.disableRemoteMethodByName("prototype.__count__professors"); //disables GET /course_names/{id}/professors/count
  Coursename.disableRemoteMethodByName("prototype.__exists__professors"); //disables HEAD /course_names/{id}/professors/rel/{fk}
  Coursename.disableRemoteMethodByName("prototype.__link__professors"); //disable PUT /course_names/{id}/professors/rel/{fk}
  Coursename.disableRemoteMethodByName("prototype.__unlink__professors"); //disable DELETE /course_names/{id}/professors/rel/{fk}
  Coursename.disableRemoteMethodByName("prototype.__get__static_courses"); //disables GET /course_names/{id}/static_courses
  Coursename.disableRemoteMethodByName("prototype.__create__static_courses"); //disables POST /course_names/{id}/static_courses
  Coursename.disableRemoteMethodByName("prototype.__delete__static_courses"); //disables DELETE /course_names/{id}/static_courses
  Coursename.disableRemoteMethodByName("prototype.__findById__static_courses"); //disables GET /course_names/{id}/static_courses/{fk}
  Coursename.disableRemoteMethodByName(
    "prototype.__updateById__static_courses"
  ); //disables PUT /course_names/{id}/static_courses/{fk}
  Coursename.disableRemoteMethodByName(
    "prototype.__destroyById__static_courses"
  ); //disables DELETE /course_names/{id}/static_courses/{fk}
  Coursename.disableRemoteMethodByName("prototype.__count__static_courses"); //disables GET /course_names/{id}/static_courses/count
  Coursename.disableRemoteMethodByName("prototype.__get__users"); //disables GET /course_names/{id}/users
  Coursename.disableRemoteMethodByName("prototype.__create__users"); //disables POST /course_names/{id}/users
  Coursename.disableRemoteMethodByName("prototype.__delete__users"); //disables DELETE /course_names/{id}/users
  Coursename.disableRemoteMethodByName("prototype.__findById__users"); //disables GET /course_names/{id}/users/{fk}
  Coursename.disableRemoteMethodByName("prototype.__updateById__users"); //disables PUT /course_names/{id}/users/{fk}
  Coursename.disableRemoteMethodByName("prototype.__destroyById__users"); //disables DELETE /course_names/{id}/users/{fk}
  Coursename.disableRemoteMethodByName("prototype.__count__users"); //disables GET /course_names/{id}/users/count
  Coursename.disableRemoteMethodByName("prototype.__exists__users"); //disables HEAD /course_names/{id}/users/rel/{fk}
  Coursename.disableRemoteMethodByName("prototype.__link__users"); //disable PUT /course_names/{id}/users/rel/{fk}
  Coursename.disableRemoteMethodByName("prototype.__unlink__users"); //disable DELETE /course_names/{id}/users/rel/{fk}
};
