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

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Component;

import com.iksgmbh.fileman.backend.FileMetaData;
import com.iksgmbh.fileman.backend.Tenant;

/**
 * Created as draft by MOGLiCC.
 * Adapt freely if you need.
 *
**/
@Component
public class FileMetaDataDao extends FileMetaDataBasicDao
{

	@Override
	public FileMetaData create(FileMetaData fileMetaData) 
	{
		setTechType(fileMetaData);
		fileMetaData.setTechVersion(1);
		return super.create(fileMetaData);
	}

	public boolean update(FileMetaData fileMetaData, boolean withContentChange) 
	{
		if (withContentChange) {			
			fileMetaData.setTechVersion(fileMetaData.getTechVersion() + 1);
		}
		return super.update(fileMetaData);
	}

	private void setTechType(FileMetaData fileMetaData) 
	{
		String name = fileMetaData.getName();
		if (name.contains(".")) {
			int pos = name.lastIndexOf(".") + 1;
			String fileExtension = name.substring(pos);
			fileMetaData.setTechType(fileExtension);
		}
	}
	
	public FileMetaData findByNameAndTenant(String name, Tenant tenant) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<FileMetaData> criteria = criteriaBuilder.createQuery(FileMetaData.class);
		Root<FileMetaData> root = criteria.from(FileMetaData.class);
		criteria.select(root).where(
				criteriaBuilder.and(
						criteriaBuilder.equal(root.get("name"), name),
						criteriaBuilder.equal(root.get("tenant"), tenant)));
		return entityManager.createQuery(criteria).getSingleResult();
	}	
}
