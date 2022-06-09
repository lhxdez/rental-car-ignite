import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);

app.listen(3333, () => console.log("Server is running!"));



// app.get("/", (req, res) => {
//     return res.json( { message : " Hello World! " } )
// });

// app.post("/courses", (req, res) => { 
//     const { name } = req.body;

//     return res.json({ name });
// })