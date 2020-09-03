'
#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)

	#if ( ! $attributeDescriptor.doesHaveMetaInfo("excludeFromClientDataClass", "true") )
		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) )
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
		#set( $methodName = "get" + $TemplateStringUtility.firstToUpperCase($attributeName) )
	
		'    $methodName() { 
		'        return this.$attributeName;
		'    }
		'
	#end
#end
