#set( $notNeeded = $classDescriptor.getMetaInfoValueFor("dbEntity").contains("NOT FOUND") || 
                   ! $classDescriptor.getMetaInfoValueFor("dbEntity").equalsIgnoreCase("true") )
#set( $packagePath = $TemplateStringUtility.replaceAllIn(${classDescriptor.package}, ".", "/") + "/dao" ) 

@TargetFileName ${classDescriptor.simpleName}Dao.java # Name of output file with extension but without path
@TargetDir $model.getMetaInfoValueFor("backendSrcDir")/$packagePath
@CreateNew false # create only if not present
@NameOfValidModel SpringBootBackendAngularFrontModel
@SkipGeneration $notNeeded 

/*
' * Copyright 2020 IKS Gesellschaft fuer Informations- und Kommunikationssysteme mbH
' * 
' * Licensed under the Apache License, Version 2.0 (the "License");
' * you may not use this file except in compliance with the License.
' * You may obtain a copy of the License at
' * 
' *     http://www.apache.org/licenses/LICENSE-2.0
' * 
' * Unless required by applicable law or agreed to in writing, software
' * distributed under the License is distributed on an "AS IS" BASIS,
' * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
' * See the License for the specific language governing permissions and
' * limitations under the License.
' */
package ${classDescriptor.package}.dao;
'
import org.springframework.stereotype.Component;
import com.iksgmbh.fileman.backend.${classDescriptor.simpleName};

'
/**
' * Created as draft by MOGLiCC.
' * Add new functionality manually if needed.
' *
**/
@Component
public class ${classDescriptor.simpleName}Dao extends ${classDescriptor.simpleName}BasicDao 
{}