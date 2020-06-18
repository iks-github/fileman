
#if ( $classDescriptor.doesHaveAnyMetaInfosWithName("swaggerDoc") )

	@ApiModel(description = "$classDescriptor.getMetaInfoValueFor("swaggerDoc")")

#end
