'use strict';

module.exports = function(Apppool) {
    Apppool.disableRemoteMethodByName("upsert"); // disables PATCH /app_pools
    Apppool.disableRemoteMethodByName("find"); // disables GET /app_pools
    Apppool.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /app_pools
    Apppool.disableRemoteMethodByName("create"); // disables POST /app_pools
    Apppool.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /app_pools/{id}
    Apppool.disableRemoteMethodByName("findById"); // disables GET /app_pools/{id}
    Apppool.disableRemoteMethodByName("exists"); // disables HEAD /app_pools/{id}
    Apppool.disableRemoteMethodByName("replaceById"); // disables PUT /app_pools/{id}
    Apppool.disableRemoteMethodByName("deleteById"); // disables DELETE /app_pools/{id}
    Apppool.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /app_pools/change-stream
    Apppool.disableRemoteMethodByName("count"); // disables GET /app_pools/count
    Apppool.disableRemoteMethodByName("findOne"); // disables GET /app_pools/findOne
    Apppool.disableRemoteMethodByName("update"); // disables POST /app_pools/update
    Apppool.disableRemoteMethodByName("upsertWithWhere"); // disables POST /app_pools/upsertWithWhere
    Apppool.disableRemoteMethodByName('prototype.__get__course_names'); //disables GET /app_pools/{id}/course_names
    Apppool.disableRemoteMethodByName('prototype.__create__course_names'); //disables POST /app_pools/{id}/course_names
    Apppool.disableRemoteMethodByName('prototype.__delete__course_names'); //disables DELETE /app_pools/{id}/course_names
    Apppool.disableRemoteMethodByName('prototype.__findById__course_names'); //disables GET /app_pools/{id}/course_names/{fk}
    Apppool.disableRemoteMethodByName('prototype.__updateById__course_names'); //disables PUT /app_pools/{id}/course_names/{fk}
    Apppool.disableRemoteMethodByName('prototype.__destroyById__course_names'); //disables DELETE /app_pools/{id}/course_names/{fk}
    Apppool.disableRemoteMethodByName('prototype.__count__course_names'); //disables GET /app_pools/{id}/course_names/count
};
