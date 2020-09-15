#set( $guiType = $attribute.getMetaInfoValueFor("guiType") )
#set( $isSelectBoxWithFixedOptions = $guiType.startsWith("Selectbox:") )
#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attribute.name) ) 
#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) ) 

#if ( $isSelectBoxWithFixedOptions) 
	#set( $optionString = $TemplateStringUtility.cutLeadingChars($guiType, 10) )
	#set( $options = $TemplateStringUtility.commaSeparatedStringToStringList($optionString) )
	#set( $guiType = "Selectbox" )
#end

#if ( $guiType.equals("TextField"))

'                    <input id="$attributeName" type="text" class="form-Control" formControlName="${attributeName}Control"/>

#elseif ( $guiType.equals("PasswordField"))

'                    <input id="$attributeName" type="password" class="form-Control" formControlName="${attributeName}Control"/>

#elseif ( $guiType.equals("TextArea"))

'                    <textarea id="$attributeName" class="form-Control" formControlName="${attributeName}Control"></textarea>

#elseif ( $guiType.equals("Selectbox"))

'                    <select id="$attributeName" class="form-Control" formControlName="${attributeName}Control" (change)="${attributeName}C.markAsTouched()">

	#if ( $isSelectBoxWithFixedOptions)
		#foreach ($option in $options)
'                        <option [value]="'$option'">$option</option>
		#end
	#else
'                        <option *ngFor="let ${attributeName} of ${attributeName}s" [value]="${attributeName}.id">{{${attributeName}.name}}</option>
	#end

'                    </select>

#elseif ( $guiType.equals("Checkbox"))

'                    <input id="$attributeName" type="checkbox" class="form-Control" formControlName="${attributeName}Control"/>

#elseif ( $guiType.equals("FileSelector"))

	'                    <input id="fileContentSource" class="form-Control" type="file"
	'                    formControlName="${attributeName}Control"
	'                    (change)="on${AttributeName}Change($event)"
	'                    [style.border]="getBorder()"
	'                    (focus)="setFocusOnFileSelector(true)" (blur)="setFocusOnFileSelector(false)"/>

#elseif ( $guiType.equals("MultiSelectBox"))

	'                    <ng-multiselect-dropdown
	'                      id="${attributeName}"
	'                      class="form-Control"
	'                      formControlName="${attributeName}Control"
	'                      [placeholder]="'Click to select'"
	'                      [data]="${attributeName}"
	'                      (onSelect)="${attributeName}C.markAsTouched()"
	'                      (onSelectAll)="${attributeName}C.markAsTouched()"
	'                      (onDeSelect)="${attributeName}C.markAsTouched()"
	'                      (onDeSelectAll)="${attributeName}C.markAsTouched()"
	'                      [settings]="${attributeName}MultiselectDropdownSettings">
	'                    </ng-multiselect-dropdown>

#else

	Type of GUI Field "$guiType" is not yet supported in the MOGLiCC template "SubTemplate_GuiElements.tpl".	

#end

