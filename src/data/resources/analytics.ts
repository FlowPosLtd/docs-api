import type { Resource } from "../../types";

export const analyticsResources: Resource[] = [
  {
    id: "analytics",
    name: "Analytics",
    description:
      "Analytics endpoints for dashboard stats, order trends, product performance, and customer insights.",
    endpoints: [
      {
        id: "analytics-overview",
        method: "GET",
        path: "/analytics/v2",
        title: "Dashboard overview",
        description: "Returns high-level analytics for the dashboard.",
        response: {
          analytics: {
            total_revenue: 125000,
            total_orders: 842,
            total_customers: 310,
            avg_order_value: 4250,
          },
        },
        responseDescription: "Returns the dashboard analytics summary.",
      },
      {
        id: "analytics-orders",
        method: "GET",
        path: "/analytics/orders",
        title: "Order analytics",
        description: "Returns order trend data including daily breakdown.",
        response: {
          analytics: {
            daily: [],
            weekly_total: 4250,
            monthly_total: 18500,
          },
        },
        responseDescription:
          "Returns order analytics with daily, weekly, and monthly totals.",
      },
      {
        id: "analytics-products",
        method: "GET",
        path: "/analytics/products",
        title: "Product analytics",
        description: "Returns performance data for all products.",
        response: {
          analytics: [
            {
              product_id: 1,
              name: "Classic Burger",
              total_sold: 142,
              revenue: 59640,
            },
          ],
        },
        responseDescription: "Returns an array of product analytics objects.",
      },
      {
        id: "analytics-customers",
        method: "GET",
        path: "/analytics/customers",
        title: "Customer analytics",
        description: "Returns customer behaviour and lifetime value data.",
        response: {
          analytics: [
            {
              customer_id: 1,
              name: "Jane Smith",
              total_orders: 5,
              lifetime_value: 18500,
            },
          ],
        },
        responseDescription: "Returns an array of customer analytics objects.",
      },
    ],
  },
];
