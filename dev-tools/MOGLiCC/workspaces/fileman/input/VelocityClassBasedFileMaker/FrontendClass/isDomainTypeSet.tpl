#set( $JavaType = $attributeDescriptor.getMetaInfoValueFor("JavaType"))
#set( $classDescriptorList = $model.getClassDescriptorList() )
#set( $isDomainTypeSet = false)

#foreach ($classDescriptor in $classDescriptorList) 
	#if ($JavaType.contains("Set<${classDescriptor.simpleName}>"))
		#set( $isDomainTypeSet = true)
	#end
#end
