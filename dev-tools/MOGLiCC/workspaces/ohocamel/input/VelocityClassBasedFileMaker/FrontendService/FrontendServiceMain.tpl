#set( $serviceName = $classDescriptor.getMetaInfoValueFor( "frontendServiceName" ) )

@TargetFileName ${serviceName}-service.ts
@TargetDir $model.getMetaInfoValueFor("frontendSrcDir")/services
@CreateNew false # create only if not present
@NameOfValidModel SpringBootBackendAngularFrontModel
@SkipGeneration $classDescriptor.getMetaInfoValueFor("frontendServiceName").contains("NOT FOUND") 

#set( $rootPath = $model.getMetaInfoValueFor( "rootPath" ) )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName) )

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
import { OhoConstants } from '../common/domainobjects/oho-constants';

'
@Injectable({
'  providedIn: 'root'
})
export class ${classDescriptor.simpleName}Service {

#set( $classname = $classDescriptor.simpleName.toLowerCase() )

'  url = 'localHost:10000/${rootPath}/${classname}';
'
'  constructor(private httpClient: HttpClient) { }
'
'  load${classDescriptor.simpleName}($idAttributeName: any) {
'    const uri = this.url + '/' + $idAttributeName;
'    // console.log(uri);
'    return this.httpClient.get(this.url + '/' + $idAttributeName, OhoConstants.getRestCallHeaderOptions())
'                          .pipe(catchError((error: HttpErrorResponse) => {
'                            throw error; }
'                          ));
'  }
'
'  create(data: ${classDescriptor.simpleName}) {
'    const uri = this.url + '/' + data.get${IdAttributeName}();
'    // console.log(uri);
'    return this.httpClient.post(this.url, JSON.stringify(data), OhoConstants.getRestCallHeaderOptions())
'                          .pipe(catchError((error: HttpErrorResponse) => {
'                            throw error; }
'                          ));
'  }
'
'  update(data: ${classDescriptor.simpleName}) {
'    const uri = this.url + '/' + data.get${IdAttributeName}();
'    // console.log(uri);
'    return this.httpClient.put(uri, JSON.stringify(fileData), OhoConstants.getRestCallHeaderOptions())
'                          .pipe(catchError((error: HttpErrorResponse) => {
'                            console.log(error);
'                            throw error; }
'                          ));
'  }
'
'  delete(data: ${classDescriptor.simpleName}) {
'    const uri = this.url + '/' + data.get${IdAttributeName}();
'    // console.log(uri);
'    return this.httpClient.delete(uri, OhoConstants.getRestCallHeaderOptions())
'                          .pipe(catchError((error: HttpErrorResponse) => {
'                              throw error; }
'                          ));
'  }
'
}