@TargetFileName fileman-overview.component.html
@TargetDir ..\Fileman-Frontend\src\app\components\fileman-overview
@NameOfValidModel FilemanDataModel
@ReplaceStart "<!-- The td sections below is generated: Do not modify manually! -->"
@ReplaceEnd "<!-- The td sections above is generated: Do not modify manually! -->"


#set( $classDescriptor = $model.getClassDescriptor("FileMetaData") )
#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeDescriptor.name, " ", "") ) 
	'                  <td>{{file.${attributeName}}}</td>
	
#end
