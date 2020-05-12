package com.iksgmbh.fileman.backend.dao;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.iksgmbh.fileman.backend.FileContentData;

@Component
public class FileContentDataDao
{
	protected List<FileContentData> fileContentDatas = new java.util.ArrayList<>();

	public List<FileContentData> findAllFileContentDatas() {
		return fileContentDatas;
	}

	public FileContentData findByUuid(Long uuid)
	{
	   	Optional<FileContentData> match = fileContentDatas.stream()
                .filter (data -> data.getUuid()
                .equals(uuid))
                .findFirst();
		if (match.isPresent()) {
			return match.get();
		}
		return null;
	}

	public boolean update(FileContentData fileContentData)
	{
		Optional<FileContentData> match = fileContentDatas.stream()
                                                   .filter(o -> o.getUuid() == fileContentData.getUuid())
                                                   .findFirst();
		if (! match.isPresent()) {
			return false;
		}

		fileContentDatas.remove(match.get());
		fileContentDatas.add(fileContentData);
		return true;
	}

	public List<FileContentData> findAllForName(String toSearch)
	{
		return fileContentDatas.stream()
                .filter (dataset -> dataset.getName().equals(toSearch))
                .collect(Collectors.toList());
	}

	public FileContentData create(FileContentData fileContentData) {
		fileContentDatas.add(fileContentData);
		return fileContentData;
	}

	public void delete(FileContentData fileContentData) {
		fileContentDatas.remove(fileContentData);
	}
}