"use strict";

module.exports = function (Reviewlabel) {
  Reviewlabel.disableRemoteMethodByName("upsert"); // disables PATCH /review_labels
  Reviewlabel.disableRemoteMethodByName("find"); // disables GET /review_labels
  Reviewlabel.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /review_labels
  Reviewlabel.disableRemoteMethodByName("create"); // disables POST /review_labels
  Reviewlabel.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /review_labels/{id}
  Reviewlabel.disableRemoteMethodByName("findById"); // disables GET /review_labels/{id}
  Reviewlabel.disableRemoteMethodByName("exists"); // disables HEAD /review_labels/{id}
  Reviewlabel.disableRemoteMethodByName("replaceById"); // disables PUT /review_labels/{id}
  Reviewlabel.disableRemoteMethodByName("deleteById"); // disables DELETE /review_labels/{id}
  Reviewlabel.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /review_labels/change-stream
  Reviewlabel.disableRemoteMethodByName("count"); // disables GET /review_labels/count
  Reviewlabel.disableRemoteMethodByName("findOne"); // disables GET /review_labels/findOne
  Reviewlabel.disableRemoteMethodByName("update"); // disables POST /review_labels/update
  Reviewlabel.disableRemoteMethodByName("upsertWithWhere"); // disables POST /review_labels/upsertWithWhere
};
