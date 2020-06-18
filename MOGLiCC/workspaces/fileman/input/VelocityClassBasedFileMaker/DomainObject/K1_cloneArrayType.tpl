#set( $arrayElementType = $TemplateJavaUtility.getArrayElementType($javaType) )

'
'		if ( this.${attributeName} != null )  
'		{

			#if ( $arrayElementType == "byte" )
				'			clone.${attributeName} = ${attributeName}.clone();
			#else

				'					arr = ${attributeName}.clone();
	
				'			final ${arrayElementType}[] arr = new ${arrayElementType}[${attributeName}.length];
				'			for (int i = 0; i < ${attributeName}.length; i++) {
				'				if (${attributeName}[i] != null) 
				'				{
	
				#if ( $arrayElementType == "String" )
	
				'					arr[i] = "" + ${attributeName}[i];
	
				#else
	
				'					// probably, here is need of manual adaptation
				'					arr[i] = ($arrayElementType)${attributeName}[i].clone();
	
				#end
				'				}
	
				'			}
				'			clone.${attributeName} = arr;
			
			#end
'		}
