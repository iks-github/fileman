/*
 * Copyright 2020 IKS Gesellschaft fuer Informations- und Kommunikationssysteme mbH
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.iksgmbh.fileman.backend.dao;

import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Component;

import com.iksgmbh.fileman.backend.FavouriteSetting;
import com.iksgmbh.fileman.backend.Tenant;

/**
 * Created as draft by MOGLiCC.
 * Adapt freely if you need.
 *
**/
@Component
public class FavouriteSettingDao extends FavouriteSettingBasicDao {
	
	public List<FavouriteSetting> findAllForFilenameAndTenant(String filename, Tenant tenant) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<FavouriteSetting> criteria = criteriaBuilder.createQuery(FavouriteSetting.class);
		Root<FavouriteSetting> fileContentData = criteria.from(FavouriteSetting.class);
		criteria.select(fileContentData).where(
				criteriaBuilder.and(
						criteriaBuilder.equal(fileContentData.get("filename"), filename),
						criteriaBuilder.equal(fileContentData.get("tenant"), tenant)));
        return entityManager.createQuery(criteria).getResultList();
	}	
}
