'	// ===============  getter methods  ===============
'

#set( $useJavaBeanRegistry = $model.getMetaInfoValueFor("useJavaBeanRegistry") )

#if ( $useJavaBeanRegistry == "true" )

	'	public String getRegistryId()
	'	{
	'		return registryId;
	'	}
	'
	
#end


#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)

#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) )
#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
#set( $javaType = $TemplateJavaUtility.getSimpleClassName( $attributeDescriptor.getMetaInfoValueFor("JavaType") ) )
#set( $methodName = "get" + $TemplateStringUtility.firstToUpperCase($attributeName) )

'	public $javaType $methodName() 
'	{
'		return $attributeName;
'	}
'
#end

