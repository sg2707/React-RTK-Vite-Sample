export interface ILaunch {
  flight_number: number;
  mission_name: string;
  launch_year: number;
  details: string;
  launch_date_utc: string;
  launch_success: boolean;
  launch_failure_details: {
    reason: string;
  };
  links: { article_link: string };
}
