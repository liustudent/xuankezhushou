'use strict';

module.exports = function(Staticcourse) {
    Staticcourse.disableRemoteMethodByName("upsert"); // disables PATCH /static_courses
    Staticcourse.disableRemoteMethodByName("find"); // disables GET /static_courses
    Staticcourse.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /static_courses
    Staticcourse.disableRemoteMethodByName("create"); // disables POST /static_courses
    Staticcourse.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /static_courses/{id}
    Staticcourse.disableRemoteMethodByName("findById"); // disables GET /static_courses/{id}
    Staticcourse.disableRemoteMethodByName("exists"); // disables HEAD /static_courses/{id}
    Staticcourse.disableRemoteMethodByName("replaceById"); // disables PUT /static_courses/{id}
    Staticcourse.disableRemoteMethodByName("deleteById"); // disables DELETE /static_courses/{id}
    Staticcourse.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /static_courses/change-stream
    Staticcourse.disableRemoteMethodByName("count"); // disables GET /static_courses/count
    Staticcourse.disableRemoteMethodByName("findOne"); // disables GET /static_courses/findOne
    Staticcourse.disableRemoteMethodByName("update"); // disables POST /static_courses/update
    Staticcourse.disableRemoteMethodByName("upsertWithWhere"); // disables POST /static_courses/upsertWithWhere
    Staticcourse.disableRemoteMethodByName('prototype.__get__course_name'); //disables GET /static_courses/{id}/course_name
    Staticcourse.disableRemoteMethodByName('prototype.__get__professor'); //disables GET /static_courses/{id}/professor
    Staticcourse.disableRemoteMethodByName('prototype.__get__year_term'); //disables GET /static_courses/{id}/year_term
};
