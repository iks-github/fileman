#set( $guiType = $attribute.getMetaInfoValueFor("guiType") )
#set( $isSelectBox = $guiType.startsWith("Selectbox:") )
#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attribute.name) ) 
#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) ) 

#if ( $isSelectBox) 
	#set( $optionString = $TemplateStringUtility.cutLeadingChars($guiType, 10) )
	#set( $options = $TemplateStringUtility.commaSeparatedStringToStringList($optionString) )
	#set( $guiType = "Selectbox" )
#end

#if ( $guiType.equals("TextField"))

'                    <input id="$attributeName" type="text" class="form-Control" formControlName="${attributeName}Control"/>

#elseif ( $guiType.equals("TextArea"))

'                    <textarea id="$attributeName" class="form-Control" formControlName="${attributeName}Control"></textarea>

#elseif ( $guiType.equals("Selectbox"))

'                    <select id="$attributeName" class="form-Control" formControlName="${attributeName}Control">

	#foreach ($option in $options)
'                    	<option [value]="'$option'">$option</option>

	#end

'					 </select>

#elseif ( $guiType.equals("Checkbox"))

'                    <input id="$attributeName" type="checkbox" class="form-Control" formControlName="${attributeName}Control"/>

#else

	Type of GUI Field "$guiType" is not yet supported in the MOGLiCC template "SubTemplate_GuiElements.tpl".	

#end

