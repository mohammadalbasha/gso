"use server";

export const getEnv = async () => {
  return process.env.ENV!;
};

export const getGraphqlEndpoint = async () => {
  return process.env.BACKEND_GRAPHQL_ENDPOINT!;
};

export const getGraphqlWsEndpoint = async () => {
  return process.env.BACKEND_GRAPHQL_ENDPOINT!.replace("http", "ws");
};

export const getApiEndpoint = async () => {
  return process.env.BACKEND_API_ENDPOINT!;
};

export const getGoogleMapsApiKey = async () => {
  return process.env.GOOGLE_MAPS_API_KEY!;
};

export const getAppUrl = async () => {
  return process.env.NEXT_PUBLIC_APP_URL!;
};
