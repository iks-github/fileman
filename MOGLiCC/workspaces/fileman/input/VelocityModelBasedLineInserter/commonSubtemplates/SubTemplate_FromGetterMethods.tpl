
#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiType"))

		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) ) 
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 

		'
		'  get ${attributeName}C() {
		'    return this.form.get('inputFieldControl.metaDataForm.${attributeName}Control');
		'  }
	
	#end
#end

