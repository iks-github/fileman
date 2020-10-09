#set( $JavaType = $attributeDescriptor.getMetaInfoValueFor("JavaType"))
#set( $classDescriptorList = $model.getClassDescriptorList() )
#set( $isArrayType = false)

#if ($attributeDescriptor.doesHaveAnyMetaInfosWithName("frontendType")) 
	#set( $FrontendType = $attributeDescriptor.getMetaInfoValueFor("frontendType"))
#else
	#set( $FrontendType = $JavaType)
#end

#foreach ($classDescriptor in $classDescriptorList) 
	#if ($FrontendType.contains("${classDescriptor.simpleName}[]"))
		#set( $isArrayType = true)
	#end
#end
