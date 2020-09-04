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

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Component;

import com.iksgmbh.fileman.backend.FileContentData;
import com.iksgmbh.fileman.backend.Tenant;

/**
 * Created as draft by MOGLiCC.
 * Adapt freely if you need.
 *
**/
@Component
public class FileContentDataDao extends FileContentDataBasicDao
{
	public static void main(String[] args) {
		System.out.print(encode("a fancy execution"));
	}
	
	private static String encode(String content) {
		try {
			return Base64.getEncoder().encodeToString(content.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
	}
	
	public List<FileContentData> findAllForNameAndTenant(String name, Tenant tenant) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<FileContentData> criteria = criteriaBuilder.createQuery(FileContentData.class);
		Root<FileContentData> fileContentData = criteria.from(FileContentData.class);
		criteria.select(fileContentData).where(
				criteriaBuilder.and(
						criteriaBuilder.equal(fileContentData.get("name"), name),
						criteriaBuilder.equal(fileContentData.get("tenant"), tenant)));
        return entityManager.createQuery(criteria).getResultList();
	}
}
