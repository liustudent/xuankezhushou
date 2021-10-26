"use strict";
const app = require("../../server/server");
module.exports = function (School) {
  School.addNewSchool = function (
    name,
    nameAbbrev,
    terms,
    current_year,
    current_term,
    cb
  ) {
    let Term = app.models.term;
    School.create(
      {
        name: name,
        nameAbbrev: nameAbbrev,
        current_year: current_year,
        current_term: current_term,
      },
      function (errSchool, schoolInstance) {
        if (errSchool) {
          console.log("Fail to add School " + nameAbbrev);
          let errObj = new Error();
          errObj.name = "Fail to add School " + nameAbbrev;
          errObj.status = 404;
          // console.log(errObj)
          return cb(errObj);
        }
        let schoolId = schoolInstance.id.toString();
        for (const [term, order] of Object.entries(terms)) {
          Term.create(
            { term: term, order: order, schoolId: schoolId },
            function (errTerm, termInstance) {
              if (errTerm) {
                console.log("Fail to add Term " + term + "for " + nameAbbrev);
              } else {
                console.log("Created Term " + term + " for " + nameAbbrev);
              }
            }
          );
        }
        cb(null, "Success");
      }
    );
  };

  School.remoteMethod("addNewSchool", {
    description: "Get major list for python crawl",
    http: { path: "/addNewSchool", verb: "post" },
    accepts: [
      { arg: "name", type: "string", required: true },
      { arg: "nameAbbrev", type: "string", required: true },
      { arg: "terms", type: "Object", required: true },
      { arg: "currentYear", type: "number", required: true },
      { arg: "currentTerm", type: "string", required: true },
    ],
    returns: { arg: "result", type: "object" },
  });

  School.getAllDepts = function (ltx_school_id, user_id, error_test, cb) {
    if (error_test) {
      let errObj = new Error();
      if (error_test == 1) {
        errObj.name = "Invalid user";
        errObj.message = "Invalid user";
        errObj.status = 410;
        return cb(errObj);
      } else if (error_test == 2) {
        errObj.name = "Invalid school";
        errObj.message = "Invalid school";
        errObj.status = 411;
        return cb(errObj);
      } else if (error_test == 3) {
        errObj.name = "Empty list but it should not be empty";
        errObj.message = "Empty list but it should not be empty";
        errObj.status = 420;
        return cb(errObj);
      } else {
        errObj.name = "Invalid error test";
        errObj.message = "Invalid error test";
        errObj.status = 499;
        return cb(errObj);
      }
    }
    let template = [
      {
        dept_id: "1",
        dept_name: "Computer Science",
        dept_name_abbrev: "COMPSCI",
      },
      {
        dept_id: "2",
        dept_name: "Academic English",
        dept_name_abbrev: "AC ENG",
      },
    ];
    return cb(null, template);
  };

  School.remoteMethod("getAllDepts", {
    description:
      "6-2 获取所有学科, 该API用于6-2页面获取所有学科列表，请求需要包含留同学App内定义的学校ID，返回值包含一个状态code和data。、ndata的格式为array of object, 其中包含多个学科，按照首字母从A-Z排序（请求返回值已完成排序）",
    http: { path: "/getAllDepts", verb: "post" },
    accepts: [
      {
        arg: "ltx_school_id",
        type: "string",
        required: true,
        description: "留同学App内定义的学校ID",
      },
      {
        arg: "user_id",
        type: "string",
        required: true,
        description: "用户ID",
      },
      {
        arg: "error_test",
        type: "number",
        required: false,
      },
    ],
    returns: { arg: "result", type: "array" },
  });

  School.getCourseNames = function (ltx_school_id, user_id, error_test, cb) {
    if (error_test) {
      let errObj = new Error();
      if (error_test == 1) {
        errObj.name = "Invalid user";
        errObj.message = "Invalid user";
        errObj.status = 410;
        return cb(errObj);
      } else if (error_test == 2) {
        errObj.name = "Invalid school";
        errObj.message = "Invalid school";
        errObj.status = 411;
        return cb(errObj);
      } else if (error_test == 3) {
        errObj.name = "Empty list but it should not be empty";
        errObj.message = "Empty list but it should not be empty";
        errObj.status = 420;
        return cb(errObj);
      } else {
        errObj.name = "Invalid error test";
        errObj.message = "Invalid error test";
        errObj.status = 499;
        return cb(errObj);
      }
    }
    let template = [
      {
        dept_id: "603502e021778663b01a9705",
        dept_name_abbrev: "AC ENG",
        dept_name: "Academic English",
        dept_courses: [
          {
            static_course_id: "603502e021778663b01a9707",
            static_course_name: "20B",
          },
          {
            static_course_id: "603502e021778663b01a9708",
            static_course_name: "22A",
          },
        ],
      },
      {
        dept_id: "603502e021778663b01a9706",
        dept_name_abbrev: "ANATOMY",
        dept_name: "Anatomy and Neurobiology",
        dept_courses: [
          {
            static_course_id: "603502e021778663b01a9709",
            static_course_name: "2A",
          },
          {
            static_course_id: "603502e021778663b01a970A",
            static_course_name: "2B",
          },
        ],
      },
    ];
    return cb(null, template);
  };

  School.remoteMethod("getCourseNames", {
    description:
      "6-8 获取所有专业+课程，该API用于6-8的“学科和课号”按钮，返回内容包括状态code和data，返回内容显示在6-9页面。",
    http: { path: "/getCourseNames", verb: "post" },
    accepts: [
      {
        arg: "ltx_school_id",
        type: "string",
        required: true,
        description: "留同学App中定义的学校ID",
      },
      {
        arg: "user_id",
        type: "string",
        required: true,
        description: "用户ID",
      },
      {
        arg: "error_test",
        type: "number",
        required: false,
      },
    ],
    returns: { arg: "result", type: "array" },
  });

  School.searchProfs = function (
    ltx_school_id,
    keyword,
    user_id,
    error_test,
    cb
  ) {
    if (error_test) {
      let errObj = new Error();
      if (error_test == 1) {
        errObj.name = "Invalid user";
        errObj.message = "Invalid user";
        errObj.status = 410;
        return cb(errObj);
      } else if (error_test == 2) {
        errObj.name = "Invalid school";
        errObj.message = "Invalid school";
        errObj.status = 411;
        return cb(errObj);
      } else if (error_test == 3) {
        errObj.name = "Empty list but maybe have some ";
        errObj.message = "Empty list but maybe have some ";
        errObj.status = 421;
        return cb(errObj);
      } else {
        errObj.name = "Invalid error test";
        errObj.message = "Invalid error test";
        errObj.status = 499;
        return cb(errObj);
      }
    }
    let template = [
      {
        prof_id: "603502e021778663b01a974f",
        prof_name: "Peter, W.",
        belong_dept_name: "ANTHRO",
      },
      {
        prof_id: "603502e021778663b01a974f",
        prof_name: "Pattis, R.",
        belong_dept_name: "COMPSCI",
      },
    ];
    return cb(null, template);
  };

  School.remoteMethod("searchProfs", {
    description:
      "6-8/6-16 搜索教授, 该API用于6-8的“教授”按钮，返回内容包括状态code和data，返回内容需要在6-9后创建一个新页面。",
    http: { path: "/searchProfs", verb: "post" },
    accepts: [
      {
        arg: "ltx_school_id",
        type: "string",
        required: true,
        description: "留同学App中定义的学校ID",
      },
      {
        arg: "keyword",
        type: "string",
        required: true,
        description: "关键词用于检索教授",
      },
      {
        arg: "user_id",
        type: "string",
        required: true,
        description: "用户ID",
      },
      {
        arg: "error_test",
        type: "number",
        required: false,
      },
    ],
    returns: { arg: "result", type: "array" },
  });

  School.getTerms = function (ltx_school_id, cb) {
    if (ltx_school_id == "1") {
      let errObj = new Error();
      errObj.name = "School Not Exist";
      errObj.message = "School Not Exist";
      errObj.status = 404;
      return cb(errObj);
    }

    let template = [
      {
        term_id: "603502e021778663b01a974f",
        term_name: "Spring",
      },
      {
        term_id: "603502e021778663b01a974f",
        term_name: "Summer",
      },
      {
        term_id: "603502e021778663b01a974f",
        term_name: "Fall",
      },
      {
        term_id: "603502e021778663b01a974f",
        term_name: "Winter",
      },
    ];
    return cb(null, template);
  };

  School.remoteMethod("getTerms", {
    description: "6-8 获取可选择学期",
    http: { path: "/getTerms", verb: "post" },
    accepts: [
      {
        arg: "ltx_school_id",
        type: "string",
        required: true,
        description: "留同学App中定义的学校ID",
      },
    ],
    returns: { arg: "result", type: "array" },
  });



  School.disableRemoteMethodByName("upsert"); // disables PATCH /schools
  School.disableRemoteMethodByName("find"); // disables GET /schools
  School.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /schools
  School.disableRemoteMethodByName("create"); // disables POST /schools
  School.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /schools/{id}
  School.disableRemoteMethodByName("findById"); // disables GET /schools/{id}
  School.disableRemoteMethodByName("exists"); // disables HEAD /schools/{id}
  School.disableRemoteMethodByName("replaceById"); // disables PUT /schools/{id}
  School.disableRemoteMethodByName("deleteById"); // disables DELETE /schools/{id}
  School.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /schools/change-stream
  School.disableRemoteMethodByName("count"); // disables GET /schools/count
  School.disableRemoteMethodByName("findOne"); // disables GET /schools/findOne
  School.disableRemoteMethodByName("update"); // disables POST /schools/update
  School.disableRemoteMethodByName("upsertWithWhere"); // disables POST /schools/upsertWithWhere
  School.disableRemoteMethodByName("prototype.__get__course_names"); //disables GET /schools/{id}/course_names
  School.disableRemoteMethodByName("prototype.__create__course_names"); //disables POST /schools/{id}/course_names
  School.disableRemoteMethodByName("prototype.__delete__course_names"); //disables DELETE /schools/{id}/course_names
  School.disableRemoteMethodByName("prototype.__findById__course_names"); //disables GET /schools/{id}/course_names/{fk}
  School.disableRemoteMethodByName("prototype.__updateById__course_names"); //disables PUT /schools/{id}/course_names/{fk}
  School.disableRemoteMethodByName("prototype.__destroyById__course_names"); //disables DELETE /schools/{id}/course_names/{fk}
  School.disableRemoteMethodByName("prototype.__count__course_names"); //disables GET /schools/{id}/course_names/count
  School.disableRemoteMethodByName("prototype.__get__departments"); //disables GET /schools/{id}/departments
  School.disableRemoteMethodByName("prototype.__create__departments"); //disables POST /schools/{id}/departments
  School.disableRemoteMethodByName("prototype.__delete__departments"); //disables DELETE /schools/{id}/departments
  School.disableRemoteMethodByName("prototype.__findById__departments"); //disables GET /schools/{id}/departments/{fk}
  School.disableRemoteMethodByName("prototype.__updateById__departments"); //disables PUT /schools/{id}/departments/{fk}
  School.disableRemoteMethodByName("prototype.__destroyById__departments"); //disables DELETE /schools/{id}/departments/{fk}
  School.disableRemoteMethodByName("prototype.__count__departments"); //disables GET /schools/{id}/departments/count
  School.disableRemoteMethodByName("prototype.__get__professors"); //disables GET /schools/{id}/professors
  School.disableRemoteMethodByName("prototype.__create__professors"); //disables POST /schools/{id}/professors
  School.disableRemoteMethodByName("prototype.__delete__professors"); //disables DELETE /schools/{id}/professors
  School.disableRemoteMethodByName("prototype.__findById__professors"); //disables GET /schools/{id}/professors/{fk}
  School.disableRemoteMethodByName("prototype.__updateById__professors"); //disables PUT /schools/{id}/professors/{fk}
  School.disableRemoteMethodByName("prototype.__destroyById__professors"); //disables DELETE /schools/{id}/professors/{fk}
  School.disableRemoteMethodByName("prototype.__count__professors"); //disables GET /schools/{id}/professors/count
  School.disableRemoteMethodByName("prototype.__get__terms"); //disables GET /schools/{id}/terms
  School.disableRemoteMethodByName("prototype.__create__terms"); //disables POST /schools/{id}/terms
  School.disableRemoteMethodByName("prototype.__delete__terms"); //disables DELETE /schools/{id}/terms
  School.disableRemoteMethodByName("prototype.__findById__terms"); //disables GET /schools/{id}/terms/{fk}
  School.disableRemoteMethodByName("prototype.__updateById__terms"); //disables PUT /schools/{id}/terms/{fk}
  School.disableRemoteMethodByName("prototype.__destroyById__terms"); //disables DELETE /schools/{id}/terms/{fk}
  School.disableRemoteMethodByName("prototype.__count__terms"); //disables GET /schools/{id}/terms/count
  School.disableRemoteMethodByName("prototype.__get__year_terms"); //disables GET /schools/{id}/year_terms
  School.disableRemoteMethodByName("prototype.__create__year_terms"); //disables POST /schools/{id}/year_terms
  School.disableRemoteMethodByName("prototype.__delete__year_terms"); //disables DELETE /schools/{id}/year_terms
  School.disableRemoteMethodByName("prototype.__findById__year_terms"); //disables GET /schools/{id}/year_terms/{fk}
  School.disableRemoteMethodByName("prototype.__updateById__year_terms"); //disables PUT /schools/{id}/year_terms/{fk}
  School.disableRemoteMethodByName("prototype.__destroyById__year_terms"); //disables DELETE /schools/{id}/year_terms/{fk}
  School.disableRemoteMethodByName("prototype.__count__year_terms"); //disables GET /schools/{id}/year_terms/count

  // Custom API:
  School.disableRemoteMethodByName("addNewSchool"); //disables POST /schools/addNewSchool
};
