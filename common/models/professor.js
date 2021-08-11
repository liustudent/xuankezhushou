"use strict";

module.exports = function (Professor) {
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
