#set( $JavaType = $attributeDescriptor.getMetaInfoValueFor("JavaType"))
#set( $javaType = $TemplateStringUtility.firstToLowerCase($JavaType) )

#if ($attributeDescriptor.doesHaveAnyMetaInfosWithName("frontendType")) 
	#set( $frontendType = $attributeDescriptor.getMetaInfoValueFor("frontendType"))
#else
	#set( $frontendType = $javaType)

	#if ($javaType.equals("byte[]")) 
		#set( $frontendType = "Blob")	
	#elseif( $javaType.equals("long") || $javaType.equals("int") || $javaType.equals("byte") || $javaType.equals("integer"))
		#set( $frontendType = "number")	
	#elseif ($javaType.contains("[") && $javaType.contains("]"))
		#set( $frontendType = "[]")	
	#else
		#parse("isDomainType.tpl")
		#parse("isDomainTypeSet.tpl")
	
		#if( $isDomainType )
			#set( $frontendType = $JavaType)
		#elseif ( $isDomainTypeSet )
			#set( $frontendType = $TemplateStringUtility.replaceAllIn($JavaType, "java.util.Set", "Set") )
		#end
	#end
#end