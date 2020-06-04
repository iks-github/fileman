'
'  private getFileMetaData() { 
'    const fileMetaData = new FileMetaData(null);
'

#foreach ($attributeDescriptor in $attributeDescriptorList)
	#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiType"))
		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) ) 
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
		#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) ) 
	
'    fileMetaData.set${AttributeName}(this.${attributeName}C.value);
	#end
#end

'
'    return fileMetaData;
'  }
