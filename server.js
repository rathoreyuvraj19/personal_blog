import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const posts = await axios.get(API_URL + "/all");
  res.render("index.ejs", { blogs: posts.data });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/newPost", async (req, res) => {
  console.log(req.body);
  const response = await axios.post(`${API_URL}/new`, req.body);
  console.log(response.data);
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/post/${req.params.id}`);
    res.render("modify.ejs", { data: response.data });
  } catch (error) {}
});

app.post("/editPost/:id", async (req, res) => {
  try {
    console.log("working");
    const response = await axios.patch(
      `${API_URL}/editPost/${req.params.id}`,
      req.body
    );
    res.redirect("/");
  } catch (error) {}
});

app.get("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    await axios.delete(`${API_URL}/post/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
