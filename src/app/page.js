'use client'
import { Grid } from "@mui/material";
import Form from "./components/Form";

export default function Home() {
  return (
    <>
      <Grid container>
        <Grid item md={12} mx={'auto'}>
          <h1>
            NOTARIA
          </h1>
        </Grid>
        <Grid item md={12}>
          <Form />
        </Grid>
      </Grid>
    </>
  )
}
