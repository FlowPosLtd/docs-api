import type { Resource } from "../types";
import { customerResources } from "./resources/customers";
import { orderResources } from "./resources/orders";
import { productResources } from "./resources/products";
import { paymentResources } from "./resources/payments";
import { operationResources } from "./resources/operations";
import { analyticsResources } from "./resources/analytics";
import { teamResources } from "./resources/team";
import { settingsResources } from "./resources/settings";
import { developerResources } from "./resources/developer";

export const resources: Resource[] = [
  ...customerResources,
  ...orderResources,
  ...productResources,
  ...paymentResources,
  ...operationResources,
  ...analyticsResources,
  ...teamResources,
  ...settingsResources,
  ...developerResources,
];

export function getResource(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}

export function getAllEndpoints() {
  return resources.flatMap((r) =>
    r.endpoints.map((e) => ({ ...e, resourceId: r.id, resourceName: r.name })),
  );
}
