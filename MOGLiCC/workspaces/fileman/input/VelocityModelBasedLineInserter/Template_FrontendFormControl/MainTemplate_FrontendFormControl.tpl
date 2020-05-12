@TargetFileName fileman-details.component.ts
@TargetDir ..\Fileman-Frontend\src\app\components\fileman-details
@NameOfValidModel FilemanDataModel
@ReplaceStart "// The form control block below is generated - do not modify manually!"
@ReplaceEnd "// The form control block above is generated - do not modify manually!"


'  createMetaDataFormControl() {
'    return new FormGroup({


#set( $classDescriptor = $model.getClassDescriptor("FileMetaData") )
#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiType"))
	
		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) ) 
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
		#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) ) 
		#set( $initialGuiValue = $attributeDescriptor.getMetaInfoValueFor("initialGuiValue") )

		#if ($initialGuiValue.contains("NOT FOUND")) 
			#set( $initialGuiValue = "" )
		#end	

'        ${attributeName}Control: new FormControl('$initialGuiValue', [

		#if ( $attributeDescriptor.doesHaveMetaInfo("Mandatory", "true"))
'                Validators.required, 
		#end

		#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("MinLength"))
			#set( $minLength = $attributeDescriptor.getMetaInfoValueFor("MinLength") )
'                Validators.minLength($minLength), 
		#end

		#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("MaxLength"))
			#set( $maxLength = $attributeDescriptor.getMetaInfoValueFor("MaxLength") )
'                Validators.maxLength($maxLength), 
		#end

		#if ( $attributeDescriptor.doesHaveMetaInfo("allowSpace", "no"))
'                FilemanValidators.doesNotContainSpace,
		#end

		#if ( $attributeDescriptor.doesHaveMetaInfo("unique", "true"))
'              ],		
'              this.isNotUnique),
		#else
'              ]),		
		#end			
	
	#end

#end

'    });
'  }

#parse("SubTemplate_FromGetterMethods.tpl")

#parse("SubTemplate_getFileMetaData.tpl")

#parse("SubTemplate_setDataToControls.tpl")
