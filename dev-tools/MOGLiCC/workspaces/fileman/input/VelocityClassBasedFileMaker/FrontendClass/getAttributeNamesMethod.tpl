'
'    static getAttributeNames(): string[] {
'        return [

#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)

	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeDescriptor.name, " ", "") ) 
	
	'           '$attributeName', 
#end

'        ];
'    }
