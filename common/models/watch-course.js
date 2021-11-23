"use strict";

module.exports = function (WatchCourse) {
  WatchCourse.disableRemoteMethodByName("upsert"); // disables PATCH /watch_courses
  WatchCourse.disableRemoteMethodByName("find"); // disables GET /watch_courses
  WatchCourse.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /watch_courses
  WatchCourse.disableRemoteMethodByName("create"); // disables POST /watch_courses
  WatchCourse.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /watch_courses/{id}
  WatchCourse.disableRemoteMethodByName("findById"); // disables GET /watch_courses/{id}
  WatchCourse.disableRemoteMethodByName("exists"); // disables HEAD /watch_courses/{id}
  WatchCourse.disableRemoteMethodByName("replaceById"); // disables PUT /watch_courses/{id}
  WatchCourse.disableRemoteMethodByName("deleteById"); // disables DELETE /watch_courses/{id}
  WatchCourse.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /watch_courses/change-stream
  WatchCourse.disableRemoteMethodByName("count"); // disables GET /watch_courses/count
  WatchCourse.disableRemoteMethodByName("findOne"); // disables GET /watch_courses/findOne
  WatchCourse.disableRemoteMethodByName("update"); // disables POST /watch_courses/update
  WatchCourse.disableRemoteMethodByName("upsertWithWhere"); // disables POST /watch_courses/upsertWithWhere
  WatchCourse.disableRemoteMethodByName("prototype.__get__course_name"); //disables GET /watch_courses/{id}/course_name
  WatchCourse.disableRemoteMethodByName("prototype.__get__user"); //disables GET /watch_courses/{id}/user
};
