#set( $classDescriptor = $model.getClassDescriptor("FileGroup") )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName)) 

@TargetFileName fileman-${className}-details.component.html
@TargetDir ..\\..\\Fileman-Frontend\\src\app\components\details\fileman-${className}-details
@NameOfValidModel SpringBootBackendAngularFrontModel
@ReplaceStart "<!-- The error sections below are generated: Do not modify manually! -->"
@ReplaceEnd "<!-- The error sections above are generated: Do not modify manually! -->"

#parse("commonSubtemplates/FrontendDetailsHtmlValidationErrors.tpl")
