"use strict";

module.exports = function (Appnotification) {
  Appnotification.disableRemoteMethodByName("upsert"); // disables PATCH /app_notifications
  Appnotification.disableRemoteMethodByName("find"); // disables GET /app_notifications
  Appnotification.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /app_notifications
  Appnotification.disableRemoteMethodByName("create"); // disables POST /app_notifications
  Appnotification.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /app_notifications/{id}
  Appnotification.disableRemoteMethodByName("findById"); // disables GET /app_notifications/{id}
  Appnotification.disableRemoteMethodByName("exists"); // disables HEAD /app_notifications/{id}
  Appnotification.disableRemoteMethodByName("replaceById"); // disables PUT /app_notifications/{id}
  Appnotification.disableRemoteMethodByName("deleteById"); // disables DELETE /app_notifications/{id}
  Appnotification.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /app_notifications/change-stream
  Appnotification.disableRemoteMethodByName("count"); // disables GET /app_notifications/count
  Appnotification.disableRemoteMethodByName("findOne"); // disables GET /app_notifications/findOne
  Appnotification.disableRemoteMethodByName("update"); // disables POST /app_notifications/update
  Appnotification.disableRemoteMethodByName("upsertWithWhere"); // disables POST /app_notifications/upsertWithWhere
};
