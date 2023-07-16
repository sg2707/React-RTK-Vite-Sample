import React from "react";
import { useGetLaunchesQuery } from "../../services/launches/launchApi";
import { Box, Grid, LinearProgress, ThemeProvider } from "@mui/material";
import { darkTheme } from "./constants";
import { DetailLoader } from "./launch-details-modal";
import { LaunchCard } from "./launch-card";

function LaunchesList() {
  const [open, setOpen] = React.useState(false);
  const [selectedFlight, setSelectedFlight] = React.useState(0);

  const openDetails = React.useCallback((flight_number: number) => {
    setOpen(true);
    setSelectedFlight(flight_number);
  }, []);

  const closeDetails = React.useCallback(() => {
    setOpen(false);
    setSelectedFlight(0);
  }, []);

  const {
    data: launches,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLaunchesQuery();

  let launchContent;
  if (isLoading) {
    launchContent = <LinearProgress />;
  } else if (isSuccess) {
    launchContent = (
      <Grid item xs={12}>
        <ThemeProvider theme={darkTheme}>
          <Box
            sx={{
              p: 4,
              bgcolor: "background.default",
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr 1fr" },
              gap: 4,
            }}
          >
            {[
              ...new Map(launches.map((m) => [m.flight_number, m])).values(),
            ].map((item) => (
              <LaunchCard
                launch={item}
                openDetails={openDetails}
                key={item.flight_number}
              />
            ))}
          </Box>
        </ThemeProvider>
      </Grid>
    );
  } else if (isError) {
    launchContent = (
      <div className="alert alert-danger" role="alert">
        <span>{`Error loading data`}</span>
      </div>
    );
  }
  return (
    <div>
      {launchContent}
      <DetailLoader
        flight_number={selectedFlight}
        open={open}
        close={closeDetails}
      />
    </div>
  );
}
export default LaunchesList;
