'
'    static getAttributeNames(): string[] {
'        return [

#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)

	#if ( ! $attributeDescriptor.doesHaveMetaInfo("excludeFromClientDataClass", "true") )
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeDescriptor.name, " ", "") ) 
	
		'           '$attributeName', 
	#end
#end

'        ];
'    }
