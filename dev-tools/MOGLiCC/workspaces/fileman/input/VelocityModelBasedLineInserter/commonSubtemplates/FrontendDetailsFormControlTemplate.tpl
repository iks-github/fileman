'  createDetailsFormGroup() {
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
		
		#if ( $attributeDescriptor.doesHaveMetaInfo("requiredForNewInstance", "true"))
'                this.requiredForNew${classDescriptor.simpleName}.bind(this),
		#end

		#if ( $attributeDescriptor.doesHaveMetaInfo("unique", "true") || $attributeDescriptor.doesHaveMetaInfo("unique", "for-client"))
'              ],		
'              this.isNotUnique.bind(this)),
		#else
'              ]),		
		#end			
	
	#end

#end

#if ( $classDescriptor.doesHaveMetaInfo("CrossFieldValidation", "true"))
'    }, this.applyCrossFieldValidation.bind(this));
#else
'    });
#end
'  }

#parse("commonSubtemplates/SubTemplate_FromGetterMethods.tpl")

#parse("commonSubtemplates/SubTemplate_getFileMetaData.tpl")

#parse("commonSubtemplates/SubTemplate_setDataToControls.tpl")
