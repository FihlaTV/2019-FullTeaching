package com.fullteaching.backend.coursedetails;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fullteaching.backend.course.Course;
import org.springframework.data.repository.CrudRepository;

public interface CourseDetailsRepository extends JpaRepository<CourseDetails, Long> {
	
	CourseDetails findByCourse(Course course);
	CourseDetails findById(long id);
}
