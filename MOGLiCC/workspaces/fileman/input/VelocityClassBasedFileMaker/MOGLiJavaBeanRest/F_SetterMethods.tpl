'	// ===============  setter methods  ===============
'

#set( $useJavaBeanRegistry = $model.getMetaInfoValueFor("useJavaBeanRegistry") )

#if ( $useJavaBeanRegistry == "true" )

	'	public void setRegistryId(final String registryId)
	'	{
	'		this.registryId = registryId;
	'	}
	'
	
#end


#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)

#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) )
#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
#set( $javaType = $TemplateJavaUtility.getSimpleClassName( $attributeDescriptor.getMetaInfoValueFor("JavaType") ) )
#set( $methodName = "set" + $TemplateStringUtility.firstToUpperCase($attributeName) )

'	public void $methodName(final $javaType $attributeName)
'	{
'		this.$attributeName = $attributeName;
'	}
'
#end

