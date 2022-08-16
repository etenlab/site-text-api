package org.eten.databaseapi.core

enum class ConfigEnv {
  local,
  test,
  prod,
}

enum class KafkaTopics {
  InstanceInfo,
  Error,
}