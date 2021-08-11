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
      professor_name: "Junling Fu",
      course_name: "Introduction of Bolun",
      course_num: "12345",
      description: "Want to be a billionaire? Learn Bolun's success by Fu",
      class_day: ["M", "Tu", "W", "Th", "F", "Sa", "Su"],
      start_time: "01:00",
      end_time: "23:00",
      place: "Sky House",
      grade: {
        gpa_avg: "3.89",
        grade_a_count: 90,
        grade_b_count: 5,
        grade_c_count: 3,
        grade_d_count: 1,
        grade_f_count: 0,
        grade_p_count: 4,
        grade_np_count: 2,
      },
      all_grades: {
        gpa_avg: "1.22",
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
          created: new Date("2020-10-11"),
          is_online: false,
          need_textbook:true,
          course_difficulty: 4,
          course_recommend: 5,
          prof_rate: 5,
          prof_recommend: 5,
          content: "This is the best class I have with Fu, he made this super hard class in a easier way which make me become a billionaire in just one month!",
          mandatary: true,
          grade_received: "A+",
          selected_labels: ["Respect","Easy grade"],
          thumbs_up: 736,
          thumbs_down: 23,
        },
        {
          created: new Date("2019-5-2"),
          is_online: false,
          need_textbook:true,
          course_difficulty: 5,
          course_recommend: 2,
          prof_rate: 2,
          prof_recommend: 2,
          content: "Worst course I ever have, not recommend",
          mandatary: true,
          grade_received: "F",
          selected_labels: ["Lots of homework"],
          thumbs_up: 1,
          thumbs_down: 7893,
        },
      ],
    };
    return cb(null, template);
  };

  Crawlcourse.remoteMethod("getCrawledCourseDetails", {
    description: "get detailed info for a crawled course",
    http: { path: "/getCrawledCourseDetails", verb: "post" },
    accepts: [{ arg: "crawl_course_id", type: "string", required: true }],
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
