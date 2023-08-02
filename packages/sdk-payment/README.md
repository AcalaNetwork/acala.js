# @acala-network/sdk-payment

This SDK is used to provide `flexible fee` estimation and querying related functionalities,the SDK can also be used to determine if an input value is valid and to retrieve the maximum value that a certain token can be traded for.

Use cases:
1. If a user sets `KSM` as the payment currency and the transaction requires `0.01 KSM`, then the maximum amount the user can use is `balance - 0.01`.
