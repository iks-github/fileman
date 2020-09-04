package com.iksgmbh.fileman.backend.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.iksgmbh.fileman.backend.*;

import javax.persistence.*;
import javax.persistence.criteria.*;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Component
/**
 * Implementation of basic dao functionalities.
 * This file is autogenerated by MOGLiCC. Do not modify manually!
 */
@Repository
@Transactional
public class DbSchemaBasicDao
{
	@PersistenceContext
	protected EntityManager entityManager;

	public List<DbSchema> findAllDbSchemas() {
		CriteriaQuery<DbSchema> criteria = entityManager.getCriteriaBuilder().createQuery(DbSchema.class);
		criteria.select(criteria.from(DbSchema.class));
		return entityManager.createQuery(criteria).getResultList();
	}

	public DbSchema findByCreationDate(java.util.Date creationDate) {
		return entityManager.find(DbSchema.class, creationDate);
	}

	public boolean update(DbSchema entity) {
		try {
			entityManager.merge(entity);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public DbSchema create(DbSchema entity) {
		entityManager.persist(entity);
		return entity;
	}

	public void delete(DbSchema entity) {
		entityManager.remove(entity);
	}
}