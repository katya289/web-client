import { Grid } from '@mui/material';
import Podcasts from "./PodcastsReview";
export default function MainPage() {

    return (
        <Grid container>
            <Grid item xs={10}>
                <Podcasts />
            </Grid>
        </Grid>
    )
}
