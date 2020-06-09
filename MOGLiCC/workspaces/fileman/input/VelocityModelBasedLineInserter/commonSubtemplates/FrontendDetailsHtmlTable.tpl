'        <table class="form-group" formGroupName="detailsForm">

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )
#set( $row1Attribute = "" )
#set( $row2Attribute = "" )

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiType"))

		#if ($row1Attribute.equals(""))
			#set( $row1Attribute = $attributeDescriptor )
		#elseif ($row2Attribute.equals("")) 
			#set( $row2Attribute = $attributeDescriptor )
		#end


		#if ( ! $row2Attribute.equals("")) 
'            <tr>
'                <td>
					 #set( $AttributeName = $TemplateStringUtility.firstToUpperCase($row1Attribute.name) ) 
'                    <label for="$row1Attribute.name">$AttributeName</label>
'                    <br>
	         		 #set( $attribute = $row1Attribute )
					 #parse("commonSubtemplates/SubTemplate_GuiElements.tpl")
'                </td>
'				 <td class="space"></td>
'                <td>
					 #set( $AttributeName = $TemplateStringUtility.firstToUpperCase($row2Attribute.name) ) 
'                    <label for="$row2Attribute.name">$AttributeName</label>
'                    <br>
	         		 #set( $attribute = $row2Attribute )
					 #parse("commonSubtemplates/SubTemplate_GuiElements.tpl")
'                </td>
'            </tr>
'
'            <tr>&nbsp;</tr>  		
'            
			#set( $row1Attribute = "" )
			#set( $row2Attribute = "" )
		#end			
	#end
	
#end

#if ( ! $row1Attribute.equals("") && $row2Attribute.equals(""))
'            <tr>
'                <td>
					 #set( $AttributeName = $TemplateStringUtility.firstToUpperCase($row1Attribute.name) ) 
'                    <label for="$row1Attribute.name">$AttributeName</label>
'					 <br>
	         		 #set( $attribute = $row1Attribute )
					 #parse("commonSubtemplates/SubTemplate_GuiElements.tpl")
'                </td>
'            </tr>
#end	


'        </table>
