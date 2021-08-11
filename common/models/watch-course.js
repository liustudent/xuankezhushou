"use strict";

module.exports = function (Watchcourse) {
  Watchcourse.disableRemoteMethodByName("upsert"); // disables PATCH /watch_courses
  Watchcourse.disableRemoteMethodByName("find"); // disables GET /watch_courses
  Watchcourse.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /watch_courses
  Watchcourse.disableRemoteMethodByName("create"); // disables POST /watch_courses
  Watchcourse.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /watch_courses/{id}
  Watchcourse.disableRemoteMethodByName("findById"); // disables GET /watch_courses/{id}
  Watchcourse.disableRemoteMethodByName("exists"); // disables HEAD /watch_courses/{id}
  Watchcourse.disableRemoteMethodByName("replaceById"); // disables PUT /watch_courses/{id}
  Watchcourse.disableRemoteMethodByName("deleteById"); // disables DELETE /watch_courses/{id}
  Watchcourse.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /watch_courses/change-stream
  Watchcourse.disableRemoteMethodByName("count"); // disables GET /watch_courses/count
  Watchcourse.disableRemoteMethodByName("findOne"); // disables GET /watch_courses/findOne
  Watchcourse.disableRemoteMethodByName("update"); // disables POST /watch_courses/update
  Watchcourse.disableRemoteMethodByName("upsertWithWhere"); // disables POST /watch_courses/upsertWithWhere
  Watchcourse.disableRemoteMethodByName("prototype.__get__course_name"); //disables GET /watch_courses/{id}/course_name
  Watchcourse.disableRemoteMethodByName("prototype.__get__user"); //disables GET /watch_courses/{id}/user
};
