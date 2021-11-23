"use strict";
const app = require("../../server/server");
const { ObjectId } = require('mongodb');

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

  School.getAllDepts = function (ltx_school_id, user_id, cb) {
    // 空串错误检测
    if (!user_id || !ltx_school_id){
      let errObj = new Error();
      errObj.name = "Invalid Query!";
      errObj.message = "Invalid Query!";
      errObj.status = 410;
      errObj.stack = ""
      return cb(errObj);
    }
    let schoolId;
    // 无效数据检测
    let userValidation = new Promise((resolve, reject) => {
      app.models.User.findOne(
        {
          where: {"ltx_userid": user_id}
        },
        function(err, userInstance){
          if(err || !userInstance){
            let errObj = new Error();
            errObj.name = "Invalid user id";
            errObj.message = "Invalid user id";
            errObj.status = 410;
            errObj.stack = ""
            reject(errObj)
          }else{
            resolve(true)
          }
        }
      )
    })
    
    let schoolValidation = new Promise((resolve, reject) => {
      School.findOne(
        {
          where: {"ltx_school_id": ltx_school_id}
        },
        function(err, schoolInstance){
          if(err || !schoolInstance){
            let errObj = new Error();
            errObj.name = "Invalid school id";
            errObj.message = "Invalid school id";
            errObj.status = 411;
            errObj.stack = ""
            reject(errObj)
          }else{
            schoolId = schoolInstance.id;
            resolve(true)
          }
        }
      )
    })

    
    Promise.all([userValidation, schoolValidation])
    .then(()=>{
      // 查询数据
      app.models.Department.find(
        {
          where: {'school_id': ObjectId(schoolId)}
        },
        function(err, departmentInstance){
          if(err){
            console.log(err);
            return cb(err);
          }else{
            if(departmentInstance){
              let result = []
              departmentInstance.forEach(dpt => {
                let temp = {
                  dept_id: dpt['id'],
                  dept_name: dpt['name'],
                  dept_name_abbrev: dpt['nameAbbrev'],
                }
                result.push(temp)
              });
              return cb(null, result)
            }else{
              return cb(null, ["No Available Department"])
            }
          }
        }
      )
    })
    .catch((errObj)=>{
      return cb(errObj)
    })
    
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
      }
    ],
    returns: { arg: "result", type: "array" },
  });

  School.getCourseNames = function (ltx_school_id, user_id, cb) {
    // 空串错误检测
    if (!user_id){
      let errObj = new Error();
      errObj.name = "User Id is required";
      errObj.message = "User Id is required";
      errObj.status = 410;
      errObj.stack = ""
      return cb(errObj);
    }
    if (!ltx_school_id){
      let errObj = new Error();
      errObj.name = "School Id is required";
      errObj.message = "School Id is required";
      errObj.status = 411;
      errObj.stack = ""
      return cb(errObj);
    }

    let schoolId;
    // 无效数据检测
    let userValidation = new Promise((resolve, reject) => {
      app.models.User.findOne(
        {
          where: {"ltx_userid": user_id}
        },
        function(err, userInstance){
          if(err || !userInstance){
            let errObj = new Error();
            errObj.name = "Invalid user id";
            errObj.message = "Invalid user id";
            errObj.status = 410;
            errObj.stack = ""
            reject(errObj)
          }else{
            resolve(true)
          }
        }
      )
    })
    
    let schoolValidation = new Promise((resolve, reject) => {
      School.findOne(
        {
          where: {"ltx_school_id": ltx_school_id}
        },
        function(err, schoolInstance){
          if(err || !schoolInstance){
            let errObj = new Error();
            errObj.name = "Invalid school id";
            errObj.message = "Invalid school id";
            errObj.status = 411;
            errObj.stack = ""
            reject(errObj)
          }else{
            schoolId = schoolInstance.id;
            resolve(true)
          }
        }
      )
    })

    
    Promise.all([userValidation, schoolValidation])
    .then(()=>{
      // 查询数据
      let result = []
      new Promise((resolveOut, rejectOut)=>{
        app.models.Department.find(
          {
            where: {'school_id': schoolId}
          },
          async function(err, departmentInstance){
            if(err){
              console.log(err);
              rejectOut(err);
            }else{
              if(departmentInstance){
                for(let i in departmentInstance){
                  const dpt = departmentInstance[i]
                  let temp = {
                    dept_id: dpt['id'],
                    dept_name_abbrev: dpt['nameAbbrev'],
                    dept_name: dpt['name'],
                    dept_courses: []
                  }
                  // console.log(ObjectId(dpt['id']))
                  // 查询dept id对应的course name
                  new Promise((resolveIn, rejectIn)=>{
                    app.models.CourseName.find(
                      {
                        where: {'department_id': ObjectId(dpt['id'])}
                      },
                      function(err, courseNameInstance){
                        if(err){
                          console.log(err);
                          rejectIn(err);
                        }else{
                          if(courseNameInstance){
                            // console.log(courseNameInstance)
                            courseNameInstance.forEach(cn => {
                              let tempCourse = {
                                static_course_id: cn['id'],
                                static_course_name: cn['course_number']
                              }
                              temp.dept_courses.push(tempCourse);
                              // console.log("1", temp)
                            })
                            // await Promise.all([inPromise]);
                            resolveIn(true)
                          }else{
                            console.log(err);
                            rejectIn(err);
                          }
                        }
                      }
                    )
                    
                  })
                  .then(()=>{
                    result.push(temp);
                    // console.log("2",result)
                    if(result.length==departmentInstance.length){
                      resolveOut(true)
                      // console.log("3",result)
                    }
                  })
                }
              }else{
                console.log(err);
                rejectOut(err);
              }
            }
          }
        )
      })
      .then(()=>{
        return cb(null, result);
      })
    })
    .catch((errObj) => {
      // validation 错误信息回调
      return cb(errObj)
    })
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
      }
    ],
    returns: { arg: "result", type: "array" },
  });

  School.searchProfs = function (
    ltx_school_id,
    keyword,
    user_id,
    cb
  ) {
    // 空串错误检测
    if (!user_id || !ltx_school_id){
      let errObj = new Error();
      errObj.name = "Invalid Query!";
      errObj.message = "Invalid Query!";
      errObj.status = 410;
      errObj.stack = ""
      return cb(errObj);
    }
    let schoolId;
    // 无效数据检测
    let userValidation = new Promise((resolve, reject) => {
      app.models.User.findOne(
        {
          where: {"ltx_userid": user_id}
        },
        function(err, userInstance){
          if(err || !userInstance){
            let errObj = new Error();
            errObj.name = "Invalid user id";
            errObj.message = "Invalid user id";
            errObj.status = 410;
            errObj.stack = ""
            reject(errObj)
          }else{
            resolve(true)
          }
        }
      )
    })
    
    let schoolValidation = new Promise((resolve, reject) => {
      School.findOne(
        {
          where: {"ltx_school_id": ltx_school_id}
        },
        function(err, schoolInstance){
          if(err || !schoolInstance){
            let errObj = new Error();
            errObj.name = "Invalid school id";
            errObj.message = "Invalid school id";
            errObj.status = 411;
            errObj.stack = ""
            reject(errObj)
          }else{
            schoolId = schoolInstance.id;
            resolve(true)
          }
        }
      )
    })

    
    Promise.all([userValidation, schoolValidation])
    .then(()=>{
      let result = []
      app.models.Professor.find(
        {
          where: {'school_id': ObjectId(schoolId), 'name': { regexp: `/${keyword}/i`}}
        },
        function(err, professorInstance){
          if(err){
            console.log(err)
            return cb(err)
          }else{
            if(professorInstance){
              professorInstance.forEach(prof => {
                let temp = {
                  prof_id: prof['id'],
                  prof_name: prof['name'],
                  belong_dept_name: prof['department_name']
                }
                result.push(temp)
              });
              return cb(null, result)
            }
          }
        }
      )
    })
    .catch((errObj)=>{
      return cb(errObj)
    })

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
      }
    ],
    returns: { arg: "result", type: "array" },
  });

  School.getTerms = function (ltx_school_id, cb) {
    // 空串错误检测
    if (!ltx_school_id){
      let errObj = new Error();
      errObj.name = "Invalid Query!";
      errObj.message = "Invalid Query!";
      errObj.status = 410;
      errObj.stack = ""
      return cb(errObj);
    }
    let schoolId;
    // 无效数据检测
    let schoolValidation = new Promise((resolve, reject) => {
      School.findOne(
        {
          where: {"ltx_school_id": ltx_school_id}
        },
        function(err, schoolInstance){
          if(err || !schoolInstance){
            let errObj = new Error();
            errObj.name = "Invalid school id";
            errObj.message = "Invalid school id";
            errObj.status = 411;
            errObj.stack = ""
            reject(errObj)
          }else{
            schoolId = schoolInstance.id;
            resolve(true)
          }
        }
      )
    })

    
    Promise.all([schoolValidation])
    .then(()=>{
      app.models.Term.find({},
        function(err, termInstance){
          if(err){
            console.log(err)
            return cb(err)
          }else{
            if(termInstance){
              return cb(null, termInstance);
            }
          }
        }
      )
    })
    .catch((errObj)=>{
      return cb(errObj)
    })
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
