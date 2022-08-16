package org.eten.databaseapi

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@Configuration
@ConfigurationPropertiesScan
@EnableScheduling
class ApiServiceTemplateApplication

fun main(args: Array<String>) {
	runApplication<ApiServiceTemplateApplication>(*args)
}
