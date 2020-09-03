#set( $quote = "'" ) 
#set( $counter = 0 ) 
#set( $total = 0 ) 

#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)
	#if ( ! $attributeDescriptor.doesHaveMetaInfo("excludeFromClientDataClass", "true") )
		#set( $total = $total + 1 )
	#end
#end

'
'    getStringRepresentation(): string {
'        return ${quote}DETAILS:\n$quote +
'               ${quote}------------------------------------------\n${quote} +

#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)

	#if ( ! $attributeDescriptor.doesHaveMetaInfo("excludeFromClientDataClass", "true") )
		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) )
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
		#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) )
		#set( $counter = $counter + 1 )
	
		#if ($counter < $total)
			'           $quote$AttributeName: $quote + this.$attributeName + $quote\n$quote +  
		#else
			'           $quote$AttributeName: $quote + this.$attributeName + $quote\n$quote;  
		#end
	#end
	
#end

'    }
