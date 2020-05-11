#set( $packagePath = $TemplateStringUtility.replaceAllIn(${classDescriptor.package}, ".", "/") + "/dao" ) 

@TargetFileName ${classDescriptor.simpleName}DaoImpl.java # Name of output file with extension but without path
@TargetDir $model.getMetaInfoValueFor("backendSrcDir")/$packagePath
@CreateNew false # create only if not present
@NameOfValidModel FilemanDataModel
@SkipGeneration $classDescriptor.doesHaveMetaInfo( "withDaoAndSql", "false") 

package ${classDescriptor.package}.dao;
'
import org.springframework.stereotype.Component;
import com.iksgmbh.fileman.backend.${classDescriptor.simpleName};

'
/**
' * Created as draft by MOGLiCC.
' * Adapt freely if you need.
' *
**/
@Component
public class ${classDescriptor.simpleName}DaoImpl extends ${classDescriptor.simpleName}Dao 
{

#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName) )

'	public ${classDescriptor.simpleName}DaoImpl() {
'		${className}s.add(createDataset("readme.txt", "10.10.2000", "ich", 1234));
'		${className}s.add(createDataset("logo.gif", "11.10.2000", "du", 5555));
'		${className}s.add(createDataset("script.groovy", "12.10.2000", "er", 6543));
'	}
'	
'	private $classDescriptor.simpleName createDataset(

	#set( $counter = 0 )
	#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)
		#set( $counter = $counter + 1 )
		
		#set( $javaType = $attributeDescriptor.getMetaInfoValueFor("JavaType") )
		#set( $attributeName = $attributeDescriptor.name )
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 

		#if( $classDescriptor.attributeDescriptorList.size() == $counter )
			'  			$javaType $attributeName) 
		#else
			'  			$javaType $attributeName, 
		#end 
	#end
'	{
'		${classDescriptor.simpleName} toReturn = new ${classDescriptor.simpleName}();

	#foreach($attributeDescriptor in $classDescriptor.attributeDescriptorList)
		#set( $attributeName = $attributeDescriptor.name )
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
		#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) )
		#set( $javaType = $attributeDescriptor.getMetaInfoValueFor("JavaType") )
		'		toReturn.set${AttributeName}($attributeName);
	#end

'		return toReturn;
'	}
}