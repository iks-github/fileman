'
'  private setDataToControls(metadata: FileMetaData) {

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiType"))
		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) ) 
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
		#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) ) 
	
'    this.${attributeName}C.setValue(metadata.get${AttributeName}());

	#end
#end

'  }
