package com.fullteaching.backend.filegroup;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface FileGroupRepository extends JpaRepository<FileGroup, Long> {


    FileGroup findById(long id);


}
