package com.fullteaching.backend.session;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface SessionRepository extends JpaRepository<Session, Long> {

    Session findById(long id);
}
