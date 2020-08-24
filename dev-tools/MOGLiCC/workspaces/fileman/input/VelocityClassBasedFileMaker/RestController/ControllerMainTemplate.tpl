#set( $notNeeded = $classDescriptor.getMetaInfoValueFor("BackendController").contains("NOT FOUND") || 
                   ! $classDescriptor.getMetaInfoValueFor("BackendController").equalsIgnoreCase("true") )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName)) 

#set( $packagePath = $TemplateStringUtility.replaceAllIn(${classDescriptor.package}, ".", "/") + "/rest" ) 

@TargetFileName ${classDescriptor.simpleName}RestController.java # Name of output file with extension but without path
@TargetDir $model.getMetaInfoValueFor("backendGenDir")/$packagePath
@CreateNew true # creates target dir if not existing and overwrites target file if existing
@NameOfValidModel SpringBootBackendAngularFrontModel
@SkipGeneration $notNeeded

package ${classDescriptor.package}.rest;
'
import java.util.List;
'
import javax.validation.Valid;
'
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
'
#set( $ClassName = ${classDescriptor.simpleName} ) 
#set( $className = $TemplateStringUtility.firstToLowerCase($ClassName) ) 

import ${classDescriptor.package}.$ClassName;
import ${classDescriptor.package}.dao.${ClassName}Dao;
import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;
'
@RestController
@CrossOrigin(origins = {"*"})

public class ${ClassName}RestController 
{
'	@Autowired
'	private ${ClassName}Dao ${className}Dao;
'
'	@GetMapping("/${className}s")
'	public List<${ClassName}> findAll${ClassName}s() {
'		return ${className}Dao.findAll${ClassName}s();
'	}
'	

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )
#set( $IdAttributeName = "!!! No Field With MetaInfo id defined !!!" ) 
#set( $idAttributeName = "!!! No Field With MetaInfo id defined !!!" ) 

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ( $attributeDescriptor.doesHaveMetaInfo("id", "true") )
		#set( $IdAttributeName = $TemplateStringUtility.firstToUpperCase($attributeDescriptor.name) ) 
		#set( $idAttributeName = $attributeDescriptor.name )
		#set( $IdJavaType =  $attributeDescriptor.getMetaInfoValueFor("JavaType") )
	#end

	#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeDescriptor.name) ) 
	#set( $javaType =  $attributeDescriptor.getMetaInfoValueFor("JavaType") )
	
	#if ( $attributeDescriptor.doesHaveMetaInfo("id", "true") )

		'	@GetMapping("/${className}s/{${attributeDescriptor.name}}")
		'    public ${ClassName} find${ClassName}By${AttributeName}(@PathVariable $javaType $attributeDescriptor.name) {
		'		${ClassName} ${className} = ${className}Dao.findBy${AttributeName}($attributeDescriptor.name);
		'		if (${className} == null) {
		'			throw new ResourceNotFoundException("${ClassName} '" + $attributeDescriptor.name +"' + not found.");
		'		}
		'		return ${className};
		'   }
		'	
		
	#else
	
		#if ( $attributeDescriptor.doesHaveMetaInfo("withFindAllMethod", "true") )
		
			'   @GetMapping("/favouriteSettings/${attributeDescriptor.name}/{${attributeDescriptor.name}}")
			'   public List<${ClassName}> findAll${ClassName}By${AttributeName}(@PathVariable $javaType ${attributeDescriptor.name}) {
			'		List<${ClassName}> ${className}List = ${className}Dao.findAllFor${AttributeName}(${attributeDescriptor.name});
			'		if (${className}List == null) {
			'			throw new ResourceNotFoundException("${ClassName} '" + ${attributeDescriptor.name} +"' + not found.");
			'		}
			'       return ${className}List;
			'   }
			'   

		#end
	
	#end
	
	
#end

'	@PostMapping("/${className}s")
'	public $IdJavaType create${ClassName}(@Valid @RequestBody ${ClassName} ${className}) 
'	{
'		return ${className}Dao.create(${className}).get${IdAttributeName}();
'    }
'
'	@PutMapping("/${className}s")
'	public void update${ClassName}(@Valid @RequestBody ${ClassName} ${className}) 
'	{
'		boolean ok = ${className}Dao.update(${className});
'		if (! ok) {
'			throw new ResourceNotFoundException("${ClassName} '" + ${className}.get${IdAttributeName}() +"' + not found for update.");
'		}
'	}
'	
'	@DeleteMapping("/${className}s/{$idAttributeName}")
'	public ResponseEntity<?> delete${ClassName}(@PathVariable $IdJavaType $idAttributeName) {
'		${ClassName} ${className} = ${className}Dao.findBy${IdAttributeName}($idAttributeName);
'		if (${className} == null) {
'			throw new ResourceNotFoundException("${ClassName} '" + $idAttributeName +"' + not found.");
'		}
'       ${className}Dao.delete(${className});
'       return ResponseEntity.ok().build();
'	}
}
