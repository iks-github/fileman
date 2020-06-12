package com.iksgmbh.fileman.backend;

import com.iksgmbh.fileman.backend.FileContentData;
import com.iksgmbh.fileman.backend.FileMetaData;
import java.io.Serializable;

import javax.validation.constraints.*;
import io.swagger.annotations.*;
import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty.*;

/**
 * Complete data on a hosted file
 *
 * @author generated by MOGLiCC
 */
@ApiModel(description = "Complete data on a hosted file")
public class FileData implements Serializable, Cloneable
{
	private static final long serialVersionUID = 1591951045223L;

	// ===============  instance fields  ===============

    @NotNull(message="Value of mandatory attribute 'metaData' is not present.")
    @ApiModelProperty(notes = "Mandatory.")
	private FileMetaData metaData;

    @NotNull(message="Value of mandatory attribute 'contentData' is not present.")
    @ApiModelProperty(notes = "Mandatory.")
	private FileContentData contentData;


	// ===============  setter methods  ===============

	public void setMetaData(final FileMetaData metaData)
	{
		this.metaData = metaData;
	}

	public void setContentData(final FileContentData contentData)
	{
		this.contentData = contentData;
	}

	// ===============  getter methods  ===============

	public FileMetaData getMetaData()
	{
		return metaData;
	}

	public FileContentData getContentData()
	{
		return contentData;
	}

	// ===============  additional Javabean methods  ===============

	@Override
	public String toString()
	{
		return "FileData ["
				+ "metaData = " + metaData + ", "
				+ "contentData = " + contentData + ""
				+ "]";
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;

		final FileData other = (FileData) obj;

		if (metaData == null)
		{
			if (other.metaData != null)
				return false;
		} else
		{
			if (! metaData.equals(other.metaData))
				   return false;
		}
		if (contentData == null)
		{
			if (other.contentData != null)
				return false;
		} else
		{
			if (! contentData.equals(other.contentData))
				   return false;
		}
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;

		result = prime * result + ((metaData == null) ? 0 : metaData.hashCode());
		result = prime * result + ((contentData == null) ? 0 : contentData.hashCode());

		return result;
	}

	@Override
	public Object clone()
	{
		final FileData clone;
		try {
			clone = (FileData) super.clone();
		} catch (Exception e) {
			throw new AssertionError("Unexpected error cloning " + this);
		}

		if (this.metaData != null) clone.metaData = (FileMetaData)this.metaData.clone();  // probably, here is need of manual adaptation
		if (this.contentData != null) clone.contentData = (FileContentData)this.contentData.clone();  // probably, here is need of manual adaptation

		return clone;
	}

	public void merge(FileData otherFileData)
	{
        if (otherFileData.getMetaData() != null) {
            this.setMetaData(otherFileData.getMetaData());
       }
        if (otherFileData.getContentData() != null) {
            this.setContentData(otherFileData.getContentData());
       }
	}
}