#set( $notNeeded = $classDescriptor.getMetaInfoValueFor("dbEntity").contains("NOT FOUND") || 
                   ! $classDescriptor.getMetaInfoValueFor("dbEntity").equalsIgnoreCase("true") )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName)) 

#set( $packagePath = $TemplateStringUtility.replaceAllIn(${classDescriptor.package}, ".", "/") + "/dao" ) 

@TargetFileName ${classDescriptor.simpleName}BasicDao.java # Name of output file with extension but without path
@TargetDir $model.getMetaInfoValueFor("backendGenDir")/$packagePath
@CreateNew true # creates target dir if not existing and overwrites target file if existing
@NameOfValidModel SpringBootBackendAngularFrontModel
@SkipGeneration $notNeeded 

package ${classDescriptor.package}.dao;
'
import java.util.List;
'
import org.springframework.stereotype.Component;
'
import ${classDescriptor.package}.*;
'
import javax.persistence.*;
import javax.persistence.criteria.*;
'
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
'
@Component

#set( $ClassName = ${classDescriptor.simpleName} ) 
#set( $className = $TemplateStringUtility.firstToLowerCase($ClassName) ) 

/**
' * Implementation of basic dao functionalities.
' * This file is autogenerated by MOGLiCC. Do not modify manually!  
' */
@Repository
@Transactional
public class ${ClassName}BasicDao
{
'	@PersistenceContext
'	protected EntityManager entityManager;
'	
'	public List<${ClassName}> findAll${ClassName}s() {
'		CriteriaQuery<${ClassName}> criteria = entityManager.getCriteriaBuilder().createQuery(${ClassName}.class);
'		criteria.select(criteria.from(${ClassName}.class));
'		return entityManager.createQuery(criteria).getResultList();
'	}
'

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )

#set( $IdAttributeName = "!!! No Field With MetaInfo id defined !!!" ) 
#set( $isIdAttributeTypeNumber = false ) 

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#if ( $attributeDescriptor.doesHaveMetaInfo("id", "true") )
		#set( $IdAttributeName = $TemplateStringUtility.firstToUpperCase($attributeDescriptor.name) ) 
		#set( $isIdAttributeTypeNumber = $attributeDescriptor.doesHaveMetaInfo("JavaType", "Integer") ) 
	#end
	
	#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeDescriptor.name) ) 
	#set( $JavaType = $attributeDescriptor.getMetaInfoValueFor("JavaType"))

	#if ( $attributeDescriptor.doesHaveMetaInfo("unique", "true") && ! $attributeDescriptor.doesHaveMetaInfo("id", "true") )

		'	public ${ClassName} findBy${AttributeName}($JavaType $attributeDescriptor.name) 
		'	{
		'		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		'		CriteriaQuery<${ClassName}> criteria = criteriaBuilder.createQuery(${ClassName}.class);
		'		Root<${ClassName}> root = criteria.from(${ClassName}.class);
		'		criteria.select(root).where(criteriaBuilder.equal(root.get("$attributeDescriptor.name"), $attributeDescriptor.name));
		'		return entityManager.createQuery(criteria).getSingleResult();
		'	}
		'
	#else

		#if ( $attributeDescriptor.doesHaveMetaInfo("withFindAllMethod", "true") )
			'	public List<${ClassName}> findAllFor${AttributeName}($JavaType toSearch) {
			'        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
			'        CriteriaQuery<${ClassName}> criteria = criteriaBuilder.createQuery(${ClassName}.class);
			'        Root<${ClassName}> ${className} = criteria.from(${ClassName}.class);
			'        criteria.where(criteriaBuilder.equal(${className}.get("${attributeDescriptor.name}"), toSearch));
			'        return entityManager.createQuery(criteria).getResultList();
			'	}
			'
		#end
		
		#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("withFindAllMethodForAttribute") )
			#set( $otherAttributeName = $attributeDescriptor.getMetaInfoValueFor("withFindAllMethodForAttribute"))
			#set( $OtherAttributeName = $TemplateStringUtility.firstToUpperCase($otherAttributeName))
			'	public List<${ClassName}> findAllFor${AttributeName}And${OtherAttributeName}($JavaType ${attributeDescriptor.name}, $OtherAttributeName $otherAttributeName) {
			'        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
			'        CriteriaQuery<${ClassName}> criteria = criteriaBuilder.createQuery(${ClassName}.class);
			'        Root<${ClassName}> ${className} = criteria.from(${ClassName}.class);
			'        criteria.select(${className}).where(
			'                criteriaBuilder.and(
			'                        criteriaBuilder.equal(${className}.get("${attributeDescriptor.name}"), ${attributeDescriptor.name}),
			'                        criteriaBuilder.equal(${className}.get("$otherAttributeName"), $otherAttributeName)));
			'        return entityManager.createQuery(criteria).getResultList();
			'	}
			'
		#end
		
		#if ( $attributeDescriptor.doesHaveAnyMetaInfosWithName("withFindMethodForAttribute") )
			#set( $otherAttributeName = $attributeDescriptor.getMetaInfoValueFor("withFindMethodForAttribute"))
			#set( $OtherAttributeName = $TemplateStringUtility.firstToUpperCase($otherAttributeName))
			'	public ${ClassName} findBy${AttributeName}And${OtherAttributeName}($JavaType ${attributeDescriptor.name}, $OtherAttributeName $otherAttributeName) {
			'        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
			'        CriteriaQuery<${ClassName}> criteria = criteriaBuilder.createQuery(${ClassName}.class);
			'        Root<${ClassName}> ${className} = criteria.from(${ClassName}.class);
			'        criteria.select(${className}).where(
			'                criteriaBuilder.and(
			'                        criteriaBuilder.equal(${className}.get("${attributeDescriptor.name}"), ${attributeDescriptor.name}),
			'                        criteriaBuilder.equal(${className}.get("$otherAttributeName"), $otherAttributeName)));
			'        return entityManager.createQuery(criteria).getSingleResult();
			'	}
			'
		#end
	#end
	
	#if ( $attributeDescriptor.doesHaveMetaInfo("id", "true") )
		
		'	public ${ClassName} findBy${AttributeName}($JavaType ${attributeDescriptor.name}) { 
		'		return entityManager.find(${ClassName}.class, ${attributeDescriptor.name});
		'	}
		'
	#end
#end

'	public boolean update(${ClassName} entity) {
'		try {
'			entityManager.merge(entity);
'			return true;
'		} catch (Exception e) {
'			return false;
'		}
'	}
'
	
'	public ${ClassName} create(${ClassName} entity) {
'		entityManager.persist(entity);
'		return entity;
'	}
'
'	public void delete(${ClassName} entity) {
'		entityManager.remove(entity);
'	}
}
