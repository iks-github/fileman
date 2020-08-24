#set( $componentName = $classDescriptor.getMetaInfoValueFor( "frontendComponentName" ) )
#set( $serviceName = $classDescriptor.getMetaInfoValueFor( "frontendServiceName" ) )

@TargetFileName ${componentName}-component.ts
@TargetDir $model.getMetaInfoValueFor("frontendSrcDir")/components/${componentName}
@CreateNew false # create only if not present
@NameOfValidModel SpringBootBackendAngularFrontModel
@SkipGeneration $classDescriptor.getMetaInfoValueFor("frontendComponentName").contains("NOT FOUND") 

#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName) )

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ${classDescriptor.simpleName}Service } from 'src/app/services/${serviceName}-service';
import { ${classDescriptor.simpleName} } from 'src/app/common/domainobjects/gen/${classDescriptor.simpleName}';


'
'@Component({
'  selector: '$componentName',
'  templateUrl: './${componentName}-component.html',
'  styleUrls: ['./${componentName}-component.css']
})
export class ${classDescriptor.simpleName}Component implements OnInit {
'
'  form: FormGroup;
'
'  constructor(private ${className}Service: ${classDescriptor.simpleName}Service) {
'      this.form = this.createFormControl();
'  }
'
'  ngOnInit(): void { }
'


'  submit() {
'    const $className = this.form.value;
'    console.log($className);
'    this.${className}Service.sendToServer($className); 
'  }
'
'  // The form control block below is generated - do not modify manually!
'  // The form control block above is generated - do not modify manually!
'
}
