#set( $newDomainObject = $model.getMetaInfoValueFor("newDomainObject") )
#set( $skip = $newDomainObject.contains("NOT FOUND") )
#set( $NewDomainObject = $TemplateStringUtility.firstToUpperCase($newDomainObject) )

@TargetFileName app.module.ts
@TargetDir ..\\..\\Fileman-Frontend\\src\app
@NameOfValidModel SpringBootBackendAngularFrontModel
@InsertAbove FilemetadataListLayout, FilemetadataTableLayout, FilemetadataTilesLayout
@SkipGeneration $skip

'    ${NewDomainObject}ListLayout, ${NewDomainObject}TableLayout, ${NewDomainObject}TilesLayout,
