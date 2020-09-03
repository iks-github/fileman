#set( $JavaType = $attributeDescriptor.getMetaInfoValueFor("JavaType"))
#set( $javaType = $TemplateStringUtility.firstToLowerCase($JavaType) )
#set( $frontendType = $javaType)

#if ($javaType.equals("byte[]")) 
	#set( $frontendType = "Blob")	
#elseif( $javaType.equals("long") || $javaType.equals("int") || $javaType.equals("byte") || $javaType.equals("integer"))
	#set( $frontendType = "number")	
#elseif ($javaType.contains("[") && $javaType.contains("]"))
	#set( $frontendType = "[]")	
#else
	#parse("isDomainType.tpl")
	#if( $isDomainType )
		#set( $frontendType = $JavaType)
	#end
#end
