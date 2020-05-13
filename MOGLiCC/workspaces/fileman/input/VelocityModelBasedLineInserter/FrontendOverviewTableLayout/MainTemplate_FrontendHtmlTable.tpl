@TargetFileName fileman-table-layout.component.html
@TargetDir ..\Fileman-Frontend\src\app\components\layout\fileman-table-layout
@NameOfValidModel FilemanDataModel
@ReplaceStart "<!-- The table section below is generated: Do not modify manually! -->"
@ReplaceEnd "<!-- The table section above is generated: Do not modify manually! -->"


'<table>
'    <tr style="font-weight:bold; background-color:darkgray;">
'        <td></td>
'        <td></td>

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

'    </tr>
'    <tr *ngFor="let file of viewedFiles; trackBy: trackFiles let i = index">
'        <td>{{i+1}}.</td>
'        <td><mat-icon data-toggle="tooltip" title="ToDo: Open Action Menu" (click)="openPullDown(file)">more_vert</mat-icon></td>


#foreach ($attributeDescriptor in $attributeDescriptorList)

	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeDescriptor.name, " ", "") ) 
	'          <td>{{file.${attributeName}}}</td>
	
#end


'    </tr>
'</table>
