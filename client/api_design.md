### 不会过期的 accessToken:

- call api 前请设置 accessToken, 在代码中则把 access_token 作为变量
- 4u2jFQom3aPzxoaSDQHrVsC0bTWVngsRMYXukfILfoKhP3hrs07aaXftdccU1BDL

### 所有数据都是模板，没有连接数据库

### 测试 error code:

- 把 id 变量设成 1 即可测试错误代码

400: xxx is a required argument
401: Authorization Required, need token or update token

```
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

error_code = 1: 用户不存在 404

</details>
<details><summary>6-2 获取所有学科</summary>

[POST /schools/getAllDepts](explorer/#!/school/school_getAllDepts)

</details>
<details><summary>6-3 获取课程名称列表</summary>

[POST /departments/getCourseNames](explorer/#!/department/department_getCourseNames)

</details>

<details><summary>6-4 获取课程所有分节</summary>

[POST /course_names/getCourseSections](explorer/#!/course95name/course_name_getCourseSections)

</details>

<details><summary>6-4/6-6 添加课程到提醒列表</summary>

[POST /users/addToWatchList](explorer/#!/user/user_addToWatchList)

</details>

<details><summary>6-6 获取爬取课程详情</summary>

[POST /crawl_courses/getCrawledCourseDetails](explorer/#!/crawl95course/crawl_course_getCrawledCourseDetails)

</details>

<details><summary>6-4/6-7 从提醒列表移出课程</summary>

[POST /users/removeFromWatchList](explorer/#!/user/user_removeFromWatchList)

</details>

## 成绩分布

<details><summary>6-8获取所有专业+课程</summary>

[POST /schools/getCourseNames](explorer/#!/school/school_getCourseNames)

</details>

<details><summary>6-8搜索教授</summary>

[POST /schools/searchProfs](explorer/#!/school/school_searchProfs_post_schools_searchProfs)

</details>

<details><summary>6-13查询成绩分布</summary>

[POST /course_names/getHistoryGrades](explorer/#!/course95name/course_name_getHistoryGrades)

</details>

<details><summary>6-14-1获取静态课程详情</summary>

[POST /static_courses/getCourseDetails](explorer/#!/static95course/static_course_getCourseDetails)

</details>

## 评价课程

<details><summary>6-16 搜索教授</summary>

[POST /schools/searchProfs](explorer/#!/school/school_searchProfs_post_schools_searchProfs)

</details>

<details><summary>评论点踩</summary>

[POST /reviews/thumbsDown](explorer/#!/review/review_thumbsDown)

</details>

<details><summary>评论举报</summary>

[POST /reviews/report](explorer/#!/review/review_report)

</details>

<details><summary>6-15 评价课程</summary>

[POST /reviews/rateCourse](explorer/#!/review/review_rateCourse)

</details>

<details><summary>6-17 选择课程</summary>

[POST /professors/searchCourseByProf](explorer/#!/professor/professor_searchCourseByProf)

</details>

<details><summary>评论点赞</summary>

[POST /reviews/thumbsUp](explorer/#!/review/review_thumbsUp)

</details>
