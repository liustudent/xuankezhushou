"use strict";
const app = require("../../server/server");
const { ObjectId } = require('mongodb');

module.exports = function (Proflink) {
  Proflink.disableRemoteMethodByName("upsert"); // disables PATCH /course_names
  Proflink.disableRemoteMethodByName("find"); // disables GET /course_names
  Proflink.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /course_names
  Proflink.disableRemoteMethodByName("create"); // disables POST /course_names
  Proflink.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /course_names/{id}
  Proflink.disableRemoteMethodByName("findById"); // disables GET /course_names/{id}
  Proflink.disableRemoteMethodByName("exists"); // disables HEAD /course_names/{id}
  Proflink.disableRemoteMethodByName("replaceById"); // disables PUT /course_names/{id}
  Proflink.disableRemoteMethodByName("deleteById"); // disables DELETE /course_names/{id}
  Proflink.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /course_names/change-stream
  Proflink.disableRemoteMethodByName("count"); // disables GET /course_names/count
  Proflink.disableRemoteMethodByName("findOne"); // disables GET /course_names/findOne
  Proflink.disableRemoteMethodByName("update"); // disables POST /course_names/update
  Proflink.disableRemoteMethodByName("upsertWithWhere"); // disables POST /course_names/upsertWithWhere
};
