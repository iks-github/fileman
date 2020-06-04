#set( $newDomainObject = $model.getMetaInfoValueFor("newDomainObject") )
#set( $notNeeded = $classDescriptor.getMetaInfoValueFor("FrontendService").contains("NOT FOUND") || 
                   ! $classDescriptor.getMetaInfoValueFor("FrontendService").equalsIgnoreCase("true") ||
                   $newDomainObject.contains("NOT FOUND"))
#set( $NewDomainObject = $TemplateStringUtility.firstToUpperCase($newDomainObject) )

@TargetFileName app.module.ts
@TargetDir ..\Fileman-Frontend\src\app
@NameOfValidModel SpringBootBackendAngularFrontModel
@InsertAbove FilemanOverviewComponent,
@SkipGeneration $skip

'    ${NewDomainObject}Service,
