'use strict';

module.exports = function(Term) {
    Term.disableRemoteMethodByName("upsert"); // disables PATCH /terms
    Term.disableRemoteMethodByName("find"); // disables GET /terms
    Term.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /terms
    Term.disableRemoteMethodByName("create"); // disables POST /terms
    Term.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /terms/{id}
    Term.disableRemoteMethodByName("findById"); // disables GET /terms/{id}
    Term.disableRemoteMethodByName("exists"); // disables HEAD /terms/{id}
    Term.disableRemoteMethodByName("replaceById"); // disables PUT /terms/{id}
    Term.disableRemoteMethodByName("deleteById"); // disables DELETE /terms/{id}
    Term.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /terms/change-stream
    Term.disableRemoteMethodByName("count"); // disables GET /terms/count
    Term.disableRemoteMethodByName("findOne"); // disables GET /terms/findOne
    Term.disableRemoteMethodByName("update"); // disables POST /terms/update
    Term.disableRemoteMethodByName("upsertWithWhere"); // disables POST /terms/upsertWithWhere
    Term.disableRemoteMethodByName('prototype.__get__school'); //disables GET /terms/{id}/school
    Term.disableRemoteMethodByName('prototype.__get__years'); //disables GET /terms/{id}/years
    Term.disableRemoteMethodByName('prototype.__create__years'); //disables POST /terms/{id}/years
    Term.disableRemoteMethodByName('prototype.__delete__years'); //disables DELETE /terms/{id}/years
    Term.disableRemoteMethodByName('prototype.__findById__years'); //disables GET /terms/{id}/years/{fk}
    Term.disableRemoteMethodByName('prototype.__updateById__years'); //disables PUT /terms/{id}/years/{fk}
    Term.disableRemoteMethodByName('prototype.__destroyById__years'); //disables DELETE /terms/{id}/years/{fk}
    Term.disableRemoteMethodByName('prototype.__count__years'); //disables GET /terms/{id}/years/count
    Term.disableRemoteMethodByName('prototype.__exists__years'); //disables HEAD /terms/{id}/years/rel/{fk}
    Term.disableRemoteMethodByName('prototype.__link__years'); //disable PUT /terms/{id}/years/rel/{fk}
    Term.disableRemoteMethodByName('prototype.__unlink__years'); //disable DELETE /terms/{id}/years/rel/{fk}
};
