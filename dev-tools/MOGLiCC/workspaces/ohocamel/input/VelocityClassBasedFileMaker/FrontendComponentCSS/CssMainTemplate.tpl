#set( $componentName = $classDescriptor.getMetaInfoValueFor( "frontendComponentName" ) )
@TargetFileName ${componentName}-component.css
@TargetDir $model.getMetaInfoValueFor("frontendSrcDir")/components/${componentName}
@CreateNew false # create only if not present
@NameOfValidModel SpringBootBackendAngularFrontModel
@SkipGeneration $classDescriptor.getMetaInfoValueFor("frontendComponentName").contains("NOT FOUND") 

button:disabled {
    background: gray;
    border: 1px solid black;
}


td { 
    padding-top: 1px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 20px;   
    background: lightskyblue 
} 

.details { 
    padding-top: 1px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 20px;   
    background: lightskyblue;
    width: 100%;
    display: block;
} 

.space {
    background: white;
}
