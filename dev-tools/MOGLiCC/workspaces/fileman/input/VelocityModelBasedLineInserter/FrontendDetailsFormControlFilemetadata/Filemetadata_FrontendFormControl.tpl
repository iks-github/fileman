#set( $classDescriptor = $model.getClassDescriptor("FileMetaData") )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName)) 

@TargetFileName fileman-filemetadata-details.component.ts
@TargetDir ..\\..\\Fileman-Frontend\\src\app\components\details\fileman-filemetadata-details
@NameOfValidModel SpringBootBackendAngularFrontModel
@ReplaceStart "// The form control block below is generated - do not modify manually!"
@ReplaceEnd "// The form control block above is generated - do not modify manually!"

#parse("commonSubtemplates/FrontendDetailsFormControlTemplate.tpl")