import {
  Box,
  LinearProgress,
  Link,
  Modal,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { darkTheme } from "./constants";
import { useGetLaunchQuery } from "../../services/launches/launchApi";

export const DetailLoader: React.FC<{
  flight_number: number;
  open: boolean;
  close: () => void;
}> = ({ flight_number, open, close }) => {
  const {
    data: launch,
    isSuccess,
    isError,
    isFetching,
    isLoading,
    error,
  } = useGetLaunchQuery(flight_number, { skip: flight_number === 0 });

  let launchContent;
  if (isFetching || isLoading) {
    launchContent = <LinearProgress />;
  } else if (isSuccess) {
    launchContent = (
      <>
        <Link
          href={launch.links.article_link}
          underline="hover"
          id="modal-modal-title"
          target="_blank"
        >
          {`${launch.mission_name} - ${launch.launch_year}`}
        </Link>
        <Typography sx={{ mt: 2 }}>{`Details: ${
          launch.details ?? "Not available"
        }`}</Typography>
        <Typography sx={{ mt: 2 }}>
          {`Launch date: ${new Date(launch.launch_date_utc)?.toLocaleString()}`}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {`Launch success: ${
            launch.launch_success
              ? "Yes"
              : `No (${launch.launch_failure_details.reason})`
          }`}
        </Typography>
      </>
    );
  } else if (isError) {
    launchContent = (
      <div className="alert alert-danger" role="alert">
        <span>{`Error loading data`}</span>
      </div>
    );
  }
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #FFF",
            boxShadow: 24,
            p: 4,
          }}
        >
          {launchContent}
        </Box>
      </ThemeProvider>
    </Modal>
  );
};
