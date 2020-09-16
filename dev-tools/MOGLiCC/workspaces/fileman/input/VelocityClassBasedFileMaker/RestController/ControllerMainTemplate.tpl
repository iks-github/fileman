#set( $notNeeded = $classDescriptor.getMetaInfoValueFor("BackendController").contains("NOT FOUND") || 
                   ! $classDescriptor.getMetaInfoValueFor("BackendController").equalsIgnoreCase("true") )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName)) 

#set( $packagePath = $TemplateStringUtility.replaceAllIn(${classDescriptor.package}, ".", "/") + "/rest" ) 

#set( $dataFromToken = $classDescriptor.getMetaInfoValueFor("needsDataFromToken") )
#set( $DataFromToken = $TemplateStringUtility.firstToUpperCase($dataFromToken) )

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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
'
#set( $ClassName = ${classDescriptor.simpleName} ) 
#set( $className = $TemplateStringUtility.firstToLowerCase($ClassName) ) 

import ${classDescriptor.package}.$ClassName;
import ${classDescriptor.package}.dao.${ClassName}Dao;

#if ( ! $dataFromToken.contains("NOT FOUND"))
	import ${classDescriptor.package}.$DataFromToken;
	import ${classDescriptor.package}.dao.${DataFromToken}Dao;
#end

import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;
import com.iksgmbh.fileman.backend.jwt.JwtTokenUtil;
'
@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class ${ClassName}RestController 
{
'	@Autowired
'	private ${ClassName}Dao ${className}Dao;
'

#if ( ! $dataFromToken.contains("NOT FOUND"))
'	@Autowired
'	private ${DataFromToken}Dao ${dataFromToken}Dao;
'
#end

'	@GetMapping("/${className}s")
#if ( ! $dataFromToken.contains("NOT FOUND"))
'	public List<${ClassName}> findAll${ClassName}s(@RequestHeader("Authorization") String authHeader) {
'		String token = JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
'		Integer ${dataFromToken}Id = JwtTokenUtil.get${DataFromToken}IdFromToken(token);
'		${DataFromToken} ${dataFromToken} = ${dataFromToken}Dao.findById(${dataFromToken}Id);
'		
'		return ${className}Dao.findAllFor${DataFromToken}(${dataFromToken});
#else
'	public List<${ClassName}> findAll${ClassName}s() {
'		return ${className}Dao.findAll${ClassName}s();
#end
'	}
'	

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )
#set( $IdAttributeName = "!!! No Field With MetaInfo id defined !!!" )
#set( $idAttributeName = "!!! No Field With MetaInfo id defined !!!" )

#if ( ! $classDescriptor.getMetaInfoValueFor("needsDataFromToken").contains("NOT FOUND"))
	#set( $needsDataFromToken = $classDescriptor.getMetaInfoValueFor("needsDataFromToken") )
#end

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ( $attributeDescriptor.doesHaveMetaInfo("id", "true") )
		#set( $IdAttributeName = $TemplateStringUtility.firstToUpperCase($attributeDescriptor.name) ) 
		#set( $idAttributeName = $attributeDescriptor.name )
		#set( $IdJavaType =  $attributeDescriptor.getMetaInfoValueFor("JavaType") )
	#end

	#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeDescriptor.name) ) 
	#set( $javaType =  $attributeDescriptor.getMetaInfoValueFor("JavaType") )
	
	#if ( $attributeDescriptor.doesHaveMetaInfo("id", "true") )

		'    @GetMapping("/${className}s/{${attributeDescriptor.name}}")
		'    public ${ClassName} find${ClassName}By${AttributeName}(@RequestHeader("Authorization") String authHeader,
		'            @PathVariable $javaType $attributeDescriptor.name) {
		'		
		#if ( ! $dataFromToken.contains("NOT FOUND"))
			'		String token = JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
			'		Integer ${dataFromToken}Id = JwtTokenUtil.get${DataFromToken}IdFromToken(token);
			'		${DataFromToken} ${dataFromToken} = ${dataFromToken}Dao.findById(${dataFromToken}Id);
			'		
			'		${ClassName} ${className} = ${className}Dao.findBy${AttributeName}And${DataFromToken}(${attributeDescriptor.name}, $dataFromToken);
		#else
			'		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
			'		
			'		${ClassName} ${className} = ${className}Dao.findBy${AttributeName}($attributeDescriptor.name);
		#end
		'		if (${className} == null) {
		'			throw new ResourceNotFoundException("${ClassName} '" + $attributeDescriptor.name +"' + not found.");
		'		}
		'		return ${className};
		'   }
		'	
		
	#else
	
		#if ( $attributeDescriptor.doesHaveMetaInfo("withFindAllMethod", "true") && $dataFromToken.contains("NOT FOUND"))
		
			'   @GetMapping("/favouriteSettings/${attributeDescriptor.name}/{${attributeDescriptor.name}}")
			'   public List<${ClassName}> findAll${ClassName}By${AttributeName}(@RequestHeader("Authorization") String authHeader,
		    '            @PathVariable $javaType ${attributeDescriptor.name}) {
			'		
			'		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
			'		
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
'	public $IdJavaType create${ClassName}(@RequestHeader("Authorization") String authHeader,
'            @Valid @RequestBody ${ClassName} ${className}) {
'		
#if ( ! $dataFromToken.contains("NOT FOUND"))
	'		String token = JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
	'		Integer ${dataFromToken}Id = JwtTokenUtil.get${DataFromToken}IdFromToken(token);
	'		${DataFromToken} ${dataFromToken} = ${dataFromToken}Dao.findById(${dataFromToken}Id);
	'		
	'		${className}.set${DataFromToken}($dataFromToken);
	'		return ${className}Dao.create(${className}).get${IdAttributeName}();
#else
	'		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
	'		
	'		return ${className}Dao.create(${className}).get${IdAttributeName}();
#end
'    }
'
'	@PutMapping("/${className}s")
'	public void update${ClassName}(@RequestHeader("Authorization") String authHeader,
'            @Valid @RequestBody ${ClassName} ${className}) {
'		
#if ( ! $dataFromToken.contains("NOT FOUND"))
	'		String token = JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
	'		Integer ${dataFromToken}Id = JwtTokenUtil.get${DataFromToken}IdFromToken(token);
	'		${DataFromToken} ${dataFromToken} = ${dataFromToken}Dao.findById(${dataFromToken}Id);
	'		
	'		${ClassName} toUpdate = ${className}Dao.findBy${IdAttributeName}And${DataFromToken}(${className}.get${IdAttributeName}(), $dataFromToken);
	'		if (toUpdate == null) {
	'			throw new ResourceNotFoundException("${ClassName} '" + ${className} +"' + not found.");
	'		}
	'		toUpdate.merge(${className});
	'		boolean ok = ${className}Dao.update(toUpdate);
#else
	'		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
	'		
	'		boolean ok = ${className}Dao.update(${className});
#end
'		if (! ok) {
'			throw new ResourceNotFoundException("${ClassName} '" + ${className}.get${IdAttributeName}() +"' + not found for update.");
'		}
'	}
'	
'	@DeleteMapping("/${className}s/{$idAttributeName}")
'	public ResponseEntity<?> delete${ClassName}(@RequestHeader("Authorization") String authHeader,
'            @PathVariable $IdJavaType $idAttributeName) {
'		
#if ( ! $dataFromToken.contains("NOT FOUND"))
	'		String token = JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
	'		Integer ${dataFromToken}Id = JwtTokenUtil.get${DataFromToken}IdFromToken(token);
	'		${DataFromToken} ${dataFromToken} = ${dataFromToken}Dao.findById(${dataFromToken}Id);
	'		
	'		${ClassName} ${className} = ${className}Dao.findBy${IdAttributeName}And${DataFromToken}($idAttributeName, $dataFromToken);
#else
	'		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
	'		
	'		${ClassName} ${className} = ${className}Dao.findBy${IdAttributeName}($idAttributeName);
#end
'		if (${className} == null) {
'			throw new ResourceNotFoundException("${ClassName} '" + $idAttributeName +"' + not found.");
'		}
'		${className}Dao.delete(${className});
'		return ResponseEntity.ok().build();
'	}
}
