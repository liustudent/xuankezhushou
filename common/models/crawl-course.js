"use strict";

module.exports = function (Crawlcourse) {
  Crawlcourse.getCrawledCourseDetails = function (crawl_course_id, cb) {
    if (crawl_course_id == "1") {
      let errObj = new Error();
      errObj.name = "Course Not Exist";
      errObj.message = "Course Not Exist";
      errObj.status = 404;
      return cb(errObj);
    }
    let template = {
      crawl_course_id: "603502e021778663b01a974f",
      coursename_id: "603502e021778663b01a974f",
      description: "ADV PROD C  ",
      prof_id: "603502e021778663b01a974f",
      professor_name: "Klefstad, R.",
      course_name: "COMPSCI 103",
      class_day: "TuTh",
      start_time: "14:00",
      end_time: "15:20",
      place: "VTLREMOTE",
      course_num: "34000",
      capacity: 100,
      course_grades: {
        gpa_avg: 2.89,
        grade_a_count: 90,
        grade_b_count: 5,
        grade_c_count: 3,
        grade_d_count: 1,
        grade_f_count: 0,
        grade_p_count: 4,
        grade_np_count: 2,
      },
      all_grades: {
        gpa_avg: 3.21,
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
          review_id: "603502e021778663b01a974f",
          created: "2020-10-11T00:00:00.000Z",
          attendance: "Not Mandatary",
          is_online: "Yes",
          grade_received: "A- ",
          selected_labels: ["作业太多", "Respect", "CLEAR GRADING CRITERIA"],
          recomend_rate: 3.0,
          difficulty_rate: 3.0,
          content:
            "Klefstad的逻辑太让人头大了，所有人都在抱怨这节课，总的来说这节课不算太难，不需要上lec和discurssion。",
          thumbs_up: 12,
          thumbs_down: 4,
        },
        {
          review_id: "603502e021778663b01a974f",
          created: "2020-10-11T00:00:00.000Z",
          attendance: "Not Mandatary",
          is_online: "Yes",
          grade_received: "A- ",
          selected_labels: ["作业太多", "Respect", "CLEAR GRADING CRITERIA"],
          recomend_rate: 3.0,
          difficulty_rate: 3.0,
          content:
            "Klefstad的逻辑太让人头大了，所有人都在抱怨这节课，总的来说这节课不算太难，不需要上lec和discurssion。",
          thumbs_up: 12,
          thumbs_down: 4,
        },
        {},
      ],
    };
    return cb(null, template);
  };

  Crawlcourse.remoteMethod("getCrawledCourseDetails", {
    description:
      "6-6 获取爬取课程详情, 该API用于6-6页面来获取爬取课程详情，请求需要包含“6-4获取课程所有分节”请求返回的crawl_course_id，返回值包含一个状态code和data。",
    http: { path: "/getCrawledCourseDetails", verb: "post" },
    accepts: [
      {
        arg: "crawl_course_id",
        type: "string",
        required: true,
        description: "爬取课程ID",
      },
    ],
    returns: { arg: "result", type: "object" },
  });
  Crawlcourse.disableRemoteMethodByName("upsert"); // disables PATCH /crawl_courses
  Crawlcourse.disableRemoteMethodByName("find"); // disables GET /crawl_courses
  Crawlcourse.disableRemoteMethodByName("replaceOrCreate"); // disables PUT /crawl_courses
  Crawlcourse.disableRemoteMethodByName("create"); // disables POST /crawl_courses
  Crawlcourse.disableRemoteMethodByName("prototype.updateAttributes"); // disables PATCH /crawl_courses/{id}
  Crawlcourse.disableRemoteMethodByName("findById"); // disables GET /crawl_courses/{id}
  Crawlcourse.disableRemoteMethodByName("exists"); // disables HEAD /crawl_courses/{id}
  Crawlcourse.disableRemoteMethodByName("replaceById"); // disables PUT /crawl_courses/{id}
  Crawlcourse.disableRemoteMethodByName("deleteById"); // disables DELETE /crawl_courses/{id}
  Crawlcourse.disableRemoteMethodByName("createChangeStream"); // disable GET and POST /crawl_courses/change-stream
  Crawlcourse.disableRemoteMethodByName("count"); // disables GET /crawl_courses/count
  Crawlcourse.disableRemoteMethodByName("findOne"); // disables GET /crawl_courses/findOne
  Crawlcourse.disableRemoteMethodByName("update"); // disables POST /crawl_courses/update
  Crawlcourse.disableRemoteMethodByName("upsertWithWhere"); // disables POST /crawl_courses/upsertWithWhere
  Crawlcourse.disableRemoteMethodByName("prototype.__get__course_name"); //disables GET /crawl_courses/{id}/course_name
  Crawlcourse.disableRemoteMethodByName("prototype.__get__professor"); //disables GET /crawl_courses/{id}/professor
  Crawlcourse.disableRemoteMethodByName("prototype.__get__year_term"); //disables GET /crawl_courses/{id}/year_term
};
