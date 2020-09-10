#set( $classDescriptor = $model.getClassDescriptor("FileMetaData") )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName)) 

@TargetFileName fileman-filemetadata-table-layout-component.html
@TargetDir ..\\..\\Fileman-Frontend\\src\app\components\layout\filemetadata\table-layout
@NameOfValidModel SpringBootBackendAngularFrontModel
@ReplaceStart "<!-- The header-td-sections below is generated: Do not modify manually! -->"
@ReplaceEnd "<!-- The header-td-sections above is generated: Do not modify manually! -->"

#parse("commonSubtemplates/FrontendHtmlTableHeaders.tpl")