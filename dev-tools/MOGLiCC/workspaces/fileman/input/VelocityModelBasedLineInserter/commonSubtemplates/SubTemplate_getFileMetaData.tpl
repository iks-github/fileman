
'
'  private get${classDescriptor.simpleName}() { 
'    const $className = new ${classDescriptor.simpleName}(null);
'

#foreach ($attributeDescriptor in $attributeDescriptorList)
	#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiType"))
		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) ) 
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
		#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) ) 
	
'    ${className}.set${AttributeName}(this.${attributeName}C.value);
	#end
#end

'
'    return ${className};
'  }
