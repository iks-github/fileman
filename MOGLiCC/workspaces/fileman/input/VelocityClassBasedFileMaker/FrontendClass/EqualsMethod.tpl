'
'    public equals(obj: ${classDescriptor.simpleName}): boolean {
'        if (this === obj) { return true; }
'        if (obj == null) { return false; }
'			
#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)

	#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) )
	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 

'        if (this.$attributeName !== obj.$attributeName) { return false; }

#end
'	
'        return true;
'    }
