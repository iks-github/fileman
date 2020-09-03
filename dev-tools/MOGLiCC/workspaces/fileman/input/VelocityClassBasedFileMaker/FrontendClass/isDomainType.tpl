#set( $JavaType = $attributeDescriptor.getMetaInfoValueFor("JavaType"))
#set( $classDescriptorList = $model.getClassDescriptorList() )
#set( $isDomainType = false)

#foreach ($classDescriptor in $classDescriptorList) 
	#if ($JavaType.equals(${classDescriptor.simpleName}))
		#set( $isDomainType = true)
	#end
#end
