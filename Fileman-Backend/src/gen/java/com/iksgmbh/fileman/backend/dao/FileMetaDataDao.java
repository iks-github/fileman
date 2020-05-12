package com.iksgmbh.fileman.backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.iksgmbh.fileman.backend.FileMetaData;

@Component
public class FileMetaDataDao
{
	protected List<FileMetaData> fileMetaDatas = new java.util.ArrayList<>();

	public List<FileMetaData> findAllFileMetaDatas() {
		return fileMetaDatas;
	}

	public FileMetaData findByName(String name)
	{
	   	Optional<FileMetaData> match = fileMetaDatas.stream()
                .filter (data -> data.getName()
                .equals(name))
                .findFirst();
		if (match.isPresent()) {
			return match.get();
		}
		return null;
	}

	public boolean update(FileMetaData fileMetaData)
	{
		Optional<FileMetaData> match = fileMetaDatas.stream()
                                                   .filter(o -> o.getName() == fileMetaData.getName())
                                                   .findFirst();
		if (! match.isPresent()) {
			return false;
		}

		fileMetaDatas.remove(match.get());
		fileMetaDatas.add(fileMetaData);
		return true;
	}

	public FileMetaData create(FileMetaData fileMetaData) {
		fileMetaDatas.add(fileMetaData);
		return fileMetaData;
	}

	public void delete(FileMetaData fileMetaData) {
		fileMetaDatas.remove(fileMetaData);
	}
}