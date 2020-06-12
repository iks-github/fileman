#set( $packagePath = $TemplateStringUtility.replaceAllIn(${classDescriptor.package}, ".", "/") ) 

@TargetFileName ${classDescriptor.simpleName}.java # Name of output file with extension but without path
@TargetDir $model.getMetaInfoValueFor("backendGenDir")/$packagePath
@CreateNew true # creates target dir if not existing and overwrites target file if existing
@NameOfValidModel SpringBootBackendAngularFrontModel

package ${classDescriptor.package};
'
#parse("commonSubtemplates/importDomainModelClasses.tpl")
'
import javax.validation.constraints.*;
import io.swagger.annotations.*;
import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty.*;

'

#parse("B1_ClassJavaDoc.tpl")
#parse("B2_ClassSwaggerDoc.tpl")
 
#parse("C_ClassDefinitionLine.tpl")
{
	#parse("D_Serializable.tpl")

	#parse("E_Variables.tpl")

	#parse("F_SetterMethods.tpl")

	#parse("G_GetterMethods.tpl")

'	// ===============  additional Javabean methods  ===============
'
	#parse("H_toStringMethod.tpl")

'
	#parse("I_equalsMethod.tpl")

'
	#parse("J_hashCodeMethod.tpl")

'

#if ( $classDescriptor.doesHaveMetaInfo( "implements", "Cloneable") )

	#parse("K_cloneMethod.tpl")

#end


#set( $useJavaBeanRegistry = $model.getMetaInfoValueFor("useJavaBeanRegistry") )

#if ( $useJavaBeanRegistry == "true")

	'
	'    private int hashCodeOfListOfDomainObjects(List<? extends MOGLiCCJavaBean> list) {
	'        int hashCode = 1;
	'        for (MOGLiCCJavaBean javaBean : list)
	'		 {
	'			if (javaBean != null)
	'               hashCode = 31*hashCode + (javaBean==null ? 0 : javaBean.getRegistryId().hashCode());
	'		 }
	'       return hashCode;
	'    }	
	'
	'    private String toStringForListOfDomainObjects(List<? extends MOGLiCCJavaBean> list) 
	'    {
	'		if ( list == null ) 
	'			 return "[]";
	'
	'    	final StringBuffer sb = new StringBuffer("[");
	'    	
	'    	for (MOGLiCCJavaBean javaBean : list)
	'		 {
	'			if (javaBean != null)
	'               sb.append(javaBean.getRegistryId()).append("|");
	'		 }
	'    	final String s = sb.toString(); 
	'    	return s.substring(0, s.length() - 1) + "]";
	'    }

#end


#parse("l_mergeMethod.tpl")
}