#set( $JavaType = $attributeDescriptor.getMetaInfoValueFor("JavaType"))
#set( $javaType = $TemplateStringUtility.firstToLowerCase($JavaType) )

#set( $frontendType = $javaType)

#if ($javaType.equals("byte[]")) 
	#set( $frontendType = "Blob")	
#elseif( $javaType.equals("long") || $javaType.equals("int") || $javaType.equals("byte") || $javaType.equals("integer"))
	#set( $frontendType = "number")	
#else
	#if ($javaType.contains("List<"))
		#set( $frontendType = $TemplateStringUtility.replaceAllIn($frontendType, "java.util.List", "List") )
		#set( $frontendType = $TemplateStringUtility.replaceAllIn($frontendType, "List<", "") )
		#set( $frontendType = $TemplateStringUtility.replaceAllIn($frontendType, ">", "[]") )
	#end

	#parse("isDomainType.tpl")
	#parse("isDomainTypeArray.tpl")

	#if( $isDomainType )
		#set( $frontendType = $JavaType)
	#end
#end
