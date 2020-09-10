package com.iksgmbh.fileman.backend;

import java.io.Serializable;
import java.lang.Integer;
import java.lang.String;

import javax.validation.constraints.*;
import javax.persistence.*;

import io.swagger.annotations.*;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

/**
 * JavaBean class of the MOGLiCC JavaBean Group.
 *
 * Data of a Fileman file group
 *
 * This file is autogenerated by MOGLiCC. Do not modify manually!
 */
@ApiModel(description = "Data of a Fileman file group")
@Entity
@Table(name="FILE_GROUP")
public class FileGroup implements Serializable, Cloneable
{
	private static final long serialVersionUID = 1599723725889L;

	// ===============  instance fields  ===============

    @Column(name="ID", unique=true, columnDefinition="int")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @NotNull(message="Value of mandatory attribute 'name' is not present.")
    @Size(min=2, max=64, message="Value of attribute 'name' is out of valid range (2-64)")
    @ApiModelProperty(notes = "Mandatory. Valid length ranges from 2 to 64.")
    @Column(name="NAME", unique=true, columnDefinition="varchar")
	private String name;


	// ===============  setter methods  ===============

	public void setId(final Integer id)
	{
		this.id = id;
	}

	public void setName(final String name)
	{
		this.name = name;
	}

	// ===============  getter methods  ===============

	public Integer getId()
	{
		return id;
	}

	public String getName()
	{
		return name;
	}

	// ===============  additional Javabean methods  ===============

	@Override
	public String toString()
	{
		return "FileGroup ["
				+ "id = " + id + ", "
				+ "name = " + name + ""
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

		final FileGroup other = (FileGroup) obj;

		if (id == null)
		{
			if (other.id != null)
				return false;
		} else
		{
			if (! id.equals(other.id))
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
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;

		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());

		return result;
	}

	@Override
	public Object clone()
	{
		final FileGroup clone;
		try {
			clone = (FileGroup) super.clone();
		} catch (Exception e) {
			throw new AssertionError("Unexpected error cloning " + this);
		}

		if (this.id != null) clone.id = new Integer(this.id);
		if (this.name != null) clone.name = new String(name);

		return clone;
	}

	public void merge(FileGroup otherFileGroup)
	{
        if (otherFileGroup.getId() != null) {
            this.setId(otherFileGroup.getId());
       }
        if (otherFileGroup.getName() != null) {
            if(! otherFileGroup.getName().isEmpty()) {
           	 this.setName(otherFileGroup.getName());
            }
       }
	}
}