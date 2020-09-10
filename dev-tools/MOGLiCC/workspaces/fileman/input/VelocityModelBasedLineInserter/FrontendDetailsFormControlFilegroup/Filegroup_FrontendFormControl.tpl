#set( $classDescriptor = $model.getClassDescriptor("FileGroup") )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName)) 

@TargetFileName fileman-filegroup-details.component.ts
@TargetDir ..\\..\\Fileman-Frontend\\src\app\components\details\fileman-filegroup-details
@NameOfValidModel SpringBootBackendAngularFrontModel
@ReplaceStart "// The form control block below is generated - do not modify manually!"
@ReplaceEnd "// The form control block above is generated - do not modify manually!"

#parse("commonSubtemplates/FrontendDetailsFormControlTemplate.tpl")