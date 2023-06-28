'use client'
import { Grid } from "@mui/material";
import Form from "./components/Form";

export default function Home() {
  return (
    <>
      <Grid container direction={"column"} justifyContent={"center"} alignContent={"center"} minHeight={"100vh"} spacing={12}>
        <Grid item md={12} mx={'auto'} >
          <h1>
            NOTARIA
          </h1>
        </Grid>
        <Grid item md={12} mx={'auto'} >
          <Form />
        </Grid>
      </Grid>
    </>
  )
}
