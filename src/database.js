import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://martorressisanchez95:coderhouse@cluster0.ngz7kcs.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Conexión exitosa"))
  .catch((error) =>
    console.log(
      "Hubo un error al conectar",
      error
    )
  );
