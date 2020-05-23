@TargetFileName fileman-table-layout.component.html
@TargetDir ..\Fileman-Frontend\src\app\components\layout\fileman-table-layout
@NameOfValidModel SpringBootBackendAngularFrontModel
@ReplaceStart "<!-- The header-td-sections below is generated: Do not modify manually! -->"
@ReplaceEnd "<!-- The header-td-sections above is generated: Do not modify manually! -->"

'

#set( $classDescriptor = $model.getClassDescriptor("FileMetaData") )
#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )
#set( $quote = "'" ) 

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) )
	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
	#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) )

	'        <td>
	'            $AttributeName
	'            <fileman-sorticon [sortField]="$quote$attributeName$quote" (sortEventHandler)="sort($event)"></fileman-sorticon>
	'        </td>
	
#end

'