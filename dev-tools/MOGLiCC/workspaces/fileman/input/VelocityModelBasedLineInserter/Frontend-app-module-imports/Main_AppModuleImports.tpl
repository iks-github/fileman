#set( $newDomainObject = $model.getMetaInfoValueFor("newDomainObject") )
#set( $skip = $newDomainObject.contains("NOT FOUND") )
#set( $NewDomainObject = $TemplateStringUtility.firstToUpperCase($newDomainObject) )

@TargetFileName app.module.ts
@TargetDir ..\\..\\Fileman-Frontend\\src\app
@NameOfValidModel SpringBootBackendAngularFrontModel
@InsertAbove @NgModule({
@SkipGeneration $skip

import { ${NewDomainObject}ListLayout } from './components/layout/${newDomainObject}/list-layout/fileman-${newDomainObject}-list-layout-component';
import { ${NewDomainObject}TableLayout } from './components/layout/${newDomainObject}/table-layout/fileman-${newDomainObject}-table-layout-component';
import { ${NewDomainObject}TilesLayout } from './components/layout/${newDomainObject}/tiles-layout/fileman-${newDomainObject}-tiles-layout-component';


#foreach($classDescriptor in $model.classDescriptorList)

	#if($classDescriptor.simpleName.equals($NewDomainObject)) 
		
		#set( $skip = $classDescriptor.getMetaInfoValueFor("FrontendService").contains("NOT FOUND") || 
                      $classDescriptor.getMetaInfoValueFor("FrontendService").equals("false") )
		
		#if (! $skip) 

			import { ${NewDomainObject}Service } from './services/fileman-${newDomainObject}-service.service';

		#end
	#end
#end

'