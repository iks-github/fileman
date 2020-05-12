'
#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)

	#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) )
	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
	#set( $methodName = "get" + $TemplateStringUtility.firstToUpperCase($attributeName) )
	
	'    $methodName() { 
	'        return this.$attributeName;
	'    }
	'
#end

