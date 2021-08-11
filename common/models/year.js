'use strict';

module.exports = function(Year) {
    Year.disableRemoteMethodByName("upsert"); // disables PATCH /years
    Year.disableRemoteMethodByName("find"); // disables GET /years
    Year.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /years
    Year.disableRemoteMethodByName("create"); // disables POST /years
    Year.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /years/{id}
    Year.disableRemoteMethodByName("findById"); // disables GET /years/{id}
    Year.disableRemoteMethodByName("exists"); // disables HEAD /years/{id}
    Year.disableRemoteMethodByName("replaceById"); // disables PUT /years/{id}
    Year.disableRemoteMethodByName("deleteById"); // disables DELETE /years/{id}
    Year.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /years/change-stream
    Year.disableRemoteMethodByName("count"); // disables GET /years/count
    Year.disableRemoteMethodByName("findOne"); // disables GET /years/findOne
    Year.disableRemoteMethodByName("update"); // disables POST /years/update
    Year.disableRemoteMethodByName("upsertWithWhere"); // disables POST /years/upsertWithWhere
    Year.disableRemoteMethodByName('prototype.__get__terms'); //disables GET /years/{id}/terms
    Year.disableRemoteMethodByName('prototype.__create__terms'); //disables POST /years/{id}/terms
    Year.disableRemoteMethodByName('prototype.__delete__terms'); //disables DELETE /years/{id}/terms
    Year.disableRemoteMethodByName('prototype.__findById__terms'); //disables GET /years/{id}/terms/{fk}
    Year.disableRemoteMethodByName('prototype.__updateById__terms'); //disables PUT /years/{id}/terms/{fk}
    Year.disableRemoteMethodByName('prototype.__destroyById__terms'); //disables DELETE /years/{id}/terms/{fk}
    Year.disableRemoteMethodByName('prototype.__count__terms'); //disables GET /years/{id}/terms/count
    Year.disableRemoteMethodByName('prototype.__exists__terms'); //disables HEAD /years/{id}/terms/rel/{fk}
    Year.disableRemoteMethodByName('prototype.__link__terms'); //disable PUT /years/{id}/terms/rel/{fk}
    Year.disableRemoteMethodByName('prototype.__unlink__terms'); //disable DELETE /years/{id}/terms/rel/{fk}
};
