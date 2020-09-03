'

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName) )
#set( $quote = "'" ) 


#foreach ($attributeDescriptor in $attributeDescriptorList)

	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeDescriptor.name, " ", "") ) 
	#if ( ! $attributeDescriptor.doesHaveMetaInfo("hideFromClientOverview", "true") && ! $attributeDescriptor.doesHaveMetaInfo("guiType", "FileSelector"))
		#if ($attributeDescriptor.doesHaveAnyMetaInfosWithName("guiDisplayField"))
			'        <td>{{${className}.${attributeName}.${attributeDescriptor.getMetaInfoValueFor("guiDisplayField")}}}</td>
		#else
			'        <td>{{${className}.${attributeName}}}</td>
		#end
	#end 
		
#end

'