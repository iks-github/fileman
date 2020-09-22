'

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName) )
#set( $quote = "'" ) 


#foreach ($attributeDescriptor in $attributeDescriptorList)

	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeDescriptor.name, " ", "") ) 
	#if ( ! $attributeDescriptor.doesHaveMetaInfo("hideFromClientOverview", "true"))
		#if ( $attributeDescriptor.doesHaveMetaInfo("guiType", "MultiSelectBox"))
			'        <td>{{format${TemplateStringUtility.firstToUpperCase($attributeName)}(${className}.${attributeName})}}</td>
		#elseif ( ! $attributeDescriptor.doesHaveMetaInfo("guiType", "FileSelector"))
			'        <td>{{${className}.${attributeName}}}</td>
		#end
	#end 
		
#end

'