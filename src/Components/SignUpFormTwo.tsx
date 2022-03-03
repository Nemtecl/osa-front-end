import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import ValidField from "../Pages/Guest/SignUp/types/validField";
import { StateTwo } from "../Pages/Guest/SignUp/types/types";

type Props = {
  formTwo: StateTwo;
  dispatchFormTwo: any;
};

export default function SignUpFormTwo(props: Props) {
  const { dispatchFormTwo, formTwo } = props;

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFormTwo({
      type: "FAVORITE_CITY_CHANGED",
      value: event.currentTarget.value,
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFormTwo({
      type: "PASSWORD_CHANGED",
      value: event.currentTarget.value,
    });
  };

  const handleVerifiedPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatchFormTwo({
      type: "VERIFIED_PASSWORD_CHANGED",
      value: event.currentTarget.value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="favorite-city"
                name="favorite-city"
                fullWidth
                id="favorite-city"
                label="Ville préférée"
                autoFocus
                onChange={handleCityChange}
                error={formTwo.isValidFavoriteCity === ValidField.ERROR}
                helperText={
                  formTwo.isValidFavoriteCity === ValidField.ERROR &&
                  "La ville est invalide"
                }
                value={formTwo.favoriteCity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="password"
                type="password"
                label="Mot de passe"
                name="password"
                autoComplete="password"
                onChange={handlePasswordChange}
                error={formTwo.isValidPassword === ValidField.ERROR}
                helperText={
                  formTwo.isValidPassword === ValidField.ERROR &&
                  "Le mot de passe n'est pas assez fort"
                }
                value={formTwo.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                type="password"
                label="Confirmation du mot de passe"
                name="confirmation"
                autoComplete="password"
                onChange={handleVerifiedPasswordChange}
                error={formTwo.isValidVerifiedPassword === ValidField.ERROR}
                helperText={
                  formTwo.isValidVerifiedPassword === ValidField.ERROR &&
                  "Le mot de passe ne correspond pas"
                }
                value={formTwo.verifiedPassword}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}