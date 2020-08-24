
#if ( $classDescriptor.doesHaveMetaInfo("dbEntity", "true") )
	@Entity
	#set( $tableName = $TemplateStringUtility.toDBTableName(${classDescriptor.simpleName}) )
	#if ( $tableName.startsWith("_")) 
		#set( $tableName = $tableName.substring(1, $tableName.length()) )
	#end
	@Table(name="${tableName}")
#end


#set( $superClass = $classDescriptor.getMetaInfoValueFor("extends") )
#set( $superClassSimpleName = $TemplateJavaUtility.getSimpleClassName($superClass) )
#set( $interfaceList = $classDescriptor.getAllMetaInfoValuesFor("implements") )

#set( $useJavaBeanRegistry = $model.getMetaInfoValueFor("useJavaBeanRegistry") )

#if ( $useJavaBeanRegistry == "true" )

	$TemplateStringUtility.addToList( $interfaceList, "MOGLiCCJavaBean") 

#end


#set( $interfaceSimpleNameList = $TemplateJavaUtility.getSimpleClassName($interfaceList) )
#set( $interfaceSimpleNames = $TemplateStringUtility.toCommaSeparatedString($interfaceSimpleNameList) )

#if ( $classDescriptor.isValueAvailable($superClass) ) 

     #if ( $TemplateStringUtility.isListEmpty($interfaceList) )
     
     	public class ${classDescriptor.simpleName} extends $superClassSimpleName 
     	
     #else
     
     	public class ${classDescriptor.simpleName} extends $superClassSimpleName implements $interfaceSimpleNames
     
     #end
     
#else

     #if ( $TemplateStringUtility.isListEmpty($interfaceList) )
     
     	public class ${classDescriptor.simpleName}
     	
     #else
     
     	public class ${classDescriptor.simpleName} implements $interfaceSimpleNames
     
     #end
          
#end