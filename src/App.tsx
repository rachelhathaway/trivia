import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Pagination,
  Radio,
  RadioGroup,
} from "@mui/material";

function App() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Pagination
            count={10}
            color="secondary"
            hideNextButton
            hidePrevButton
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
