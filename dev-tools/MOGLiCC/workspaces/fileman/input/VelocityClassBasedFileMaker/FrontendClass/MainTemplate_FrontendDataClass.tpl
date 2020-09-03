#set( $notNeeded = $classDescriptor.getMetaInfoValueFor("FrontendService").contains("NOT FOUND") || 
                   ! $classDescriptor.getMetaInfoValueFor("FrontendService").equalsIgnoreCase("true") )

@TargetFileName ${classDescriptor.simpleName}.ts # Name of output file with extension but without path
@TargetDir $model.getMetaInfoValueFor("frontendSrcDir")/common/domainobjects/gen
@CreateNew true # creates target dir if not existing and overwrites target file if existing
@NameOfValidModel SpringBootBackendAngularFrontModel
@SkipGeneration $notNeeded 

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#parse("isDomainType.tpl")

	#if( $isDomainType )
		'import { $JavaType } from 'src/app/common/domainobjects/gen/$JavaType';	
	#end
#end
'
export class ${classDescriptor.simpleName}
{
#foreach ($attributeDescriptor in $attributeDescriptorList)
	
	#if ( ! $attributeDescriptor.doesHaveMetaInfo("excludeFromClientDataClass", "true") )
		#parse("FrontendType.tpl")
		#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) ) 
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
	
		'    $attributeName: $frontendType;
	#end

#end

'
'    constructor(untyped${classDescriptor.simpleName}: any) {
'        if (untyped${classDescriptor.simpleName} != null) {

#foreach ($attributeDescriptor in $attributeDescriptorList)
	
	#if ( ! $attributeDescriptor.doesHaveMetaInfo("excludeFromClientDataClass", "true") )
		#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeDescriptor.name, " ", "") ) 
		'            this.$attributeName = untyped${classDescriptor.simpleName}.$attributeName;
	#end

#end

'        }
'    }
'

#parse("getAttributeNamesMethod.tpl")

#parse("GetterMethods.tpl")

#parse("SetterMethods.tpl")

#parse("EqualsMethod.tpl")

#parse("getStringRepresentation.tpl")
}
'