#set( $JavaType = $attributeDescriptor.getMetaInfoValueFor("JavaType"))
#set( $classDescriptorList = $model.getClassDescriptorList() )
#set( $isDomainTypeArray = false)

#foreach ($classDescriptor in $classDescriptorList) 
	#if ($frontendType.contains("${classDescriptor.simpleName}[]"))
		#set( $isDomainTypeArray = true)
	#end
#end
