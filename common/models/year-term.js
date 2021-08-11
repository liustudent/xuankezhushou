"use strict";

module.exports = function (Yearterm) {
  Yearterm.disableRemoteMethodByName("upsert"); // disables PATCH /year_terms
  Yearterm.disableRemoteMethodByName("find"); // disables GET /year_terms
  Yearterm.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /year_terms
  Yearterm.disableRemoteMethodByName("create"); // disables POST /year_terms
  Yearterm.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /year_terms/{id}
  Yearterm.disableRemoteMethodByName("findById"); // disables GET /year_terms/{id}
  Yearterm.disableRemoteMethodByName("exists"); // disables HEAD /year_terms/{id}
  Yearterm.disableRemoteMethodByName("replaceById"); // disables PUT /year_terms/{id}
  Yearterm.disableRemoteMethodByName("deleteById"); // disables DELETE /year_terms/{id}
  Yearterm.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /year_terms/change-stream
  Yearterm.disableRemoteMethodByName("count"); // disables GET /year_terms/count
  Yearterm.disableRemoteMethodByName("findOne"); // disables GET /year_terms/findOne
  Yearterm.disableRemoteMethodByName("update"); // disables POST /year_terms/update
  Yearterm.disableRemoteMethodByName("upsertWithWhere"); // disables POST /year_terms/upsertWithWhere
  Yearterm.disableRemoteMethodByName("prototype.__get__crawl_courses"); //disables GET /year_terms/{id}/crawl_courses
  Yearterm.disableRemoteMethodByName("prototype.__create__crawl_courses"); //disables POST /year_terms/{id}/crawl_courses
  Yearterm.disableRemoteMethodByName("prototype.__delete__crawl_courses"); //disables DELETE /year_terms/{id}/crawl_courses
  Yearterm.disableRemoteMethodByName("prototype.__findById__crawl_courses"); //disables GET /year_terms/{id}/crawl_courses/{fk}
  Yearterm.disableRemoteMethodByName("prototype.__updateById__crawl_courses"); //disables PUT /year_terms/{id}/crawl_courses/{fk}
  Yearterm.disableRemoteMethodByName("prototype.__destroyById__crawl_courses"); //disables DELETE /year_terms/{id}/crawl_courses/{fk}
  Yearterm.disableRemoteMethodByName("prototype.__count__crawl_courses"); //disables GET /year_terms/{id}/crawl_courses/count
  Yearterm.disableRemoteMethodByName("prototype.__get__static_courses"); //disables GET /year_terms/{id}/static_courses
  Yearterm.disableRemoteMethodByName("prototype.__create__static_courses"); //disables POST /year_terms/{id}/static_courses
  Yearterm.disableRemoteMethodByName("prototype.__delete__static_courses"); //disables DELETE /year_terms/{id}/static_courses
  Yearterm.disableRemoteMethodByName("prototype.__findById__static_courses"); //disables GET /year_terms/{id}/static_courses/{fk}
  Yearterm.disableRemoteMethodByName("prototype.__updateById__static_courses"); //disables PUT /year_terms/{id}/static_courses/{fk}
  Yearterm.disableRemoteMethodByName("prototype.__destroyById__static_courses"); //disables DELETE /year_terms/{id}/static_courses/{fk}
  Yearterm.disableRemoteMethodByName("prototype.__count__static_courses"); //disables GET /year_terms/{id}/static_courses/count
  Yearterm.disableRemoteMethodByName("prototype.__get__school"); //disables GET /year_terms/{id}/school
  Yearterm.disableRemoteMethodByName("prototype.__get__term"); //disables GET /year_terms/{id}/term
  Yearterm.disableRemoteMethodByName("prototype.__get__year"); //disables GET /year_terms/{id}/year
};
