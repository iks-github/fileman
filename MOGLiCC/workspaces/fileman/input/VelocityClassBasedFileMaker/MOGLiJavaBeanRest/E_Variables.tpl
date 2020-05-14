
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
	
	#if( ! $swaggerDoc.equals("") )
		'    @ApiModelProperty(notes = "$TemplateStringUtility.cutSuffix(${swaggerDoc}, " ")")
	#end
	
	#if ( $attributeDescriptor.doesHaveMetaInfo("hideFromClient", "true") )
		'	@JsonIgnore
	#end
		
	'	private $javaType $attributeName;
	'

#end

'
