import type { Resource } from "../../types";

export const analyticsResources: Resource[] = [
  {
    id: "analytics",
    name: "Analytics",
    description:
      "Sales and activity reports for your business. Periods are in your business's timezone.",
    endpoints: [
      {
        id: "get-overall-sales",
        method: "GET",
        path: "/analytics/overall-sales",
        title: "Sales summary",
        description: "Returns gross sales, refunds, fees and net sales for a period, with the number of payments and orders.",
        queryParams: [
          {
            name: "from",
            type: "string",
            required: false,
            description: "Start of the period, as a date or datetime. Dates cover the whole day in your business's timezone. Defaults to today.",
            example: "2024-01-01",
          },
          {
            name: "to",
            type: "string",
            required: false,
            description: "End of the period. Same format as `from`, and not before it.",
            example: "2024-01-31",
          },
        ],
        response: {
          data: {
            from: "2024-01-10 09:00:00",
            to: "2024-01-10 09:00:00",
            gross: 150,
            refunded: 10,
            fees: 7.5,
            net: 132.5,
            payments_count: 2,
            orders_count: 0,
            average_sale: 75,
          },
          status: true,
        },
        responseDescription: "Returns the totals for the period.",
      },
      {
        id: "get-revenue",
        method: "GET",
        path: "/analytics/revenue",
        title: "Today's revenue",
        description: "Returns net revenue for today and yesterday.",
        response: {
          data: {
            revenue: {
              today: 30,
              yesterday: 5,
            },
          },
          status: true,
        },
        responseDescription: "Returns `today` and `yesterday`.",
      },
      {
        id: "get-sales-by-location",
        method: "GET",
        path: "/analytics/sales/location",
        title: "Sales by location",
        description: "Returns sales for a period split by location, channel and payment method, with a sales chart per location.",
        queryParams: [
          {
            name: "from",
            type: "string",
            required: false,
            description: "Start of the period, as a date or datetime. Dates cover the whole day in your business's timezone. Defaults to today.",
            example: "2024-01-01",
          },
          {
            name: "to",
            type: "string",
            required: false,
            description: "End of the period. Same format as `from`, and not before it.",
            example: "2024-01-31",
          },
          {
            name: "location_id",
            type: "integer",
            required: false,
            description: "Only report on this location.",
            example: "1",
          },
        ],
        response: {
          data: {
            total: 150,
            total_locations: 2,
            from: "2024-01-10 09:00:00",
            to: "2024-01-10 09:00:00",
            granularity: "hourly",
            channels: {
              epos: 150,
              online: 0,
              terminal_reader: 0,
            },
            payment_methods: {
              cash: 0,
              card: 150,
            },
            locations: [
              {
                id: 1,
                name: "Main Store",
                total_sale: 100,
                channels: {
                  epos: 100,
                  online: 0,
                  terminal_reader: 0,
                },
                payment_methods: {
                  cash: 0,
                  card: 100,
                },
                hourly_sales: {
                  "00:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "01:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "02:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "03:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "04:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "05:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "06:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "07:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "08:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "09:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "10:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "11:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "12:00": {
                    total: 100,
                    channels: {
                      epos: 100,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 100,
                    },
                  },
                  "13:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "14:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "15:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "16:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "17:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "18:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "19:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "20:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "21:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "22:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                  "23:00": {
                    total: 0,
                    channels: {
                      epos: 0,
                      online: 0,
                      terminal_reader: 0,
                    },
                    payment_methods: {
                      cash: 0,
                      card: 0,
                    },
                  },
                },
              },
            ],
          },
          status: true,
        },
        responseDescription: "Returns the totals and a breakdown per location.",
      },
      {
        id: "get-sales-by-source",
        method: "GET",
        path: "/analytics/sales/payments",
        title: "Sales by payment source",
        description: "Returns sales for a period split by where the payments came from.",
        queryParams: [
          {
            name: "from",
            type: "string",
            required: false,
            description: "Start of the period, as a date or datetime. Dates cover the whole day in your business's timezone. Defaults to today.",
            example: "2024-01-01",
          },
          {
            name: "to",
            type: "string",
            required: false,
            description: "End of the period. Same format as `from`, and not before it.",
            example: "2024-01-31",
          },
        ],
        response: {
          data: {
            total: 215.25,
            from: "2024-01-10 09:00:00",
            to: "2024-01-10 09:00:00",
            sources: {
              order: 140,
              subscription: 0,
              terminal_reader: 50.25,
              payment_link: 0,
              api: 0,
              manual: 25,
            },
          },
          status: true,
        },
        responseDescription: "Returns the total and a total per payment source.",
      },
      {
        id: "get-resource-analytics",
        method: "GET",
        path: "/analytics/{resource}",
        title: "Resource analytics",
        description: "Returns counts and a chart for products, orders, customers or payments.",
        pathParams: [
          {
            name: "resource",
            type: "string",
            required: true,
            description: "What to report on: `products`, `orders`, `customers` or `payments`.",
            example: "orders",
          },
        ],
        queryParams: [
          {
            name: "from",
            type: "string",
            required: false,
            description: "Start of the period, as a date or datetime. Dates cover the whole day in your business's timezone. Defaults to today.",
            example: "2024-01-01",
          },
          {
            name: "to",
            type: "string",
            required: false,
            description: "End of the period. Same format as `from`, and not before it.",
            example: "2024-01-31",
          },
        ],
        response: {
          data: {
            analytics: {
              total: 2,
              today: 0,
              yesterday: 0,
              by_country: [],
              granularity: "hourly",
              orders_chart: [
                {
                  day: "00:00",
                  date: "2026-09-02 00:00",
                  epos: 1,
                  online: 0,
                  manual: 0,
                },
              ],
            },
          },
          status: true,
        },
        responseDescription: "Returns the `analytics` for the resource. The fields depend on the resource.",
      },
    ],
  },
];
