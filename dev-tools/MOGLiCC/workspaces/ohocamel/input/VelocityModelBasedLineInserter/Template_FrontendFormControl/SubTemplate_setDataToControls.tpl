#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName) ) 


'
'  private setDataToControls($className: $classDescriptor.simpleName) {

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiType"))
		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) ) 
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
		#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) ) 
	
'    this.${attributeName}C.setValue(${className}.get${AttributeName}());

	#end
#end

'  }
