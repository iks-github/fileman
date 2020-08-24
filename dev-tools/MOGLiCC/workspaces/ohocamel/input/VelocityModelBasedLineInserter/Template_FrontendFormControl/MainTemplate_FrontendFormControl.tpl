#set( $classDescriptor = $model.getClassDescriptor("HoroscopeRequestData") )
#set( $componentName = $classDescriptor.getMetaInfoValueFor( "frontendComponentName" ) )

@TargetFileName ${componentName}-component.ts
@TargetDir $model.getMetaInfoValueFor("frontendSrcDir")/components/${componentName}
@NameOfValidModel SpringBootBackendAngularFrontModel
@ReplaceStart "// The form control block below is generated - do not modify manually!"
@ReplaceEnd "// The form control block above is generated - do not modify manually!"


'  createFormControl() {
'    return new FormGroup({


#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiType"))
	
		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) ) 
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
		#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) ) 
		#set( $defaultValue = $attributeDescriptor.getMetaInfoValueFor("defaultValue") )

		#if ($defaultValue.contains("NOT FOUND")) 
			#set( $defaultValue = "" )
		#end	

'        ${attributeName}Control: new FormControl('$defaultValue', [

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
'              this.isNotUnique.bind(this)),
		#else
'              ]),		
		#end			
	
	#end

#end

'    });
'  }

#parse("SubTemplate_FromGetterMethods.tpl")

#parse("SubTemplate_getDataObjectFromControls.tpl")

#parse("SubTemplate_setDataToControls.tpl")
