#set( $quotes = '"' )
#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("guiType"))
	
		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) ) 
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
		#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) )
		
		
		#if ( $attributeDescriptor.doesHaveMetaInfo( "Mandatory", "true") )
'            <div *ngIf="${attributeName}C.errors?.required && ${attributeName}C.touched">
'               The field <i>${AttributeName}</i> is required.
'            </div>		
		#end
		
		#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName( "MinLength" ))
'            <div *ngIf="${attributeName}C.errors?.minlength && ${attributeName}C.touched">
'               Minimum length of field <i>${AttributeName}</i> is {{${attributeName}C.errors.minlength.requiredLength}}.
'            </div>
        #end
		
		#if ( $attributeDescriptor.doesHaveMetaInfo( "allowSpace", "false") )
'            <div *ngIf="${attributeName}C.errors?.doesNotContainSpace">
'               No spaces are allowed in field <i>${AttributeName}</i>!
'            </div>	
		#end
			
		#if ( $attributeDescriptor.doesHaveMetaInfo( "unique", "true") || $attributeDescriptor.doesHaveMetaInfo( "unique", "for-client"))
'            <div *ngIf="${attributeName}C.errors?.isNotUnique">
'               The value for field <i>${AttributeName}</i> must be unique! <i>{{${attributeName}C.value}}</i> is not unique.
'            </div>
		#end

	#end
	
#end