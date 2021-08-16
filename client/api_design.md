### 不会过期的 accessToken:

- call api 前请设置 accessToken, 在代码中则把 access_token 作为变量
- 4u2jFQom3aPzxoaSDQHrVsC0bTWVngsRMYXukfILfoKhP3hrs07aaXftdccU1BDL
- 每个api请测试token有误的情况

### 所有数据都是模板，没有连接数据库

### 测试api流程：
- 展开api，点击链接，
- 进入新的页面在右上角填入access_token （如果之前没填token的话）
- 然后在api下面填写必填的变量后点`Try it out!` 即可测试

### 测试 error code:

- 每个api有选填到error_test， 类型是数字，根据每个api底下有的error_test的数量进行测试
- 如果填错error_test则会以499返回
- 返回的error格式为 (以410举例):
```js
{
  "error": {
    "statusCode": 410,
    "name": "Invalid user",
    "message": "Invalid user",
    "status": 410,
    "stack": "Invalid user: Invalid user\n    ..."
  }
}
```

```
400: xxx is a required argument
401: Authorization Required, need token or update token

410: Invalid user
411: Invalid school
412: Invalid department
413: Invalid course name
414: Invalid crawl course
415: Invalid professor
416: Invalid static course
417: Invalid review

420: Empty list but it should not be empty
421: Empty list but maybe have some
422: Empty field (need to implement at least one of optional field)

499: Invalid error test
```

## 空位提醒

<details><summary>6-1 获取提醒列表</summary>

[POST /users/getWatchList](/explorer/#!/user/user_getWatchList)
- error_test: 
  - 1: 410
  - 2: 421

|**变量名**|**解释**|
|---------|--------|
|xxx|xxx|
|xxx|xxx|

```js
{
  "result": [
    {
      "course_id": "1",
      "course_name": "ECON 100A",
      "course_section": "A",
      "course_code": "20012",
      "class_day": [
        "Tu",
        "Th"
      ],
      "start_time": "9:30",
      "end_time": "10:50",
      "status": "FULL"
    },
    {
      "course_id": "2",
      "course_name": "ECON 100A",
      "course_section": "1",
      "course_code": "20013",
      "class_day": [
        "Tu",
        "Th"
      ],
      "start_time": "9:30",
      "end_time": "10:50",
      "status": "OPEN"
    }
  ]
}
```

</details>
<details><summary>6-2 获取所有学科</summary>

[POST /schools/getAllDepts](explorer/#!/school/school_getAllDepts)
- error_test: 
  - 1: 410
  - 2: 411
  - 3: 420

```js
{
  "result": [
    {
      "dept_id": "1",
      "dept_name": "Computer Science",
      "dept_name_abbrev": "COMPSCI"
    },
    {
      "dept_id": "2",
      "dept_name": "Academic English",
      "dept_name_abbrev": "AC ENG"
    }
  ]
}
```

</details>
<details><summary>6-3 获取课程名称列表</summary>

[POST /departments/getCourseNames](explorer/#!/department/department_getCourseNames)
- error_test:
  - 1: 410
  - 2: 412
  - 3: 420

```js
{
  "result": [
    {
      "course_name_id": "1",
      "course_name": "COMPSCI 105",
      "description": "ADV PROD C  ",
      "enrolled_percent": "77.00"
    },
    {
      "course_name_id": "2",
      "course_name": "COMPSCI 105",
      "description": "ADV PROD C  ",
      "enrolled_percent": "77.00"
    }
  ]
}
```
</details>

<details><summary>6-4 获取课程所有分节</summary>

[POST /course_names/getCourseSections](explorer/#!/course95name/course_name_getCourseSections)
- error_test:
  - 1: 410
  - 2: 411
  - 3: 420

```js
{
  "result": [
    {
      "crawl_course_id": "1",
      "course_section": "A",
      "course_code": "34000",
      "class_day": [
        "Tu",
        "Th"
      ],
      "start_time": "14:00",
      "end_time": "15:20",
      "enrolled_percent": "77.00",
      "course_type": "LEC"
    },
    {
      "crawl_course_id": "1",
      "course_section": "A",
      "course_code": "34000",
      "class_day": [
        "Tu",
        "Th"
      ],
      "start_time": "14:00",
      "end_time": "15:20",
      "enrolled_percent": "77.00",
      "course_type": "LEC"
    }
  ]
}
```
</details>

<details><summary>6-4/6-6 添加课程到提醒列表</summary>

[POST /users/addToWatchList](explorer/#!/user/user_addToWatchList)
- error_test:
  - 1: 410
  - 2: 414

```js
{
  "result": "success"
}
```
</details>

<details><summary>6-6 获取爬取课程详情</summary>

[POST /crawl_courses/getCrawledCourseDetails](explorer/#!/crawl95course/crawl_course_getCrawledCourseDetails)
- error_test:
  - 1: 410
  - 2: 414

```js
{
  "result": {
    "crawl_course_id": "603502e021778663b01a974f",
    "coursename_id": "603502e021778663b01a974f",
    "description": "ADV PROD C  ",
    "prof_id": "603502e021778663b01a974f",
    "professor_name": "Klefstad, R.",
    "course_name": "COMPSCI 103",
    "class_day": "TuTh",
    "start_time": "14:00",
    "end_time": "15:20",
    "place": "VTLREMOTE",
    "course_num": "34000",
    "capacity": 100,
    "course_grades": {
      "gpa_avg": 2.89,
      "grade_a_count": 90,
      "grade_b_count": 5,
      "grade_c_count": 3,
      "grade_d_count": 1,
      "grade_f_count": 0,
      "grade_p_count": 4,
      "grade_np_count": 2
    },
    "all_grades": {
      "gpa_avg": 3.21,
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
        "review_id": "603502e021778663b01a974f",
        "created": "2020-10-11T00:00:00.000Z",
        "attendance": "Not Mandatary",
        "is_online": "Yes",
        "grade_received": "A- ",
        "selected_labels": [
          "作业太多",
          "Respect",
          "CLEAR GRADING CRITERIA"
        ],
        "recomend_rate": 3,
        "difficulty_rate": 3,
        "content": "Klefstad的逻辑太让人头大了，所有人都在抱怨这节课，总的来说这节课不算太难，不需要上lec和discurssion。",
        "thumbs_up": 12,
        "thumbs_down": 4
      },
      {
        "review_id": "603502e021778663b01a974f",
        "created": "2020-10-11T00:00:00.000Z",
        "attendance": "Not Mandatary",
        "is_online": "Yes",
        "grade_received": "A- ",
        "selected_labels": [
          "作业太多",
          "Respect",
          "CLEAR GRADING CRITERIA"
        ],
        "recomend_rate": 3,
        "difficulty_rate": 3,
        "content": "Klefstad的逻辑太让人头大了，所有人都在抱怨这节课，总的来说这节课不算太难，不需要上lec和discurssion。",
        "thumbs_up": 12,
        "thumbs_down": 4
      },
      {}
    ]
  }
}
```
</details>

<details><summary>6-4/6-7 从提醒列表移出课程</summary>

[POST /users/removeFromWatchList](explorer/#!/user/user_removeFromWatchList)
- error_test:
  - 1: 410
  - 2: 414

```js
{
  "result": "success"
}
```
</details>

## 成绩分布

<details><summary>6-8获取所有专业+课程</summary>

[POST /schools/getCourseNames](explorer/#!/school/school_getCourseNames)
- error_test:
  - 1: 410
  - 2: 411
  - 3: 420

```js
{
  "result": [
    {
      "dept_id": "603502e021778663b01a974f",
      "dept_name_abbrev": "AC ENG",
      "dept_name": "Academic English",
      "dept_courses": [
        {
          "static_course_id": "603502e021778663b01a974f",
          "static_course_name": "20B"
        },
        {
          "static_course_id": "603502e021778663b01a974f",
          "static_course_name": "22A"
        }
      ]
    },
    {
      "dept_id": "603502e021778663b01a974f",
      "dept_name_abbrev": "ANATOMY",
      "dept_name": "Anatomy and Neurobiology",
      "dept_courses": [
        {
          "static_course_id": "603502e021778663b01a974f",
          "static_course_name": "2A"
        },
        {
          "static_course_id": "603502e021778663b01a974f",
          "static_course_name": "2B"
        }
      ]
    }
  ]
}
```
</details>

<details><summary>6-8搜索教授</summary>

[POST /schools/searchProfs](explorer/#!/school/school_searchProfs_post_schools_searchProfs)
- error_test:
  - 1: 410
  - 2: 411
  - 3: 421

```js
{
  "result": [
    {
      "prof_id": "603502e021778663b01a974f",
      "prof_name": "Peter, W.",
      "belong_dept_name": "ANTHRO"
    },
    {
      "prof_id": "603502e021778663b01a974f",
      "prof_name": "Pattis, R.",
      "belong_dept_name": "COMPSCI"
    }
  ]
}
```
</details>

<details><summary>6-13查询成绩分布</summary>

[POST /course_names/getHistoryGrades](explorer/#!/course95name/course_name_getHistoryGrades)
- error_test:
  - 1: 410
  - 2: 422 (course_name_ids 和 prof_id不能同时为空)
  - 3: 421

```js
{
  "result": {
    "query_grades_all": [
      {
        "query_name": "IN4MX 43",
        "query_gpa_avg": "3.7",
        "query_difficulty": "3.5",
        
      },
      {
        "query_name": "I&C SCI 32",
        "query_gpa_avg": "2.1",
        "query_difficulty": "4.6",
      }
    ],
    "course_grades": [
      {
        "static_course_id": "603502e021778663b01a974f",
        "year_term": "Spring 2021",
        "static_course_name": "IN4MX 43",
        "prof_id": "603502e021778663b01a974f",
        "prof_name": "Sahranavard N.",
        "course_avg_gpa": 3.2,
        "recommend_rate": 4.3
      },
      {
        "static_course_id": "603502e021778663b01a974f",
        "year_term": "Winter 2020",
        "static_course_name": "IN4MX 43",
        "prof_id": "603502e021778663b01a974f",
        "prof_name": "Ziv, H.",
        "course_avg_gpa": 2.5,
        "recommend_rate": 4.3
      }
    ]
  }
}
```
</details>

<details><summary>6-14-1获取静态课程详情</summary>

[POST /static_courses/getCourseDetails](explorer/#!/static95course/static_course_getCourseDetails)
- error_test:
  - 1: 410
  - 2: 415
  - 3: 416

```js
{
  "result": {
    "static_course_id": "603502e021778663b01a974f",
    "coursename_id": "603502e021778663b01a974f",
    "description": "ADV PROD C  ",
    "professor_name": "Klefstad, R.",
    "course_name": "COMPSCI 103",
    "class_day": "TuTh",
    "start_time": "14:00",
    "end_time": "15:20",
    "place": "VTLREMOTE",
    "course_num": "34000",
    "capacity": 100,
    "course_grades": {
      "gpa_avg": "2.89",
      "grade_a_count": 90,
      "grade_b_count": 5,
      "grade_c_count": 3,
      "grade_d_count": 1,
      "grade_f_count": 0,
      "grade_p_count": 4,
      "grade_np_count": 2
    },
    "all_grades": {
      "gpa_avg": "3.21",
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
        "attendance": "Not Mandatary",
        "is_online": "No",
        "grade_received": "A ",
        "selected_labels": [
          "Respect",
          "Easy grade"
        ],
        "recomend_rate": 3,
        "difficulty_rate": 3,
        "content": "Klefstad的逻辑太让人头大了，所有人都在抱怨这节课，总的来说这节课不算太难，不需要上lec和discurssion。",
        "thumbs_up": 12,
        "thumbs_down": 0
      },
      {
        "created": "2019-05-02T04:00:00.000Z",
        "attendance": "Not Mandatary",
        "is_online": "No",
        "grade_received": "A ",
        "selected_labels": [
          "Respect",
          "Easy grade"
        ],
        "recomend_rate": 3,
        "difficulty_rate": 3,
        "content": "Klefstad的逻辑太让人头大了，所有人都在抱怨这节课，总的来说这节课不算太难，不需要上lec和discurssion。",
        "thumbs_up": 12,
        "thumbs_down": 0
      }
    ]
  }
}
```
</details>

## 评价课程

<details><summary>6-16 搜索教授</summary>

[POST /schools/searchProfs](explorer/#!/school/school_searchProfs_post_schools_searchProfs)
- error_test:
  - 1: 410
  - 2: 411
  - 3: 421

```js
{
  "result": [
    {
      "prof_id": "603502e021778663b01a974f",
      "prof_name": "Peter, W.",
      "belong_dept_name": "ANTHRO"
    },
    {
      "prof_id": "603502e021778663b01a974f",
      "prof_name": "Pattis, R.",
      "belong_dept_name": "COMPSCI"
    }
  ]
}
```
</details>

<details><summary>评论点踩</summary>

[POST /reviews/thumbsDown](explorer/#!/review/review_thumbsDown)
- error_test:
  - 1: 410
  - 2: 417

```js
{
  "result": "success"
}
```
</details>

<details><summary>评论举报</summary>

[POST /reviews/report](explorer/#!/review/review_report)
- error_test:
  - 1: 410
  - 2: 417

```js
{
  "result": "success"
}
```
</details>

<details><summary>6-15 评价课程</summary>

[POST /reviews/rateCourse](explorer/#!/review/review_rateCourse)
- error_test:
  - 1: 410
  - 2: 413
  - 3: 415

```js
{
  "result": "success"
}
```
</details>

<details><summary>6-17 选择课程</summary>

[POST /professors/searchCourseByProf](explorer/#!/professor/professor_searchCourseByProf)
- error_test:
  - 1: 410
  - 2: 411
  - 3: 415
  - 4: 420

```js
{
  "result": [
    {
      "prof_id": "603502e021778663b01a974f",
      "prof_name": "Peter, A."
    },
    {
      "prof_id": "603502e021778663b01a974f",
      "prof_name": "Pattis, R."
    }
  ]
}
```
</details>

<details><summary>评论点赞</summary>

[POST /reviews/thumbsUp](explorer/#!/review/review_thumbsUp)
- error_test:
  - 1: 410
  - 2: 417

```js
{
  "result": "success"
}
```
</details>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>