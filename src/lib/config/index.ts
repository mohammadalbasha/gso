// Add validation to ensure the endpoint exists
// if (!process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_ENDPOINT) {
//   throw new Error(
//     "NEXT_PUBLIC_GRAPHQL_ENDPOINT is not defined in environment variables",
//   );
// }
// if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
//   throw new Error(
//     "NEXT_PUBLIC_BACKEND_URL is not defined in environment variables",
//   );
// }

// if (!process.env.NEXT_PUBLIC_APP_URL) {
//   throw new Error(
//     "NEXT_PUBLIC_APP_URL is not defined in environment variables",
//   );
// }
// if (!process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT) {
//   throw new Error(
//     "NEXT_PUBLIC_BACKEND_API_ENDPOINT is not defined in environment variables",
//   );
// }
// if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
//   throw new Error(
//     "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not defined in environment variables",
//   );
// }

export const CONFIG: {
  getEnv: () => string;
  getAppUrl: () => string;
  getGraphqlEndpoint: () => string;
  getGraphqlWsEndpoint: () => string;
  getApiEndpoint: () => string;
  getGoogleMapsApiKey: () => string;
  getSentryDsn: () => string;
  getNextApiKey: () => string;
} = {
  getEnv: () => process.env.ENV! || "development",
  getAppUrl: () => process.env.APP_URL! || "https://test.aqar.me",
  getGraphqlEndpoint: () =>
    process.env.BACKEND_GRAPHQL_ENDPOINT! || "https://test.aqar.me/graphql",
  getGraphqlWsEndpoint: () =>
    process.env.BACKEND_GRAPHQL_ENDPOINT!.replace("http", "ws") ||
    "wss://test.aqar.me/graphql",
  getApiEndpoint: () =>
    process.env.BACKEND_API_ENDPOINT! || "https://test.aqar.me/api",
  getGoogleMapsApiKey: () =>
    process.env.GOOGLE_MAPS_API_KEY! ||
    "AIzaSyBwAX_D4NlJvEj29S1wFg4ovkSC1ypXo-g",
  getSentryDsn: () =>
    process.env.SENTRY_DSN! ||
    "https://8d0058b401f27a707101e6daec4afba5@o4509677148766208.ingest.de.sentry.io/4509677151191120",
  getNextApiKey: () => process.env.NEXT_API_KEY! || "1234567890",
};
