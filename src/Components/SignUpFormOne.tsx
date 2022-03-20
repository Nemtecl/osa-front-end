/* eslint-disbale */
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { useTranslation } from "react-i18next";
import ValidField from "../Pages/Guest/SignUp/types/validField";
import { maxDate, StateOne } from "../Pages/Guest/SignUp/types/types";

type Props = {
  formOne: StateOne;
  dispatchFormOne: any;
};

export default function SignUpFormOne(props: Props) {
  const { t } = useTranslation();
  const { formOne, dispatchFormOne } = props;
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFormOne({
      type: "EMAIL_CHANGED",
      value: event.currentTarget.value.trim(),
    });
  };

  const handleFirstnameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatchFormOne({
      type: "FIRSTNAME_CHANGED",
      value: event.currentTarget.value,
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFormOne({
      type: "NAME_CHANGED",
      value: event.currentTarget.value,
    });
  };

  const handleBirthDateChange = (newValue: any) => {
    dispatchFormOne({
      type: "BIRTHDATE_CHANGED",
      value: newValue,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                required
                fullWidth
                id="firstname"
                label={t("fname")}
                autoFocus
                onChange={handleFirstnameChange}
                error={formOne.isValidFirstname === ValidField.ERROR}
                helperText={
                  formOne.isValidFirstname === ValidField.ERROR &&
                  t("required.fname")
                }
                value={formOne.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="name"
                label={t("name")}
                name="name"
                autoComplete="family-name"
                onChange={handleNameChange}
                error={formOne.isValidName === ValidField.ERROR}
                helperText={
                  formOne.isValidName === ValidField.ERROR && t("required.name")
                }
                value={formOne.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleEmailChange}
                error={formOne.isValidEmail === ValidField.ERROR}
                helperText={
                  formOne.isValidEmail === ValidField.ERROR && t("@.invalid")
                }
                value={formOne.email}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label={t("dbrith")}
                  inputFormat="dd/MM/yyyy"
                  value={formOne.birthDate}
                  onChange={handleBirthDateChange}
                  maxDate={maxDate}
                  /* eslint-disable react/jsx-props-no-spreading */
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formOne.isValidBirthDate === ValidField.ERROR}
                      helperText={
                        formOne.isValidBirthDate === ValidField.ERROR &&
                        t("years.register")
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
