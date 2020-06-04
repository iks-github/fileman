#set( $skip = $classDescriptor.getMetaInfoValueFor("withFrontendService").contains("NOT FOUND") || 
              $classDescriptor.getMetaInfoValueFor("withFrontendService").equals("false") )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName) )

@TargetFileName fileman-${className}-service.ts
@TargetDir $model.getMetaInfoValueFor("frontendSrcDir")/services
@CreateNew true # create and override
@NameOfValidModel SpringBootBackendAngularFrontModel
@SkipGeneration $skip

#set( $urlRootPath = $model.getMetaInfoValueFor( "urlRootPath" ) )

#set( $attributeDescriptorList = $classDescriptor.getAttributeDescriptorList() )
#set( $IdAttributeName = "Id" ) 
#set( $idAttributeName = "id" ) 

#foreach ($attributeDescriptor in $attributeDescriptorList)
	#if ( $attributeDescriptor.doesHaveMetaInfo("id", "true") )
		#set( $IdAttributeName = $TemplateStringUtility.firstToUpperCase($attributeDescriptor.name) ) 
		#set( $idAttributeName = $attributeDescriptor.name )
	#end
#end

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ${classDescriptor.simpleName} } from '../common/domainobjects/gen/${classDescriptor.simpleName}';
import { FilemanConstants } from '../common/fileman-constants';

'
@Injectable({
'  providedIn: 'root'
})
export class ${classDescriptor.simpleName}Service {

#set( $classname = $classDescriptor.simpleName.toLowerCase() )

'  url = 'localHost:10000/${urlRootPath}/${className}';
'
'  constructor(private httpClient: HttpClient) { }
'
'  get${classDescriptor.simpleName}($idAttributeName: any) {
'    const uri = this.url + '/' + $idAttributeName;
'    // console.log(uri);
'    return this.httpClient.get(this.url + '/' + $idAttributeName, FilemanConstants.getRestCallHeaderOptions())
'                          .pipe(catchError((error: HttpErrorResponse) => {
'                            throw error; }
'                          ));
'  }
'
'  create(data: ${classDescriptor.simpleName}) {
'    const uri = this.url + '/' + data.get${IdAttributeName}();
'    // console.log(uri);
'    return this.httpClient.post(this.url, JSON.stringify(data), FilemanConstants.getRestCallHeaderOptions())
'                          .pipe(catchError((error: HttpErrorResponse) => {
'                            throw error; }
'                          ));
'  }
'
'  update(data: ${classDescriptor.simpleName}) {
'    const uri = this.url + '/' + data.get${IdAttributeName}();
'    // console.log(uri);
'    return this.httpClient.put(uri, JSON.stringify(data), FilemanConstants.getRestCallHeaderOptions())
'                          .pipe(catchError((error: HttpErrorResponse) => {
'                            console.log(error);
'                            throw error; }
'                          ));
'  }
'
'  delete(data: ${classDescriptor.simpleName}) {
'    const uri = this.url + '/' + data.get${IdAttributeName}();
'    // console.log(uri);
'    return this.httpClient.delete(uri, FilemanConstants.getRestCallHeaderOptions())
'                          .pipe(catchError((error: HttpErrorResponse) => {
'                              throw error; }
'                          ));
'  }
'
}