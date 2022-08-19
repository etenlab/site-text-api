package org.eten.databaseapi.core

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.stereotype.Component
import java.net.InetAddress

@Component
@EnableConfigurationProperties
class AppConfig(
    @Value("\${server.hostname}")
    val hostname: String,
    @Value("\${env}")
    val env: ConfigEnv,
    @Value("\${spring.kafka.bootstrap-servers}")
    val kafka_bootstrap_address: String,
    @Value("\${server.load-db-version}")
    val load_db_version: Int = 1,
) {
  val ip = InetAddress.getLocalHost().hostAddress
}
