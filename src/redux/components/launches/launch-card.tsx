import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { ILaunch } from "../../services/launches/types";

export const LaunchCard: React.FC<{
  launch: ILaunch;
  openDetails: (flight_number: number) => void;
}> = ({ launch, openDetails }) => {
  return (
    <Card elevation={12} variant="outlined" key={launch.flight_number}>
      <CardActionArea>
        <CardContent onClick={() => openDetails(launch.flight_number)}>
          <Typography gutterBottom variant="h6" component="div">
            {launch.mission_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`This is launched on ${launch.launch_year}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
