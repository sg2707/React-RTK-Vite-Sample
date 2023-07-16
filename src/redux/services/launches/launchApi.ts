import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ILaunch } from "./types";

export const launchApi = createApi({
  reducerPath: "launchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.spacexdata.com/v3/" }),
  tagTypes: ["Launches"],
  endpoints: (builder) => ({
    // ? Query: Get All Products
    getLaunches: builder.query<ILaunch[], void>({
      query() {
        return "launches";
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ flight_number }) => ({
                type: "Launches" as const,
                flight_number,
              })),
              { type: "Launches", id: "LIST" },
            ]
          : [{ type: "Launches", id: "LIST" }],
      // ? Transform the result to prevent nested data
      transformResponse: (response: ILaunch[]) => response,
    }),
    // ? Query: Get a single product
    getLaunch: builder.query<ILaunch, number>({
      query(flight_number) {
        // https://api.spacexdata.com/v3/launches/{{flight_number}}
        return `launches/${flight_number}`;
      },
      transformResponse: (response: ILaunch, _args, _meta) => response,
      providesTags: (_result, _error, id) => [{ type: "Launches", id }],
    }),
  }),
});

export const { useGetLaunchesQuery, useGetLaunchQuery } = launchApi;
