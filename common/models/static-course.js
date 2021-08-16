"use strict";

module.exports = function (Staticcourse) {
  Staticcourse.getCourseDetails = function (
    prof_id,
    static_course_id,
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
        errObj.name = "Invalid professor";
        errObj.message = "Invalid professor";
        errObj.status = 415;
        return cb(errObj);
      } else if (error_test == 3) {
        errObj.name = "Invalid static course";
        errObj.message = "Invalid static course";
        errObj.status = 416;
        return cb(errObj);
      } else {
        errObj.name = "Invalid error test";
        errObj.message = "Invalid error test";
        errObj.status = 499;
        return cb(errObj);
      }
    }

    let template = {
      static_course_id: "603502e021778663b01a974f",
      coursename_id: "603502e021778663b01a974f",
      description: "ADV PROD C  ",
      professor_name: "Klefstad, R.",
      course_name: "COMPSCI 103",
      class_day: "TuTh",
      start_time: "14:00",
      end_time: "15:20",
      place: "VTLREMOTE",
      course_num: "34000",
      capacity: 100,
      course_grades: {
        gpa_avg: "2.89",
        grade_a_count: 90,
        grade_b_count: 5,
        grade_c_count: 3,
        grade_d_count: 1,
        grade_f_count: 0,
        grade_p_count: 4,
        grade_np_count: 2,
      },
      all_grades: {
        gpa_avg: "3.21",
        grade_a_count: 91,
        grade_b_count: 10,
        grade_c_count: 15,
        grade_d_count: 378,
        grade_f_count: 753,
        grade_p_count: 13,
        grade_np_count: 521,
      },
      reviews: [
        {
          created: "2020-10-11T00:00:00.000Z",
          attendance: "Not Mandatary",
          is_online: "No",
          grade_received: "A ",
          selected_labels: ["Respect", "Easy grade"],
          recomend_rate: 3,
          difficulty_rate: 3,
          content:
            "Klefstad的逻辑太让人头大了，所有人都在抱怨这节课，总的来说这节课不算太难，不需要上lec和discurssion。",
          thumbs_up: 12,
          thumbs_down: 0,
        },
        {
          created: "2019-05-02T04:00:00.000Z",
          attendance: "Not Mandatary",
          is_online: "No",
          grade_received: "A ",
          selected_labels: ["Respect", "Easy grade"],
          recomend_rate: 3,
          difficulty_rate: 3,
          content:
            "Klefstad的逻辑太让人头大了，所有人都在抱怨这节课，总的来说这节课不算太难，不需要上lec和discurssion。",
          thumbs_up: 12,
          thumbs_down: 0,
        },
      ],
    };
    return cb(null, template);
  };

  Staticcourse.remoteMethod("getCourseDetails", {
    description: "6-14-1 获取静态课程详情",
    http: { path: "/getCourseDetails", verb: "post" },
    accepts: [
      {
        arg: "prof_id",
        type: "array",
        required: true,
        description: "教授ID",
      },
      {
        arg: "static_course_id",
        type: "array",
        required: true,
        description: "静态课程ID",
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

  Staticcourse.disableRemoteMethodByName("upsert"); // disables PATCH /static_courses
  Staticcourse.disableRemoteMethodByName("find"); // disables GET /static_courses
  Staticcourse.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /static_courses
  Staticcourse.disableRemoteMethodByName("create"); // disables POST /static_courses
  Staticcourse.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /static_courses/{id}
  Staticcourse.disableRemoteMethodByName("findById"); // disables GET /static_courses/{id}
  Staticcourse.disableRemoteMethodByName("exists"); // disables HEAD /static_courses/{id}
  Staticcourse.disableRemoteMethodByName("replaceById"); // disables PUT /static_courses/{id}
  Staticcourse.disableRemoteMethodByName("deleteById"); // disables DELETE /static_courses/{id}
  Staticcourse.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /static_courses/change-stream
  Staticcourse.disableRemoteMethodByName("count"); // disables GET /static_courses/count
  Staticcourse.disableRemoteMethodByName("findOne"); // disables GET /static_courses/findOne
  Staticcourse.disableRemoteMethodByName("update"); // disables POST /static_courses/update
  Staticcourse.disableRemoteMethodByName("upsertWithWhere"); // disables POST /static_courses/upsertWithWhere
  Staticcourse.disableRemoteMethodByName("prototype.__get__course_name"); //disables GET /static_courses/{id}/course_name
  Staticcourse.disableRemoteMethodByName("prototype.__get__professor"); //disables GET /static_courses/{id}/professor
  Staticcourse.disableRemoteMethodByName("prototype.__get__year_term"); //disables GET /static_courses/{id}/year_term
};
