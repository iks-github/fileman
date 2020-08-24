#set( $DoubleQuotes = '"')

#foreach ($attributeDescriptor2 in $attributeDescriptorList)

	#set( $SqlType = $attributeDescriptor2.getMetaInfoValueFor("SqlType"))
	#set( $defaultValue = $attributeDescriptor2.getMetaInfoValueFor("defaultValue"))
	#set( $JavaType = $attributeDescriptor2.getMetaInfoValueFor("JavaType"))
	#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor2.name) ) 
	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
	#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) ) 
	
	#if($SqlType.contains("NOT FOUND") ) 
	
		#if($defaultValue.contains("NOT FOUND") ) 
			#set( $defaultValue = "null")
		#else
		
			#if($JavaType.equals("String") ) 
				#set( $defaultValue = $DoubleQuotes + $defaultValue + $DoubleQuotes )
			#end
		
		#end
			
		'
		'       // with a real db this will be refactored
		'		${className}.set${AttributeName}($defaultValue);  // set default value for non-db field
		'
	#end

#end