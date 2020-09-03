'
#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)

	#if ( ! $attributeDescriptor.doesHaveMetaInfo("excludeFromClientDataClass", "true") )
		#parse("FrontendType.tpl")
		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) )
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
		#set( $methodName = "set" + $TemplateStringUtility.firstToUpperCase($attributeName) )
	
		'    $methodName($attributeName: $frontendType) {
		'        this.$attributeName = $attributeName;
		'    }
		'
	#end
#end
