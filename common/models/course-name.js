"use strict";

module.exports = function (Coursename) {
  Coursename.getCourseSections = function (
    course_name_id,
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
        errObj.name = "Invalid course name";
        errObj.message = "Invalid course name";
        errObj.status = 411;
        return cb(errObj);
      } else if (error_test == 3) {
        errObj.name = "Empty list";
        errObj.message = "Empty list";
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
        crawl_course_id: "1",
        course_section: "A",
        course_code: "34000",
        class_day: ["Tu", "Th"],
        start_time: "14:00",
        end_time: "15:20",
        enrolled_percent: "77.00",
        course_type: "LEC",
      },
      {
        crawl_course_id: "1",
        course_section: "A",
        course_code: "34000",
        class_day: ["Tu", "Th"],
        start_time: "14:00",
        end_time: "15:20",
        enrolled_percent: "77.00",
        course_type: "LEC",
      },
    ];
    return cb(null, template);
  };

  Coursename.remoteMethod("getCourseSections", {
    description:
      "6-4 获取课程所有分节, 该API用于6-4页面获取课程所有分节列表，请求需要包含“6-3获取课程名称列表”请求返回的course_name_id，返回值包含一个状态code和data。\ndata的格式为array of object, 其中包含多个学科名称，按照字符串中数字从小到大排序（请求返回值已完成排序）",
    http: { path: "/getCourseSections", verb: "post" },
    accepts: [
      {
        arg: "course_name_id",
        type: "string",
        required: true,
        description: "6-3获取课程名称列表”请求返回的id",
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

  Coursename.getHistoryGrades = function (
    course_name_ids,
    prof_id,
    user_id,
    error_test,
    cb
  ) {
    if (!course_name_ids && !prof_id) {
      let errObj = new Error();
      errObj.name = "Empty field";
      errObj.message = "Empty field";
      errObj.status = 422;
      return cb(errObj);
    }

    if (error_test) {
      let errObj = new Error();
      if (error_test == 1) {
        errObj.name = "Invalid user";
        errObj.message = "Invalid user";
        errObj.status = 410;
        return cb(errObj);
      } else if (error_test == 2) {
        errObj.name = "Empty field";
        errObj.message = "Empty field";
        errObj.status = 422;
        return cb(errObj);
      } else if (error_test == 3) {
        errObj.name = "Empty list but maybe have some";
        errObj.message = "Empty list but maybe have some";
        errObj.status = 421;
        return cb(errObj);
      } else {
        errObj.name = "Invalid error test";
        errObj.message = "Invalid error test";
        errObj.status = 499;
        return cb(errObj);
      }
    }
    let template = {
      query_grades_all: [
        {
          query_name: "IN4MX 43",
          query_gpa_avg: "3.7",
          query_difficulty: "3.5",
          
        },
        {
          query_name: "I&C SCI 32",
          query_gpa_avg: "2.1",
          query_difficulty: "4.6",
        }
      ],
      course_grades: [
        {
          static_course_id: "603502e021778663b01a9701",
          year_term: "Spring 2021",
          static_course_name: "IN4MX 43",
          prof_id: "603502e021778663b01a974f",
          prof_name: "Sahranavard N.",
          course_avg_gpa: 3.2,
          recommend_rate: 4.3
        },
        {
          static_course_id: "603502e021778663b01a9702",
          year_term: "Winter 2020",
          static_course_name: "IN4MX 43",
          prof_id: "603502e021778663b01a974f",
          prof_name: "Ziv, H.",
          course_avg_gpa: 2.5,
          recommend_rate: 4.3
        }
      ]
    };
    return cb(null, template);
  };

  Coursename.remoteMethod("getHistoryGrades", {
    description:
      "6-13 查询成绩分布 , 该API用于6-13页面“立即查询“按钮，返回参数显示在6-14页面。\n\n学科和课号“回显”dept_name + static_course_name。",
    http: { path: "/getHistoryGrades", verb: "post" },
    accepts: [
      {
        arg: "course_name_ids",
        type: "string",
        required: false,
        description: "array of 课程ID",
      },
      {
        arg: "prof_id",
        type: "string",
        required: false,
        description: "教授ID",
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
    returns: { arg: "result", type: "object" },
  });
  Coursename.disableRemoteMethodByName("upsert"); // disables PATCH /course_names
  Coursename.disableRemoteMethodByName("find"); // disables GET /course_names
  Coursename.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /course_names
  Coursename.disableRemoteMethodByName("create"); // disables POST /course_names
  Coursename.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /course_names/{id}
  Coursename.disableRemoteMethodByName("findById"); // disables GET /course_names/{id}
  Coursename.disableRemoteMethodByName("exists"); // disables HEAD /course_names/{id}
  Coursename.disableRemoteMethodByName("replaceById"); // disables PUT /course_names/{id}
  Coursename.disableRemoteMethodByName("deleteById"); // disables DELETE /course_names/{id}
  Coursename.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /course_names/change-stream
  Coursename.disableRemoteMethodByName("count"); // disables GET /course_names/count
  Coursename.disableRemoteMethodByName("findOne"); // disables GET /course_names/findOne
  Coursename.disableRemoteMethodByName("update"); // disables POST /course_names/update
  Coursename.disableRemoteMethodByName("upsertWithWhere"); // disables POST /course_names/upsertWithWhere
  Coursename.disableRemoteMethodByName("prototype.__get__crawl_courses"); //disables GET /course_names/{id}/crawl_courses
  Coursename.disableRemoteMethodByName("prototype.__create__crawl_courses"); //disables POST /course_names/{id}/crawl_courses
  Coursename.disableRemoteMethodByName("prototype.__delete__crawl_courses"); //disables DELETE /course_names/{id}/crawl_courses
  Coursename.disableRemoteMethodByName("prototype.__findById__crawl_courses"); //disables GET /course_names/{id}/crawl_courses/{fk}
  Coursename.disableRemoteMethodByName("prototype.__updateById__crawl_courses"); //disables PUT /course_names/{id}/crawl_courses/{fk}
  Coursename.disableRemoteMethodByName(
    "prototype.__destroyById__crawl_courses"
  ); //disables DELETE /course_names/{id}/crawl_courses/{fk}
  Coursename.disableRemoteMethodByName("prototype.__count__crawl_courses"); //disables GET /course_names/{id}/crawl_courses/count
  Coursename.disableRemoteMethodByName("prototype.__get__professors"); //disables GET /course_names/{id}/professors
  Coursename.disableRemoteMethodByName("prototype.__create__professors"); //disables POST /course_names/{id}/professors
  Coursename.disableRemoteMethodByName("prototype.__delete__professors"); //disables DELETE /course_names/{id}/professors
  Coursename.disableRemoteMethodByName("prototype.__findById__professors"); //disables GET /course_names/{id}/professors/{fk}
  Coursename.disableRemoteMethodByName("prototype.__updateById__professors"); //disables PUT /course_names/{id}/professors/{fk}
  Coursename.disableRemoteMethodByName("prototype.__destroyById__professors"); //disables DELETE /course_names/{id}/professors/{fk}
  Coursename.disableRemoteMethodByName("prototype.__count__professors"); //disables GET /course_names/{id}/professors/count
  Coursename.disableRemoteMethodByName("prototype.__exists__professors"); //disables HEAD /course_names/{id}/professors/rel/{fk}
  Coursename.disableRemoteMethodByName("prototype.__link__professors"); //disable PUT /course_names/{id}/professors/rel/{fk}
  Coursename.disableRemoteMethodByName("prototype.__unlink__professors"); //disable DELETE /course_names/{id}/professors/rel/{fk}
  Coursename.disableRemoteMethodByName("prototype.__get__static_courses"); //disables GET /course_names/{id}/static_courses
  Coursename.disableRemoteMethodByName("prototype.__create__static_courses"); //disables POST /course_names/{id}/static_courses
  Coursename.disableRemoteMethodByName("prototype.__delete__static_courses"); //disables DELETE /course_names/{id}/static_courses
  Coursename.disableRemoteMethodByName("prototype.__findById__static_courses"); //disables GET /course_names/{id}/static_courses/{fk}
  Coursename.disableRemoteMethodByName(
    "prototype.__updateById__static_courses"
  ); //disables PUT /course_names/{id}/static_courses/{fk}
  Coursename.disableRemoteMethodByName(
    "prototype.__destroyById__static_courses"
  ); //disables DELETE /course_names/{id}/static_courses/{fk}
  Coursename.disableRemoteMethodByName("prototype.__count__static_courses"); //disables GET /course_names/{id}/static_courses/count
  Coursename.disableRemoteMethodByName("prototype.__get__users"); //disables GET /course_names/{id}/users
  Coursename.disableRemoteMethodByName("prototype.__create__users"); //disables POST /course_names/{id}/users
  Coursename.disableRemoteMethodByName("prototype.__delete__users"); //disables DELETE /course_names/{id}/users
  Coursename.disableRemoteMethodByName("prototype.__findById__users"); //disables GET /course_names/{id}/users/{fk}
  Coursename.disableRemoteMethodByName("prototype.__updateById__users"); //disables PUT /course_names/{id}/users/{fk}
  Coursename.disableRemoteMethodByName("prototype.__destroyById__users"); //disables DELETE /course_names/{id}/users/{fk}
  Coursename.disableRemoteMethodByName("prototype.__count__users"); //disables GET /course_names/{id}/users/count
  Coursename.disableRemoteMethodByName("prototype.__exists__users"); //disables HEAD /course_names/{id}/users/rel/{fk}
  Coursename.disableRemoteMethodByName("prototype.__link__users"); //disable PUT /course_names/{id}/users/rel/{fk}
  Coursename.disableRemoteMethodByName("prototype.__unlink__users"); //disable DELETE /course_names/{id}/users/rel/{fk}
};
