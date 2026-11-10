/* eslint-disable @typescript-eslint/no-unused-vars */
import type { paths, components, operations } from "./generated/product";

/**
 * Schema Objects: SCHEMA OBJECTS ARE DEFINED HERE FOR EASY ACCESS
 */
type ProductList = components["schemas"]["ProductList"];

type Product = components["schemas"]["ProductDto"];

type ProductRequest = components["schemas"]["ProductRequest"];

type EligibilityResultsList = components["schemas"]["EligibilityResultsList"];

type TakeUpResponse = components["schemas"]["TakeUpResponse"];

type SubscriptionList = components["schemas"]["SubscriptionList"];

type Subscription = components["schemas"]["SubscriptionDto"];

type FulfilmentResultList = components["schemas"]["FulfilmentResultList"];

type FulfilmentResult = components["schemas"]["FulfilmentResultDto"];


/**
 * Operation Objects: OPERATION OBJECTS ARE DEFINED HERE FOR EASY ACCESS
 */
type ListProductsOperation = operations["listProducts"];

type CheckEligibilityOperation = operations["eligibilityCheck"];

type TakeUpProductOperation = operations["productTakeUp"];

type GetCustomerSubscriptionsOperation = operations["getCustomerSubscriptions"];

type DeleteCustomerSubscriptionOperation = operations["deleteCustomerSubscription"];


/**
 * Path Objects: PATH OBJECTS ARE DEFINED HERE FOR EASY ACCESS
 */

type ListProductsPath = paths["/products"]["get"];

type GetProductByIdPath = paths["/product/{id}"]["get"];

type CheckEligibilityPath = paths["/product/eligibility"]["post"];

type TakeUpProductPath = paths["/product/take-up"]["post"];

type GetCustomerSubscriptionsPath = paths["/subscriptions/customer/{customerId}"]["get"];

type DeleteCustomerSubscriptionPath = paths["/subscriptions/{subscriptionId}"]["delete"];

