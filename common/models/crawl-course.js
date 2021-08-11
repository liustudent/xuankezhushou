"use strict";

module.exports = function (Crawlcourse) {
  Crawlcourse.disableRemoteMethodByName("upsert"); // disables PATCH /crawl_courses
  Crawlcourse.disableRemoteMethodByName("find"); // disables GET /crawl_courses
  Crawlcourse.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /crawl_courses
  Crawlcourse.disableRemoteMethodByName("create"); // disables POST /crawl_courses
  Crawlcourse.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /crawl_courses/{id}
  Crawlcourse.disableRemoteMethodByName("findById"); // disables GET /crawl_courses/{id}
  Crawlcourse.disableRemoteMethodByName("exists"); // disables HEAD /crawl_courses/{id}
  Crawlcourse.disableRemoteMethodByName("replaceById"); // disables PUT /crawl_courses/{id}
  Crawlcourse.disableRemoteMethodByName("deleteById"); // disables DELETE /crawl_courses/{id}
  Crawlcourse.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /crawl_courses/change-stream
  Crawlcourse.disableRemoteMethodByName("count"); // disables GET /crawl_courses/count
  Crawlcourse.disableRemoteMethodByName("findOne"); // disables GET /crawl_courses/findOne
  Crawlcourse.disableRemoteMethodByName("update"); // disables POST /crawl_courses/update
  Crawlcourse.disableRemoteMethodByName("upsertWithWhere"); // disables POST /crawl_courses/upsertWithWhere
  Crawlcourse.disableRemoteMethodByName("prototype.__get__course_name"); //disables GET /crawl_courses/{id}/course_name
  Crawlcourse.disableRemoteMethodByName("prototype.__get__professor"); //disables GET /crawl_courses/{id}/professor
  Crawlcourse.disableRemoteMethodByName("prototype.__get__year_term"); //disables GET /crawl_courses/{id}/year_term
};
