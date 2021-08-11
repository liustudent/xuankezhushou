  THISMODEL.disableRemoteMethodByName("upsert"); // disables PATCH /THISMODELs
  THISMODEL.disableRemoteMethodByName("find"); // disables GET /THISMODELs
  THISMODEL.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /THISMODELs
  THISMODEL.disableRemoteMethodByName("create"); // disables POST /THISMODELs
  THISMODEL.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /THISMODELs/{id}
  THISMODEL.disableRemoteMethodByName("findById"); // disables GET /THISMODELs/{id}
  THISMODEL.disableRemoteMethodByName("exists"); // disables HEAD /THISMODELs/{id}
  THISMODEL.disableRemoteMethodByName("replaceById"); // disables PUT /THISMODELs/{id}
  THISMODEL.disableRemoteMethodByName("deleteById"); // disables DELETE /THISMODELs/{id}
  THISMODEL.disableRemoteMethodByName("prototype.__get__accessTokens"); // disable GET /THISMODELs/{id}/accessTokens
  THISMODEL.disableRemoteMethodByName("prototype.__create__accessTokens"); // disable POST /THISMODELs/{id}/accessTokens
  THISMODEL.disableRemoteMethodByName("prototype.__delete__accessTokens"); // disable DELETE /THISMODELs/{id}/accessTokens
  THISMODEL.disableRemoteMethodByName("prototype.__findById__accessTokens"); // disable GET /THISMODELs/{id}/accessTokens/{fk}
  THISMODEL.disableRemoteMethodByName("prototype.__updateById__accessTokens"); // disable PUT /THISMODELs/{id}/accessTokens/{fk}
  THISMODEL.disableRemoteMethodByName("prototype.__destroyById__accessTokens"); // disable DELETE /THISMODELs/{id}/accessTokens/{fk}
  THISMODEL.disableRemoteMethodByName("prototype.__count__accessTokens"); // disable  GET /THISMODELs/{id}/accessTokens/count
  THISMODEL.disableRemoteMethodByName("prototype.verify"); // disable POST /THISMODELs/{id}/verify
  THISMODEL.disableRemoteMethodByName("changePassword"); // disable POST /THISMODELs/change-password
  THISMODEL.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /THISMODELs/change-stream
  THISMODEL.disableRemoteMethodByName("confirm"); // disables GET /THISMODELs/confirm
  THISMODEL.disableRemoteMethodByName("count"); // disables GET /THISMODELs/count
  THISMODEL.disableRemoteMethodByName("findOne"); // disables GET /THISMODELs/findOne
  THISMODEL.disableRemoteMethodByName("login");                                // disables POST /THISMODELs/login
  THISMODEL.disableRemoteMethodByName("logout");                               // disables POST /THISMODELs/logout
  THISMODEL.disableRemoteMethodByName("resetPassword"); // disables POST /THISMODELs/reset
  THISMODEL.disableRemoteMethodByName("setPassword"); // disables POST /THISMODELs/reset-password
  THISMODEL.disableRemoteMethodByName("update"); // disables POST /THISMODELs/update
  THISMODEL.disableRemoteMethodByName("upsertWithWhere"); // disables POST /THISMODELs/upsertWithWhere
  THISMODEL.disableRemoteMethodByName('prototype.__get__school'); //disables GET /THISMODELs/{id}/school
  THISMODEL.disableRemoteMethodByName('prototype.__get__anotherModel'); //disables GET /THISMODELs/{id}/anotherModel
  THISMODEL.disableRemoteMethodByName('prototype.__create__anotherModel'); //disables POST /THISMODELs/{id}/anotherModel
  THISMODEL.disableRemoteMethodByName('prototype.__delete__anotherModel'); //disables DELETE /THISMODELs/{id}/anotherModel
  THISMODEL.disableRemoteMethodByName('prototype.__findById__anotherModel'); //disables GET /THISMODELs/{id}/anotherModel/{fk}
  THISMODEL.disableRemoteMethodByName('prototype.__updateById__anotherModel'); //disables PUT /THISMODELs/{id}/anotherModel/{fk}
  THISMODEL.disableRemoteMethodByName('prototype.__destroyById__anotherModel'); //disables DELETE /THISMODELs/{id}/anotherModel/{fk}
  THISMODEL.disableRemoteMethodByName('prototype.__count__anotherModel'); //disables GET /THISMODELs/{id}/anotherModel/count
  THISMODEL.disableRemoteMethodByName('prototype.__exists__anotherModel'); //disables HEAD /THISMODELs/{id}/anotherModel/rel/{fk}
  THISMODEL.disableRemoteMethodByName('prototype.__link__anotherModel'); //disable PUT /THISMODELs/{id}/anotherModel/rel/{fk}
  THISMODEL.disableRemoteMethodByName('prototype.__unlink__anotherModel'); //disable DELETE /THISMODELs/{id}/anotherModel/rel/{fk}
  THISMODEL.disableRemoteMethodByName('prototype.getSchoolCourseList'); //disables HEAD /THISMODELs/{id}/getSchoolCourseList







e.g.

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
    Appnotification.disableRemoteMethodByName('prototype.__get__anotherModel'); //disables GET /app_notifications/{id}/anotherModel
    Appnotification.disableRemoteMethodByName('prototype.__create__anotherModel'); //disables POST /app_notifications/{id}/anotherModel
    Appnotification.disableRemoteMethodByName('prototype.__delete__anotherModel'); //disables DELETE /app_notifications/{id}/anotherModel
    Appnotification.disableRemoteMethodByName('prototype.__findById__anotherModel'); //disables GET /app_notifications/{id}/anotherModel/{fk}
    Appnotification.disableRemoteMethodByName('prototype.__updateById__anotherModel'); //disables PUT /app_notifications/{id}/anotherModel/{fk}
    Appnotification.disableRemoteMethodByName('prototype.__destroyById__anotherModel'); //disables DELETE /app_notifications/{id}/anotherModel/{fk}
    Appnotification.disableRemoteMethodByName('prototype.__count__anotherModel'); //disables GET /app_notifications/{id}/anotherModel/count
    Appnotification.disableRemoteMethodByName('prototype.__exists__anotherModel'); //disables HEAD /app_notifications/{id}/anotherModel/rel/{fk}
    Appnotification.disableRemoteMethodByName('prototype.__link__anotherModel'); //disable PUT /app_notifications/{id}/anotherModel/rel/{fk}
    Appnotification.disableRemoteMethodByName('prototype.__unlink__anotherModel'); //disable DELETE /app_notifications/{id}/anotherModel/rel/{fk}
  