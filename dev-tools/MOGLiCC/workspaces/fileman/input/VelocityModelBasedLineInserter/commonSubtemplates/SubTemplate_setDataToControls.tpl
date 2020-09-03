'
'  private setDataToControls(${className}: ${classDescriptor.simpleName}) {

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiType") && ! $attributeDescriptor.doesHaveMetaInfo("guiType", "FileSelector"))
		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) ) 
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
		#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) ) 
	
		#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiValueField"))
			'    this.${attributeName}C.setValue(${className}.get${AttributeName}().${attributeDescriptor.getMetaInfoValueFor("guiValueField")});
		#else
			'    this.${attributeName}C.setValue(${className}.get${AttributeName}());
		#end

	#end
#end

'  }
