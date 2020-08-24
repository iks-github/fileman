#set( $componentName = $classDescriptor.getMetaInfoValueFor( "frontendComponentName" ) )
@TargetFileName ${componentName}-component.html
@TargetDir $model.getMetaInfoValueFor("frontendSrcDir")/components/${componentName}
@CreateNew false # create only if not present
@NameOfValidModel SpringBootBackendAngularFrontModel
@SkipGeneration $classDescriptor.getMetaInfoValueFor("frontendComponentName").contains("NOT FOUND") 



#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )
#set( $quote = "'" ) 

#foreach ($attributeDescriptor in $attributeDescriptorList)

	#set( $attributeName = $TemplateStringUtility.firstToLowerCase($attributeDescriptor.name) )
	#set( $attributeName = $TemplateStringUtility.replaceAllIn($attributeName, " ", "") ) 
	#set( $AttributeName = $TemplateStringUtility.firstToUpperCase($attributeName) )
	
#end

<h2>Enter ${classDescriptor.simpleName}:</h2>

<form [formGroup]="form" (ngSubmit)="submit()">
'
'    <!-- The table section below is generated: Do not modify manually! -->
'    <!-- The table section above is generated: Do not modify manually! -->
'
'    <div class="form-group alert alert-danger" *ngIf="form.invalid">
'        Validation errors:
'
'        <!-- The error sections below are generated: Do not modify manually! -->
'        <!-- The error sections above are generated: Do not modify manually! -->
'
'    </div>
'
'    <br>
'
'    <button [disabled]="form.invalid" 
'            class="button btn btn-primary"
'            type="submit"
'    >Save</button>
'		 
</form>
