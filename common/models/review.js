'use strict';

module.exports = function(Review) {
    Review.disableRemoteMethodByName("upsert"); // disables PATCH /reviews
    Review.disableRemoteMethodByName("find"); // disables GET /reviews
    Review.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /reviews
    Review.disableRemoteMethodByName("create"); // disables POST /reviews
    Review.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /reviews/{id}
    Review.disableRemoteMethodByName("findById"); // disables GET /reviews/{id}
    Review.disableRemoteMethodByName("exists"); // disables HEAD /reviews/{id}
    Review.disableRemoteMethodByName("replaceById"); // disables PUT /reviews/{id}
    Review.disableRemoteMethodByName("deleteById"); // disables DELETE /reviews/{id}
    Review.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /reviews/change-stream
    Review.disableRemoteMethodByName("count"); // disables GET /reviews/count
    Review.disableRemoteMethodByName("findOne"); // disables GET /reviews/findOne
    Review.disableRemoteMethodByName("update"); // disables POST /reviews/update
    Review.disableRemoteMethodByName("upsertWithWhere"); // disables POST /reviews/upsertWithWhere
    Review.disableRemoteMethodByName('prototype.__get__course_name'); //disables GET /reviews/{id}/course_name
    Review.disableRemoteMethodByName('prototype.__get__professor'); //disables GET /reviews/{id}/professor

};
