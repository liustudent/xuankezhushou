'use strict';
module.exports = function(User) {
    



    User.disableRemoteMethodByName("upsert"); // disables PATCH /users
    User.disableRemoteMethodByName("find"); // disables GET /users
    User.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /users
    User.disableRemoteMethodByName("create"); // disables POST /users
    User.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /users/{id}
    User.disableRemoteMethodByName("findById"); // disables GET /users/{id}
    User.disableRemoteMethodByName("exists"); // disables HEAD /users/{id}
    User.disableRemoteMethodByName("replaceById"); // disables PUT /users/{id}
    User.disableRemoteMethodByName("deleteById"); // disables DELETE /users/{id}
    User.disableRemoteMethodByName("prototype.__get__accessTokens"); // disable GET /users/{id}/accessTokens
    User.disableRemoteMethodByName("prototype.__create__accessTokens"); // disable POST /users/{id}/accessTokens
    User.disableRemoteMethodByName("prototype.__delete__accessTokens"); // disable DELETE /users/{id}/accessTokens
    User.disableRemoteMethodByName("prototype.__findById__accessTokens"); // disable GET /users/{id}/accessTokens/{fk}
    User.disableRemoteMethodByName("prototype.__updateById__accessTokens"); // disable PUT /users/{id}/accessTokens/{fk}
    User.disableRemoteMethodByName("prototype.__destroyById__accessTokens"); // disable DELETE /users/{id}/accessTokens/{fk}
    User.disableRemoteMethodByName("prototype.__count__accessTokens"); // disable  GET /users/{id}/accessTokens/count
    User.disableRemoteMethodByName("prototype.verify"); // disable POST /users/{id}/verify
    User.disableRemoteMethodByName("changePassword"); // disable POST /users/change-password
    User.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /users/change-stream
    User.disableRemoteMethodByName("confirm"); // disables GET /users/confirm
    User.disableRemoteMethodByName("count"); // disables GET /users/count
    User.disableRemoteMethodByName("findOne"); // disables GET /users/findOne
    User.disableRemoteMethodByName("login");                                // disables POST /users/login
    User.disableRemoteMethodByName("logout");                               // disables POST /users/logout
    User.disableRemoteMethodByName("resetPassword"); // disables POST /users/reset
    User.disableRemoteMethodByName("setPassword"); // disables POST /users/reset-password
    User.disableRemoteMethodByName("update"); // disables POST /users/update
    User.disableRemoteMethodByName("upsertWithWhere"); // disables POST /users/upsertWithWhere
    User.disableRemoteMethodByName('prototype.__get__courseNames'); //disables GET /users/{id}/courseNames
    User.disableRemoteMethodByName('prototype.__create__courseNames'); //disables POST /users/{id}/courseNames
    User.disableRemoteMethodByName('prototype.__delete__courseNames'); //disables DELETE /users/{id}/courseNames
    User.disableRemoteMethodByName('prototype.__findById__courseNames'); //disables GET /users/{id}/courseNames/{fk}
    User.disableRemoteMethodByName('prototype.__updateById__courseNames'); //disables PUT /users/{id}/courseNames/{fk}
    User.disableRemoteMethodByName('prototype.__destroyById__courseNames'); //disables DELETE /users/{id}/courseNames/{fk}
    User.disableRemoteMethodByName('prototype.__count__courseNames'); //disables GET /users/{id}/courseNames/count
    User.disableRemoteMethodByName('prototype.__exists__courseNames'); //disables HEAD /users/{id}/courseNames/rel/{fk}
    User.disableRemoteMethodByName('prototype.__link__courseNames'); //disable PUT /users/{id}/courseNames/rel/{fk}
    User.disableRemoteMethodByName('prototype.__unlink__courseNames'); //disable DELETE /users/{id}/courseNames/rel/{fk}
    User.disableRemoteMethodByName('prototype.__get__course_names'); //disables GET /users/{id}/course_names
    User.disableRemoteMethodByName('prototype.__create__course_names'); //disables POST /users/{id}/course_names
    User.disableRemoteMethodByName('prototype.__delete__course_names'); //disables DELETE /users/{id}/course_names
    User.disableRemoteMethodByName('prototype.__findById__course_names'); //disables GET /users/{id}/course_names/{fk}
    User.disableRemoteMethodByName('prototype.__updateById__course_names'); //disables PUT /users/{id}/course_names/{fk}
    User.disableRemoteMethodByName('prototype.__destroyById__course_names'); //disables DELETE /users/{id}/course_names/{fk}
    User.disableRemoteMethodByName('prototype.__count__course_names'); //disables GET /users/{id}/course_names/count
    User.disableRemoteMethodByName('prototype.__exists__course_names'); //disables HEAD /users/{id}/course_names/rel/{fk}
    User.disableRemoteMethodByName('prototype.__link__course_names'); //disable PUT /users/{id}/course_names/rel/{fk}
    User.disableRemoteMethodByName('prototype.__unlink__course_names'); //disable DELETE /users/{id}/course_names/rel/{fk}
  
};
