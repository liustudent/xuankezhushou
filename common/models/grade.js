'use strict';

module.exports = function(Grade) {
    Grade.disableRemoteMethodByName("upsert"); // disables PATCH /grades
    Grade.disableRemoteMethodByName("find"); // disables GET /grades
    Grade.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /grades
    Grade.disableRemoteMethodByName("create"); // disables POST /grades
    Grade.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /grades/{id}
    Grade.disableRemoteMethodByName("findById"); // disables GET /grades/{id}
    Grade.disableRemoteMethodByName("exists"); // disables HEAD /grades/{id}
    Grade.disableRemoteMethodByName("replaceById"); // disables PUT /grades/{id}
    Grade.disableRemoteMethodByName("deleteById"); // disables DELETE /grades/{id}
    Grade.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /grades/change-stream
    Grade.disableRemoteMethodByName("count"); // disables GET /grades/count
    Grade.disableRemoteMethodByName("findOne"); // disables GET /grades/findOne
    Grade.disableRemoteMethodByName("update"); // disables POST /grades/update
    Grade.disableRemoteMethodByName("upsertWithWhere"); // disables POST /grades/upsertWithWhere
};
