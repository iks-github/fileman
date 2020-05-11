package com.iksgmbh.fileman.backend.config;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	public static final Contact DEFAULT_CONTACT = new Contact("", "", "");
	@SuppressWarnings("rawtypes")
	private static final Collection<VendorExtension> vendor = List.of();
	public static final ApiInfo DEFAULT_API_INFO = new ApiInfo("Api Documentation", 
			  "Fileman", "1.0", "urn:tos",
	           DEFAULT_CONTACT, "Apache 2.0", "http://www.apache.org/licenses/LICENSE-2.0", vendor);

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(DEFAULT_API_INFO)
				.produces(Set.of("application/xml"));
	}
}
