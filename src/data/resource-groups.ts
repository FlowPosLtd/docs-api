/** How the API reference groups its resources, in the sidebar and on the intro page. */
// Sections appear in the order listed here.
export const resourceGroups = [
  { label: "Catalog", ids: ["products", "categories", "addon-groups", "inventory", "attachments"] },
  { label: "Customers", ids: ["customers", "customer-groups"] },
  { label: "Sales", ids: ["baskets", "orders", "discounts", "shipping-rates"] },
  { label: "Payments", ids: ["payments", "payment-links", "subscriptions", "disputes"] },
  { label: "Payouts & Account", ids: ["payouts", "payment-account", "payment-settings"] },
  { label: "Reports", ids: ["analytics"] },
  { label: "Business Setup", ids: ["locations", "terminal-readers", "employees"] },
  { label: "Online Store", ids: ["online-store", "domains"] },
  { label: "Developer", ids: ["api-keys", "webhooks", "webhook-events"] },
];
