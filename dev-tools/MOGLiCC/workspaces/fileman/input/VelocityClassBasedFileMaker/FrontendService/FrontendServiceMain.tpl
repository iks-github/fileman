#set( $skip = $classDescriptor.getMetaInfoValueFor("FrontendService").contains("NOT FOUND") || 
              $classDescriptor.getMetaInfoValueFor("FrontendService").equals("false") )
#set( $className = $TemplateStringUtility.firstToLowerCase($classDescriptor.simpleName) )
#if ( $classDescriptor.getMetaInfoValueFor("FrontendServiceName").contains("NOT FOUND") )
    #set( $frontendServiceName = $className )
#else
    #set( $frontendServiceName = $classDescriptor.getMetaInfoValueFor("FrontendServiceName") )
#end

@TargetFileName fileman-${frontendServiceName}-service.service.ts
@TargetDir $model.getMetaInfoValueFor("frontendSrcDir")/services
@CreateNew false # do not override existing service
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
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ${classDescriptor.simpleName} } from '../common/domainobjects/gen/${classDescriptor.simpleName}';
import { FilemanConstants } from '../common/fileman-constants';
import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';
import { Utils } from '../common/Utils';

'
@Injectable({
'  providedIn: 'root'
})
export class ${classDescriptor.simpleName}Service {

#set( $classname = $classDescriptor.simpleName.toLowerCase() )

'  url;
'  private ${className}DataChangedNotifier: Subject<void> = new Subject<void>();
'
'  constructor(private httpClient: HttpClient,
'              propertiesService: FilemanPropertiesLoaderService) {
'    this.url = propertiesService.getProperty('serverurl') + '/${className}s';
'  }
'
'  getAll${classDescriptor.simpleName}s() {
'    const uri = this.url;
'    return this.httpClient.get<${classDescriptor.simpleName}[]>(uri, FilemanConstants.getRestCallHeaderOptions())
'                          .pipe(catchError((error: HttpErrorResponse) => {
'                            throw error; }
'                          ), tap(responseData => Utils.sortList(responseData)));
'  }
'
'  get${classDescriptor.simpleName}($idAttributeName: any) {
'    const uri = this.url + '/' + $idAttributeName;
'    return this.httpClient.get(uri, FilemanConstants.getRestCallHeaderOptions())
'                          .pipe(catchError((error: HttpErrorResponse) => {
'                            throw error; }
'                          ));
'  }
'
'  create(${className}: ${classDescriptor.simpleName}) {
'    const uri = this.url;
'    return this.httpClient.post(uri, JSON.stringify(${className}), FilemanConstants.getRestCallHeaderOptions())
'                          .pipe(catchError((error: HttpErrorResponse) => {
'                            throw error; }
'                          ), tap(() => this.${className}DataChangedNotifier.next()));
'  }
'
'  update(${className}: ${classDescriptor.simpleName}) {
'    const uri = this.url;
'    return this.httpClient.put(uri, JSON.stringify(${className}), FilemanConstants.getRestCallHeaderOptions())
'                          .pipe(catchError((error: HttpErrorResponse) => {
'                            console.log(error);
'                            throw error; }
'                          ), tap(() => this.${className}DataChangedNotifier.next()));
'  }
'
'  delete(${className}: ${classDescriptor.simpleName}) {
'    const uri = this.url + '/' + ${className}.get${IdAttributeName}();
'    return this.httpClient.delete(uri, FilemanConstants.getRestCallHeaderOptions())
'                          .pipe(catchError((error: HttpErrorResponse) => {
'                              throw error; }
'                          ));
'  }
'
'  get${classDescriptor.simpleName}DataChangedNotifier(): Subject<void> {
'    return this.${className}DataChangedNotifier;
'  }
}