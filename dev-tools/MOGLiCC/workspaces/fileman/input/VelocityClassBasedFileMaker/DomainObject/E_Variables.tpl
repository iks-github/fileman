
#set( $enumList = $classDescriptor.getAllMetaInfoValuesFor("Enum") )

#if( $classDescriptor.doesHaveAnyMetaInfosWithName("Enum") )

	'	// Enums

#end

#foreach( $enum in $enumList )

	'	$enum;

#end

#if( $classDescriptor.doesHaveAnyMetaInfosWithName("Enum") )

	'	

#end



'	// ===============  instance fields  ===============
'

#set( $useJavaBeanRegistry = $model.getMetaInfoValueFor("useJavaBeanRegistry") )

#if ( $useJavaBeanRegistry == "true" )

'	private String registryId;

#end


#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)

	#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) ) 
	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
	#set( $javaType = $TemplateJavaUtility.getSimpleClassName( $attributeDescriptor.getMetaInfoValueFor("JavaType") ) )
	#set( $minLength = $attributeDescriptor.getMetaInfoValueFor("MinLength") )
	#set( $maxLength = $attributeDescriptor.getMetaInfoValueFor("MaxLength") )
	#set( $mandatory = $attributeDescriptor.getMetaInfoValueFor("Mandatory") )
	#set( $swaggerDoc = "" )
	#set( $joinTable = "" )

	#if(! $mandatory.contains("NOT FOUND") )
		#set( $swaggerDoc = $swaggerDoc + "Mandatory. " )
		'    @NotNull(message="Value of mandatory attribute '${attributeName}' is not present.")
	#end
	
	#if(   ! $minLength.contains("NOT FOUND") 
	    && ! $maxLength.contains("NOT FOUND"))
		#set( $swaggerDoc = $swaggerDoc + "Valid length ranges from " + ${minLength} + " to " + ${maxLength} + ". ")
		'    @Size(min=${minLength}, max=${maxLength}, message="Value of attribute '${attributeName}' is out of valid range (${minLength}-${maxLength})")
	#else 
		#if( ! $minLength.contains("NOT FOUND") )
			#set( $swaggerDoc = $swaggerDoc + "Valid minimum length is " + ${minLength} + ". ")
			'    @Size(min=${minLength}, message="Value of attribute '${attributeName}' is less than valid minimum (${minLength}).")
		#end
		#if( ! $maxLength.contains("NOT FOUND") )
			#set( $swaggerDoc = $swaggerDoc + "Valid maximum length is " + ${maxLength} + ". ")
			'    @Size(max=${maxLength}, message="Value of attribute '${attributeName}' is larger than valid maximum (${maxLength}).")
		#end
	#end
	
	#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("joinTable") )
		#set( $joinTable = ${attributeDescriptor.getMetaInfoValueFor("joinTable")})
	#end
	
	#if( ! $swaggerDoc.equals("") )
		'    @ApiModelProperty(notes = "$TemplateStringUtility.cutSuffix(${swaggerDoc}, " ")")
	#end
	
	#if ( $attributeDescriptor.doesHaveMetaInfo("hideFromClientOverview", "true") )
		'    @JsonProperty(access = Access.WRITE_ONLY)
	#end
	
	#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("dbRelation") )
		'	@${attributeDescriptor.getMetaInfoValueFor("dbRelation")}
	#end
	
	#if ( $$classDescriptor.doesHaveMetaInfo("dbEntity", "true") )

		#if ( $attributeDescriptor.doesHaveMetaInfo("hideFromDB", "true") )
			'    @Transient
		#else
			#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName))
			#set( $dbName = $TemplateStringUtility.toDBTableName($attributeName) )
	        #set( $dbType = $attributeDescriptor.getMetaInfoValueFor("dbType") )

			#if ( $attributeDescriptor.doesHaveMetaInfo("defaultValue", "true") )
				#set( $dbType = $dbType + " default '" + $attributeDescriptor.getMetaInfoValueFor("defaultValue") + "'" )
			#end
			#set( $nullableSetting = "")
			#if ( $attributeDescriptor.doesHaveMetaInfo("nullable", "true") )
				#set( $nullableSetting = ", nullable=true")
			#end
			#if ( $attributeDescriptor.doesHaveMetaInfo("nullable", "false") )
				#set( $nullableSetting = ", nullable=false")
			#end
			#set( $uniqueSetting = "")
			#if ( $attributeDescriptor.doesHaveMetaInfo("unique", "true") )
				#set( $uniqueSetting = ", unique=true")
			#end
			#if ( $attributeDescriptor.doesHaveMetaInfo("unique", "false") )
				#set( $uniqueSetting = ", unique=false")
			#end
			#if( ! $joinTable.equals("") )
				'    @JoinTable(name="${className}_${joinTable}", joinColumns = { @JoinColumn(name = "fk_${className}") }, inverseJoinColumns = { @JoinColumn(name = "fk_${joinTable}") })
			#else
			    #if ( $attributeDescriptor.doesHaveMetaInfo("isForeignKey", "true") )
				    '    @JoinColumn(name="${dbName}"${nullableSetting}${uniqueSetting}, columnDefinition="${dbType}")
			    #else
				    '    @Column(name="${dbName}"${nullableSetting}${uniqueSetting}, columnDefinition="${dbType}")
			    #end
			#end
            #if ( $dbType == "blob" || $dbType == "clob" )
            '    @Lob
            #end
			#if ( $attributeDescriptor.doesHaveMetaInfo("id", "true") )
				'    @Id
				#if ( $attributeDescriptor.doesHaveMetaInfo("generatedValue", "true") )
					'    @GeneratedValue(strategy = GenerationType.IDENTITY)
				#end
			#end
		#end
	#end

		
	'	private $javaType $attributeName;
	'

#end

'
