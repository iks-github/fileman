#set( $classDescriptor = $model.getClassDescriptor("FileMetaData") )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName)) 

@TargetFileName fileman-filemetadata-table-layout-component.html
@TargetDir ..\\..\\Fileman-Frontend\\src\app\components\layout\filemetadata\table-layout
@NameOfValidModel SpringBootBackendAngularFrontModel
@ReplaceStart "<!-- The row-td-sections below is generated: Do not modify manually! -->"
@ReplaceEnd "<!-- The row-td-sections above is generated: Do not modify manually! -->"

'

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )
#set( $quote = "'" ) 


#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ($attributeDescriptor.name.equals("name")) 
		'        <td [ngStyle]="{'font-weight': isFileFavourite(file.name) ? 'bold' : ''}">{{file.name}} {{favouriteAsterix(file)}}</td>
	#elseif ($attributeDescriptor.name.equals("creationDate")) 
		'        <td>&#8203;{{formatCreationDate(file.creationDate)}}</td>
	#elseif ( ! $attributeDescriptor.doesHaveMetaInfo("hideFromClientOverview", "true"))
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeDescriptor.name, " ", "") ) 
		'        <td>{{file.${attributeName}}}</td>
	
	#end
		
#end

'
