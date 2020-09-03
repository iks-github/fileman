package com.iksgmbh.fileman.backend;

import com.iksgmbh.fileman.backend.Tenant;
import java.io.Serializable;
import java.lang.Boolean;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;
import java.util.Date;

import javax.validation.constraints.*;
import javax.persistence.*;

import io.swagger.annotations.*;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

/**
 * JavaBean class of the MOGLiCC JavaBean Group.
 *
 * Meta Data of a hosted file
 *
 * This file is autogenerated by MOGLiCC. Do not modify manually!
 */
@ApiModel(description = "Meta Data of a hosted file")
@Entity
@Table(name="FILE_META_DATA")
public class FileMetaData implements Serializable, Cloneable
{
	private static final long serialVersionUID = 1599149480916L;

	// ===============  instance fields  ===============

    @NotNull(message="Value of mandatory attribute 'name' is not present.")
    @Size(min=3, max=128, message="Value of attribute 'name' is out of valid range (3-128)")
    @ApiModelProperty(notes = "Mandatory. Valid length ranges from 3 to 128.")
    @Column(name="NAME", unique=true, columnDefinition="varchar")
    @Id
	private String name;

    @Size(max=1024, message="Value of attribute 'description' is larger than valid maximum (1024).")
    @ApiModelProperty(notes = "Valid maximum length is 1024.")
    @Column(name="DESCRIPTION", columnDefinition="varchar")
	private String description;

    @Column(name="ACTIVE_U_U_I_D", columnDefinition="bigint")
	private Long activeUUID;

    @Transient
	private Boolean immediatelyActive;

    @Size(max=16, message="Value of attribute 'techType' is larger than valid maximum (16).")
    @ApiModelProperty(notes = "Valid maximum length is 16.")
    @Column(name="TECH_TYPE", columnDefinition="varchar")
	private String techType;

    @Column(name="TECH_VERSION", columnDefinition="number")
	private Integer techVersion;

    @NotNull(message="Value of mandatory attribute 'creator' is not present.")
    @ApiModelProperty(notes = "Mandatory.")
    @Column(name="CREATOR", columnDefinition="varchar")
	private String creator;

    @Column(name="CREATION_DATE", columnDefinition="datetime")
	private Date creationDate;

    @Column(name="SIZE", columnDefinition="bigint")
	private Integer size;

    @JsonProperty(access = Access.WRITE_ONLY)
	@ManyToOne
    @JoinColumn(name="TENANT", columnDefinition="int")
	private Tenant tenant;


	// ===============  setter methods  ===============

	public void setName(final String name)
	{
		this.name = name;
	}

	public void setDescription(final String description)
	{
		this.description = description;
	}

	public void setActiveUUID(final Long activeUUID)
	{
		this.activeUUID = activeUUID;
	}

	public void setImmediatelyActive(final Boolean immediatelyActive)
	{
		this.immediatelyActive = immediatelyActive;
	}

	public void setTechType(final String techType)
	{
		this.techType = techType;
	}

	public void setTechVersion(final Integer techVersion)
	{
		this.techVersion = techVersion;
	}

	public void setCreator(final String creator)
	{
		this.creator = creator;
	}

	public void setCreationDate(final Date creationDate)
	{
		this.creationDate = creationDate;
	}

	public void setSize(final Integer size)
	{
		this.size = size;
	}

	public void setTenant(final Tenant tenant)
	{
		this.tenant = tenant;
	}

	// ===============  getter methods  ===============

	public String getName()
	{
		return name;
	}

	public String getDescription()
	{
		return description;
	}

	public Long getActiveUUID()
	{
		return activeUUID;
	}

	public Boolean getImmediatelyActive()
	{
		return immediatelyActive;
	}

	public String getTechType()
	{
		return techType;
	}

	public Integer getTechVersion()
	{
		return techVersion;
	}

	public String getCreator()
	{
		return creator;
	}

	public Date getCreationDate()
	{
		return creationDate;
	}

	public Integer getSize()
	{
		return size;
	}

	public Tenant getTenant()
	{
		return tenant;
	}

	// ===============  additional Javabean methods  ===============

	@Override
	public String toString()
	{
		return "FileMetaData ["
				+ "name = " + name + ", "
				+ "description = " + description + ", "
				+ "activeUUID = " + activeUUID + ", "
				+ "immediatelyActive = " + immediatelyActive + ", "
				+ "techType = " + techType + ", "
				+ "techVersion = " + techVersion + ", "
				+ "creator = " + creator + ", "
				+ "creationDate = " + creationDate + ", "
				+ "size = " + size + ", "
				+ "tenant = " + tenant + ""
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

		final FileMetaData other = (FileMetaData) obj;

		if (name == null)
		{
			if (other.name != null)
				return false;
		} else
		{
			if (! name.equals(other.name))
				   return false;
		}
		if (description == null)
		{
			if (other.description != null)
				return false;
		} else
		{
			if (! description.equals(other.description))
				   return false;
		}
		if (activeUUID == null)
		{
			if (other.activeUUID != null)
				return false;
		} else
		{
			if (! activeUUID.equals(other.activeUUID))
				   return false;
		}
		if (immediatelyActive == null)
		{
			if (other.immediatelyActive != null)
				return false;
		} else
		{
			if (! immediatelyActive.equals(other.immediatelyActive))
				   return false;
		}
		if (techType == null)
		{
			if (other.techType != null)
				return false;
		} else
		{
			if (! techType.equals(other.techType))
				   return false;
		}
		if (techVersion == null)
		{
			if (other.techVersion != null)
				return false;
		} else
		{
			if (! techVersion.equals(other.techVersion))
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
		if (size == null)
		{
			if (other.size != null)
				return false;
		} else
		{
			if (! size.equals(other.size))
				   return false;
		}
		if (tenant == null)
		{
			if (other.tenant != null)
				return false;
		} else
		{
			if (! tenant.equals(other.tenant))
				   return false;
		}
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;

		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((activeUUID == null) ? 0 : activeUUID.hashCode());
		result = prime * result + ((immediatelyActive == null) ? 0 : immediatelyActive.hashCode());
		result = prime * result + ((techType == null) ? 0 : techType.hashCode());
		result = prime * result + ((techVersion == null) ? 0 : techVersion.hashCode());
		result = prime * result + ((creator == null) ? 0 : creator.hashCode());
		result = prime * result + ((creationDate == null) ? 0 : creationDate.hashCode());
		result = prime * result + ((size == null) ? 0 : size.hashCode());
		result = prime * result + ((tenant == null) ? 0 : tenant.hashCode());

		return result;
	}

	@Override
	public Object clone()
	{
		final FileMetaData clone;
		try {
			clone = (FileMetaData) super.clone();
		} catch (Exception e) {
			throw new AssertionError("Unexpected error cloning " + this);
		}

		if (this.name != null) clone.name = new String(name);
		if (this.description != null) clone.description = new String(description);
		if (this.activeUUID != null) clone.activeUUID = new Long(this.activeUUID);
		if (this.immediatelyActive != null) clone.immediatelyActive = new Boolean(this.immediatelyActive);
		if (this.techType != null) clone.techType = new String(techType);
		if (this.techVersion != null) clone.techVersion = new Integer(this.techVersion);
		if (this.creator != null) clone.creator = new String(creator);
		if (this.creationDate != null) clone.creationDate = (java.util.Date)this.creationDate.clone();  // probably, here is need of manual adaptation
		if (this.size != null) clone.size = new Integer(this.size);
		if (this.tenant != null) clone.tenant = (Tenant)this.tenant.clone();  // probably, here is need of manual adaptation

		return clone;
	}

	public void merge(FileMetaData otherFileMetaData)
	{
        if (otherFileMetaData.getName() != null) {
            if(! otherFileMetaData.getName().isEmpty()) {
           	 this.setName(otherFileMetaData.getName());
            }
       }
        if (otherFileMetaData.getDescription() != null) {
            if(! otherFileMetaData.getDescription().isEmpty()) {
           	 this.setDescription(otherFileMetaData.getDescription());
            }
       }
        if (otherFileMetaData.getActiveUUID() != null) {
            this.setActiveUUID(otherFileMetaData.getActiveUUID());
       }
        if (otherFileMetaData.getImmediatelyActive() != null) {
            this.setImmediatelyActive(otherFileMetaData.getImmediatelyActive());
       }
        if (otherFileMetaData.getTechType() != null) {
            if(! otherFileMetaData.getTechType().isEmpty()) {
           	 this.setTechType(otherFileMetaData.getTechType());
            }
       }
        if (otherFileMetaData.getTechVersion() != null) {
            this.setTechVersion(otherFileMetaData.getTechVersion());
       }
        if (otherFileMetaData.getCreator() != null) {
            if(! otherFileMetaData.getCreator().isEmpty()) {
           	 this.setCreator(otherFileMetaData.getCreator());
            }
       }
        if (otherFileMetaData.getCreationDate() != null) {
            this.setCreationDate(otherFileMetaData.getCreationDate());
       }
        if (otherFileMetaData.getSize() != null) {
            this.setSize(otherFileMetaData.getSize());
       }
        if (otherFileMetaData.getTenant() != null) {
            this.setTenant(otherFileMetaData.getTenant());
       }
	}
}