'
'	public void merge(${classDescriptor.simpleName} other${classDescriptor.simpleName})
'	{

#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)

	#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) )
	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
	#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) )
	#set( $javaType = $attributeDescriptor.getMetaInfoValueFor("JavaType") )
	
	#if ( $TemplateJavaUtility.isJavaMetaTypePrimitive($javaType) )
	
		Warning: Do not use primitive types for $attributeName or write yor own merge code!
	#else
	
'        if (other${classDescriptor.simpleName}.get${AttributeName}() != null) {
		#if ( $javaType.equals("String") )
'            if(! other${classDescriptor.simpleName}.get${AttributeName}().isEmpty()) {
'           	 this.set${AttributeName}(other${classDescriptor.simpleName}.get${AttributeName}());
'            }
		#else
'            this.set${AttributeName}(other${classDescriptor.simpleName}.get${AttributeName}());
		#end
'       }
	#end
#end

'	}
