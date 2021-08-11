### 不会过期的 accessToken:
  - call api前请设置accessToken, 在代码中则把access_token作为变量
  - 4u2jFQom3aPzxoaSDQHrVsC0bTWVngsRMYXukfILfoKhP3hrs07aaXftdccU1BDL

### 所有数据都是模板，没有连接数据库

### 测试error code:
  - 把id变量设成1即可测试错误代码



I. 空位提醒

1. [POST /users/getWatchList](/explorer/#!/user/user_getWatchList)

  - For ltx_userid!="1"

    ```js
    {
      "result": [
        {
          "_id": "1",
          "course_name": "CS121",
          "course_code": "12345",
          "class_day": [
            "W",
            "M",
            "F"
          ],
          "start_time": "10:00",
          "end_time": "11:00",
          "status": "OPEN"
        },
        {
          "_id": "2",
          "course_name": "CS122",
          "course_code": "54321",
          "class_day": [
            "Tu",
            "Th"
          ],
          "start_time": "9:00",
          "end_time": "10:00",
          "status": "FULL"
        }
      ]
    }
    ```

  - If want to simulate an invalid ltx_userid, just let ltx_userid="1" and run it to get result **(Error 404)**

    ```js
    {
      "error": {
        "statusCode": 404,
        "name": "User Not Exist",
        "message": "User Not Exist",
        "status": 404,
        "stack": "User Not Exist: User Not Exist\n    ..."
      }
    }
    ```

2. [POST /schools/getAllDepts](explorer/#!/school/school_getAllDepts)

  - For ltx_school_id!="1":

    ```js
    {
      "result": [
        {
          "_id": "1",
          "dept_name": "Computer Science",
          "dept_name_abbrev": "CS"
        },
        {
          "_id": "2",
          "dept_name": "Mathematics",
          "dept_name_abbrev": "Math"
        }
      ]
    }
    ```

  - If want to simulate an invalid ltx_school_id, just let ltx_school_id="1" and run it to get result **(Error 404)**

    ```js
    {
      "error": {
        "statusCode": 404,
        "name": "School Not Exist",
        "message": "School Not Exist",
        "status": 404,
        "stack": "School Not Exist: School Not Exist\n    ..."
      }
    }
    ```

3. [POST /departments/getCourseNames](explorer/#!/department/department_getCourseNames)

  - For dept_id!="1":

    ```js
    {
      "result": [
        {
          "_id": "1",
          "course_name": "ICS 31",
          "description": "Introduction to Python",
          "enrolled_percent": "50"
        },
        {
          "_id": "2",
          "course_name": "ICS 33",
          "description": "Advanced Python",
          "enrolled_percent": "90"
        }
      ]
    }
    ```

  - If want to simulate an invalid dept_id, just let dept_id="1" and run it to get result **(Error 404)**:

    ```js
    {
      "error": {
        "statusCode": 404,
        "name": "Department Not Exist",
        "message": "Department Not Exist",
        "status": 404,
        "stack": "Department Not Exist: Department Not Exist\n    "
      }
    }
    ```

4. [POST /course_names/getCourseSections](explorer/#!/course95name/course_name_getCourseSections)

  - For course_name_id!="1":

    ```js
    {
      "result": [
        {
          "_id": "1",
          "course_code": "12345",
          "section": "A",
          "course_type": "Lec",
          "class_day": [
            "M",
            "W",
            "F"
          ],
          "start_time": "10:00",
          "end_time": "11:00",
          "enrolled_percent": "50"
        },
        {
          "_id": "2",
          "course_code": "54321",
          "section": "Z",
          "course_type": "Dis",
          "class_day": [
            "M",
            "W"
          ],
          "start_time": "9:00",
          "end_time": "10:00",
          "enrolled_percent": "70"
        }
      ]
    }
    ```

  - If want to simulate an invalid course_name_id, just let course_name_id="1" and run it to get result **(Error 404)**:

    ```js
    {
      "error": {
        "statusCode": 404,
        "name": "CourseName Not Exist",
        "message": "CourseName Not Exist",
        "status": 404,
        "stack": "CourseName Not Exist: CourseName Not Exist\n    ..."
      }
    }
    ```

5. [POST /users/addToWatchList](explorer/#!/user/user_addToWatchList)

  - For ltx_userid!=1 and crawl_course_id!=1:

    ```js
    {
      "result": "success"
    }
    ```

  - For ltx_userid=1 **(Error 404)**:

    ```js
    {
      "error": {
        "statusCode": 404,
        "name": "User Not Exist",
        "message": "User Not Exist",
        "status": 404,
        "stack": "User Not Exist: User Not Exist\n    ..."
      }
    }
    ```

  - For crawl_course_id=1 **(Error 405)**:

    ```js
    {
      "error": {
        "statusCode": 405,
        "name": "Course Not Exist",
        "message": "Course Not Exist",
        "status": 405,
        "stack": "Course Not Exist: Course Not Exist\n    ..."
      }
    }
    ```

6. [POST /crawl_courses/getCrawledCourseDetails](explorer/#!/crawl95course/crawl_course_getCrawledCourseDetails)

  - For crawl_course_id!=1:

    ```js
    {
      "result": {
        "professor_name": "Junling Fu",
        "course_name": "Introduction of Bolun",
        "course_num": "12345",
        "description": "Want to be a billionaire? Learn Bolun's success by Fu",
        "class_day": [
          "M",
          "Tu",
          "W",
          "Th",
          "F",
          "Sa",
          "Su"
        ],
        "start_time": "01:00",
        "end_time": "23:00",
        "place": "Sky House",
        "grade": {
          "gpa_avg": "3.89",
          "grade_a_count": 90,
          "grade_b_count": 5,
          "grade_c_count": 3,
          "grade_d_count": 1,
          "grade_f_count": 0,
          "grade_p_count": 4,
          "grade_np_count": 2
        },
        "all_grades": {
          "gpa_avg": "1.22",
          "grade_a_count": 91,
          "grade_b_count": 10,
          "grade_c_count": 15,
          "grade_d_count": 378,
          "grade_f_count": 753,
          "grade_p_count": 13,
          "grade_np_count": 521
        },
        "reviews": [
          {
            "created": "2020-10-11T00:00:00.000Z",
            "is_online": false,
            "need_textbook": true,
            "course_difficulty": 4,
            "course_recommend": 5,
            "prof_rate": 5,
            "prof_recommend": 5,
            "content": "This is the best class I have with Fu, he made this super hard class in a easier way which make me become a billionaire in just one month!",
            "mandatary": true,
            "grade_received": "A+",
            "selected_labels": [
              "Respect",
              "Easy grade"
            ],
            "thumbs_up": 736,
            "thumbs_down": 23
          },
          {
            "created": "2019-05-02T04:00:00.000Z",
            "is_online": false,
            "need_textbook": true,
            "course_difficulty": 5,
            "course_recommend": 2,
            "prof_rate": 2,
            "prof_recommend": 2,
            "content": "Worst course I ever have, not recommend",
            "mandatary": true,
            "grade_received": "F",
            "selected_labels": [
              "Lots of homework"
            ],
            "thumbs_up": 1,
            "thumbs_down": 7893
          }
        ]
      }
    }
    ```

  - For crawl_course_id=1 **(Error 404)**:

    ```js
    {
      "error": {
        "statusCode": 404,
        "name": "Course Not Exist",
        "message": "Course Not Exist",
        "status": 404,
        "stack": "Course Not Exist: Course Not Exist\n    ..."
      }
    }
    ```

7. [POST /users/removeFromWatchList](http://localhost:3000/explorer/#!/user/user_removeFromWatchList)

  - For ltx_userid!=1 and crawl_course_id!=1:

    ```js
    {
      "result": "success"
    }
    ```

  - For ltx_userid=1 **(Error 404)**:

    ```js
    {
      "error": {
        "statusCode": 404,
        "name": "User Not Exist",
        "message": "User Not Exist",
        "status": 404,
        "stack": "User Not Exist: User Not Exist\n    ..."
      }
    }
    ```

  - For crawl_course_id=1 **(Error 405)**:

    ```js
    {
      "error": {
        "statusCode": 405,
        "name": "Course Not Exist",
        "message": "Course Not Exist",
        "status": 405,
        "stack": "Course Not Exist: Course Not Exist\n    ..."
      }
    }
    ```

II. 成绩分布

1. 6-9 选课助手-成绩公布
2. 6-8 选择学科和课号
3. 6-12 searchProfessor()
4. sortby: a/avg_gpa, b/reviews_score

III. 课程评价

1. rateCourse()
