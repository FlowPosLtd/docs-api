import type { Resource } from "../types";
import { customerResources } from "./resources/customers";
import { orderResources } from "./resources/orders";
import { productResources } from "./resources/products";
import { paymentResources } from "./resources/payments";
import { operationResources } from "./resources/operations";
import { analyticsResources } from "./resources/analytics";
import { settingsResources } from "./resources/settings";
import { developerResources } from "./resources/developer";
import { paymentAccountResources } from "./resources/payment-account";
import { integrationResources } from "./resources/integrations";
import { basketResources } from "./resources/baskets";
import { onlineStoreResources } from "./resources/online-store";
import { marketingResources } from "./resources/marketing";

export const resources: Resource[] = [
  ...customerResources,
  ...orderResources,
  ...basketResources,
  ...productResources,
  ...paymentResources,
  ...paymentAccountResources,
  ...operationResources,
  ...analyticsResources,
  ...settingsResources,
  ...onlineStoreResources,
  ...marketingResources,
  ...developerResources,
  ...integrationResources,
];

export function getResource(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}

export function getAllEndpoints() {
  return resources.flatMap((r) =>
    r.endpoints.map((e) => ({ ...e, resourceId: r.id, resourceName: r.name })),
  );
}
