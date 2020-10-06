#set( $JavaType = $attributeDescriptor.getMetaInfoValueFor("JavaType"))
#set( $classDescriptorList = $model.getClassDescriptorList() )
#set( $isDomainTypeSet = false)

#if ($attributeDescriptor.doesHaveAnyMetaInfosWithName("frontendType")) 
	#set( $FrontendType = $attributeDescriptor.getMetaInfoValueFor("frontendType"))
#else
	#set( $FrontendType = $JavaType)
#end

#foreach ($classDescriptor in $classDescriptorList) 
	#if ($FrontendType.contains("Set<${classDescriptor.simpleName}>"))
		#set( $isDomainTypeSet = true)
	#end
#end
