"use strict";

module.exports = function (Department) {
  Department.getCourseNames = function (dept_id, cb) {
    if (dept_id == "1") {
      let errObj = new Error();
      errObj.name = "Department Not Exist";
      errObj.message = "Department Not Exist";
      errObj.status = 404;
      return cb(errObj);
    }
    let template = [
      {
        course_name_id: "1",
        course_name: "COMPSCI 105",
        description: "ADV PROD C  ",
        enrolled_percent: "77.00",
      },
      {
        course_name_id: "2",
        course_name: "COMPSCI 105",
        description: "ADV PROD C  ",
        enrolled_percent: "77.00",
      },
    ];
    return cb(null, template);
  };

  Department.remoteMethod("getCourseNames", {
    description:
      "6-3 获取课程名称列表， 该API用于6-3页面获取课程名称列表，请求需要包含“获取所有学科”请求返回的dept_id，返回值包含一个状态code和data。\ndata的格式为array of object, 其中包含多个学科名称，按照首字母从A-Z排序（请求返回值已完成排序）",
    http: { path: "/getCourseNames", verb: "post" },
    accepts: [
      {
        arg: "dept_id",
        type: "string",
        required: true,
        description: "为“获取所有学科”请求返回的dept_id",
      },
    ],
    returns: { arg: "result", type: "array" },
  });

  Department.disableRemoteMethodByName("upsert"); // disables PATCH /departments
  Department.disableRemoteMethodByName("find"); // disables GET /departments
  Department.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /departments
  Department.disableRemoteMethodByName("create"); // disables POST /departments
  Department.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /departments/{id}
  Department.disableRemoteMethodByName("findById"); // disables GET /departments/{id}
  Department.disableRemoteMethodByName("exists"); // disables HEAD /departments/{id}
  Department.disableRemoteMethodByName("replaceById"); // disables PUT /departments/{id}
  Department.disableRemoteMethodByName("deleteById"); // disables DELETE /departments/{id}
  Department.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /departments/change-stream
  Department.disableRemoteMethodByName("count"); // disables GET /departments/count
  Department.disableRemoteMethodByName("findOne"); // disables GET /departments/findOne
  Department.disableRemoteMethodByName("update"); // disables POST /departments/update
  Department.disableRemoteMethodByName("upsertWithWhere"); // disables POST /departments/upsertWithWhere
  Department.disableRemoteMethodByName("prototype.__get__course_names"); //disables GET /departments/{id}/course_names
  Department.disableRemoteMethodByName("prototype.__create__course_names"); //disables POST /departments/{id}/course_names
  Department.disableRemoteMethodByName("prototype.__delete__course_names"); //disables DELETE /departments/{id}/course_names
  Department.disableRemoteMethodByName("prototype.__findById__course_names"); //disables GET /departments/{id}/course_names/{fk}
  Department.disableRemoteMethodByName("prototype.__updateById__course_names"); //disables PUT /departments/{id}/course_names/{fk}
  Department.disableRemoteMethodByName("prototype.__destroyById__course_names"); //disables DELETE /departments/{id}/course_names/{fk}
  Department.disableRemoteMethodByName("prototype.__count__course_names"); //disables GET /departments/{id}/course_names/count
  Department.disableRemoteMethodByName("prototype.__get__professors"); //disables GET /departments/{id}/professors
  Department.disableRemoteMethodByName("prototype.__create__professors"); //disables POST /departments/{id}/professors
  Department.disableRemoteMethodByName("prototype.__delete__professors"); //disables DELETE /departments/{id}/professors
  Department.disableRemoteMethodByName("prototype.__findById__professors"); //disables GET /departments/{id}/professors/{fk}
  Department.disableRemoteMethodByName("prototype.__updateById__professors"); //disables PUT /departments/{id}/professors/{fk}
  Department.disableRemoteMethodByName("prototype.__destroyById__professors"); //disables DELETE /departments/{id}/professors/{fk}
  Department.disableRemoteMethodByName("prototype.__count__professors"); //disables GET /departments/{id}/professors/count
};
