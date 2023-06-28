import { Box, Button, TextField, createTheme } from "@mui/material";
import { useRouter } from 'next/navigation'
import { useState } from "react";

function Form() {
  const router = useRouter();

  const [form, setForm] = useState({
    user: "",
    password: ""
  });

  const handleLogin = (event) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const validate = () => {
		const admin = process.env.NEXT_PUBLIC_DEFAULT_ADMIN
		const adminPass = process.env.NEXT_PUBLIC_DEFAULT_ADMIN_PASS
		const user = process.env.NEXT_PUBLIC_DEFAULT_USER
		const userPass = process.env.NEXT_PUBLIC_DEFAULT_USER_PASS

    if (form.user === admin && form.password === adminPass) {
      localStorage.setItem('accessAdmin', admin)
      alert("Admin autorizado");
      router.push("/admin");
    } else if (form.user === user && form.password === userPass) {
      localStorage.setItem('accessUser', user)
      alert("Usuario autorizado");
      router.push("/agent");
    } else {
      alert("Credenciales no autorizadas");
    }
  };


  return (
    <>
      <Box
        component="form"
        sx={{
          display:"flex",
          flexDirection:"column",
          alignContent:"center",
          "& > :not(style)": { m: 1, width: "100%" }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" name="user" label="Usuario" variant="outlined" onChange={handleLogin} />
        <TextField id="outlined-basic" name="password" label="Contraseña" variant="outlined" onChange={handleLogin} />
        <Button onClick={validate} fullWidth>Ingresar</Button>
      </Box>
    </>
  );
}

export default Form;
