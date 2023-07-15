import { Grid, Skeleton as MuiSkeleton } from "@mui/material";

export const Skeleton = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={4}>
        <MuiSkeleton variant="rectangular" width={245} height={20} />
      </Grid>
      <Grid item xs={4}>
        <Grid container direction="column" spacing={2}>
          {Array.from(new Array(3)).map((_, index) => (
            <Grid item key={index} xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <MuiSkeleton variant="circular" width={20} height={20} />
                </Grid>
                <Grid item>
                  <MuiSkeleton variant="rectangular" width={210} height={20} />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <MuiSkeleton variant="rectangular" width={245} height={20} />
      </Grid>
    </Grid>
  );
};
