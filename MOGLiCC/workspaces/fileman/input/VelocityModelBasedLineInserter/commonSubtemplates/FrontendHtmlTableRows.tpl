'

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )
#set( $quote = "'" ) 


#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ($attributeDescriptor.name.equals("name")) 
		'        <td [ngStyle]="{'font-weight': isFileFavourite(file.name) ? 'bold' : ''}">{{file.name}} {{favouriteAsterix(file)}}</td>
	#else

		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeDescriptor.name, " ", "") ) 
		'        <td>{{file.${attributeName}}}</td>
	
	#end
		
#end

'