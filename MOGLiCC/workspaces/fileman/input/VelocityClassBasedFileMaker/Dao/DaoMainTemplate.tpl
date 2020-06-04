#set( $notNeeded = $classDescriptor.getMetaInfoValueFor("DaoAndSql").contains("NOT FOUND") || 
                   ! $classDescriptor.getMetaInfoValueFor("DaoAndSql").equalsIgnoreCase("true") )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName)) 

#set( $packagePath = $TemplateStringUtility.replaceAllIn(${classDescriptor.package}, ".", "/") + "/dao" ) 

@TargetFileName ${classDescriptor.simpleName}Dao.java # Name of output file with extension but without path
@TargetDir $model.getMetaInfoValueFor("backendGenDir")/$packagePath
@CreateNew true # creates target dir if not existing and overwrites target file if existing
@NameOfValidModel SpringBootBackendAngularFrontModel
@SkipGeneration $notNeeded 

package ${classDescriptor.package}.dao;
'
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
'
import org.springframework.stereotype.Component;
'
import ${classDescriptor.package}.${classDescriptor.simpleName};
'
@Component

#set( $ClassName = ${classDescriptor.simpleName} ) 
#set( $className = $TemplateStringUtility.firstToLowerCase($ClassName) ) 

public class ${ClassName}Dao
{
'	protected List<${ClassName}> ${className}s = new java.util.ArrayList<>();
'
'	public List<${ClassName}> findAll${ClassName}s() {
'		return ${className}s;
'	}
'

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )

#set( $IdAttributeName = "!!! No Field With MetaInfo id defined !!!" ) 
#set( $isIdAttributeTypeNumber = false ) 

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ( $attributeDescriptor.doesHaveMetaInfo("id", "true") )
		#set( $IdAttributeName = $TemplateStringUtility.firstToUpperCase($attributeDescriptor.name) ) 
		#set( $isIdAttributeTypeNumber = $IdAttributeType.equals("Integer") ) 
	#end
	
	#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeDescriptor.name) ) 
	#set( $JavaType = $attributeDescriptor.getMetaInfoValueFor("JavaType"))

	#if ( $attributeDescriptor.doesHaveMetaInfo("unique", "true") )

		'	public ${ClassName} findBy${AttributeName}($JavaType $attributeDescriptor.name) 
		'	{
		'	   	Optional<${ClassName}> match = ${className}s.stream()
		'                .filter (data -> data.get${AttributeName}()
		'                .equals($attributeDescriptor.name))
		'                .findFirst();
		'		if (match.isPresent()) {
		'			return match.get();
		'		}
		'		return null;
		'	}
		'
		
	#else

		#if ( $attributeDescriptor.doesHaveMetaInfo("withFindAllMethod", "true") )
			'	public List<${ClassName}> findAllFor${AttributeName}(String toSearch)
			'	{
		   	'		return ${className}s.stream()
	        '                .filter (dataset -> dataset.get${AttributeName}().equals(toSearch))
	        '                .collect(Collectors.toList());
			'	}	
			'
		#end
	#end
	
	#if ( $attributeDescriptor.doesHaveMetaInfo("id", "true") )
	
		'	public boolean update(${ClassName} ${className}) 
		'	{
		'		Optional<${ClassName}> match = ${className}s.stream()
		'                                                   .filter(o -> o.get${AttributeName}() == ${className}.get${AttributeName}())
		'                                                   .findFirst();
		'		if (! match.isPresent()) {
		'			return false;
		'		}
		
		#parse("set-non-sql-field-to-null.tpl")
		
		'		${className}s.remove(match.get());
		'		${className}s.add(${className});
		'		return true;
		'	}
		'
	#end

#end	
	
	
	
'	public ${ClassName} create(${ClassName} ${className}) {

	#if ( $isIdAttributeTypeNumber )
	'		${className}.set${IdAttributeName}(${className}s.size()+1);
	#end

	#parse("set-non-sql-field-to-null.tpl")

'		${className}s.add(${className});
'		return ${className};
'	}
'
'	public void delete(${ClassName} ${className}) {
'		${className}s.remove(${className});
'	}
}
