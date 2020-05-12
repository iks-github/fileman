package com.iksgmbh.fileman.backend;

import java.io.Serializable;
import java.lang.Long;
import java.lang.String;

import java.util.*;
import javax.validation.constraints.*;
import io.swagger.annotations.*;
import com.fasterxml.jackson.annotation.*;

/**
 * Content of hosted file
 *
 * @author generated by MOGLiCC
 */
@ApiModel(description = "Content of hosted file")
public class FileContentData implements Serializable, Cloneable
{
	private static final long serialVersionUID = 1589297482266L;

	// ===============  instance fields  ===============

    @NotNull(message="Value of mandatory attribute 'uuid' is not present.")
    @ApiModelProperty(notes = "Mandatory.")
	private Long uuid;

    @NotNull(message="Value of mandatory attribute 'name' is not present.")
    @Size(min=3, max=128, message="Value of attribute 'name' is out of valid range (3-128)")
    @ApiModelProperty(notes = "Mandatory. Valid length ranges from 3 to 128.")
	private String name;

    @NotNull(message="Value of mandatory attribute 'content' is not present.")
    @ApiModelProperty(notes = "Mandatory.")
	private String content;

    @NotNull(message="Value of mandatory attribute 'creator' is not present.")
    @ApiModelProperty(notes = "Mandatory.")
	private String creator;

    @NotNull(message="Value of mandatory attribute 'creationDate' is not present.")
    @ApiModelProperty(notes = "Mandatory.")
	private String creationDate;


	// ===============  setter methods  ===============

	public void setUuid(final Long uuid)
	{
		this.uuid = uuid;
	}

	public void setName(final String name)
	{
		this.name = name;
	}

	public void setContent(final String content)
	{
		this.content = content;
	}

	public void setCreator(final String creator)
	{
		this.creator = creator;
	}

	public void setCreationDate(final String creationDate)
	{
		this.creationDate = creationDate;
	}

	// ===============  getter methods  ===============

	public Long getUuid()
	{
		return uuid;
	}

	public String getName()
	{
		return name;
	}

	public String getContent()
	{
		return content;
	}

	public String getCreator()
	{
		return creator;
	}

	public String getCreationDate()
	{
		return creationDate;
	}

	// ===============  additional Javabean methods  ===============

	@Override
	public String toString()
	{
		return "FileContentData ["
				+ "uuid = " + uuid + ", "
				+ "name = " + name + ", "
				+ "content = " + content + ", "
				+ "creator = " + creator + ", "
				+ "creationDate = " + creationDate + ""
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

		final FileContentData other = (FileContentData) obj;

		if (uuid == null)
		{
			if (other.uuid != null)
				return false;
		} else
		{
			if (! uuid.equals(other.uuid))
				   return false;
		}
		if (name == null)
		{
			if (other.name != null)
				return false;
		} else
		{
			if (! name.equals(other.name))
				   return false;
		}
		if (content == null)
		{
			if (other.content != null)
				return false;
		} else
		{
			if (! content.equals(other.content))
				   return false;
		}
		if (creator == null)
		{
			if (other.creator != null)
				return false;
		} else
		{
			if (! creator.equals(other.creator))
				   return false;
		}
		if (creationDate == null)
		{
			if (other.creationDate != null)
				return false;
		} else
		{
			if (! creationDate.equals(other.creationDate))
				   return false;
		}
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;

		result = prime * result + ((uuid == null) ? 0 : uuid.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((content == null) ? 0 : content.hashCode());
		result = prime * result + ((creator == null) ? 0 : creator.hashCode());
		result = prime * result + ((creationDate == null) ? 0 : creationDate.hashCode());

		return result;
	}

	@Override
	public Object clone()
	{
		final FileContentData clone;
		try {
			clone = (FileContentData) super.clone();
		} catch (Exception e) {
			throw new AssertionError("Unexpected error cloning " + this);
		}

		if (this.uuid != null) clone.uuid = new Long(this.uuid);
		if (this.name != null) clone.name = new String(name);
		if (this.content != null) clone.content = new String(content);
		if (this.creator != null) clone.creator = new String(creator);
		if (this.creationDate != null) clone.creationDate = new String(creationDate);

		return clone;
	}

	public void merge(FileContentData otherFileContentData)
	{
        if (otherFileContentData.getUuid() != null) {
            this.setUuid(otherFileContentData.getUuid());
       }
        if (otherFileContentData.getName() != null) {
            if(! otherFileContentData.getName().isEmpty()) {
           	 this.setName(otherFileContentData.getName());
            }
       }
        if (otherFileContentData.getContent() != null) {
            if(! otherFileContentData.getContent().isEmpty()) {
           	 this.setContent(otherFileContentData.getContent());
            }
       }
        if (otherFileContentData.getCreator() != null) {
            if(! otherFileContentData.getCreator().isEmpty()) {
           	 this.setCreator(otherFileContentData.getCreator());
            }
       }
        if (otherFileContentData.getCreationDate() != null) {
            if(! otherFileContentData.getCreationDate().isEmpty()) {
           	 this.setCreationDate(otherFileContentData.getCreationDate());
            }
       }
	}
}