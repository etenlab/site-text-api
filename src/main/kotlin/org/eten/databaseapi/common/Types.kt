package org.eten.databaseapi.common

import kotlinx.serialization.Serializable

@Serializable
data class ErrorResponse(
    val error: ErrorType,
)

@Serializable
enum class ErrorType {
  NoError,
  Unauthorized,
  UnknownError,
}