'

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )
#set( $quote = "'" ) 

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) )
	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
	#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) )

    #if ( ! $attributeDescriptor.doesHaveMetaInfo("hideFromClientOverview", "true"))
	'        <td>
	'            $AttributeName
	'            <fileman-sorticon [sortField]="$quote$attributeName$quote" (sortEventHandler)="sort($event)"></fileman-sorticon>
	'        </td>
	#end
	
#end

'