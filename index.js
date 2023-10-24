import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/all", (req, res) => {
  res.json(posts);
});

app.get("/post/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const requestedPost = posts.find((post) => post.id === id);
  if (!requestedPost) {
    res.status(404).json({ error: `No post found with id:${id}` });
  } else {
    res.json(requestedPost);
  }
});

app.post("/new", (req, res) => {
  const date = new Date();
  console.log("hellow");
  console.log(req.body.title);
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: date,
  };
  posts.push(newPost);
  // console.log(posts);
  res.json(posts.slice(-1));
});

app.patch("/editPost/:id", (req, res) => {
  const date = new Date();
  const reqId = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === reqId);
  if (index === -1)
    res.status(404).json({ error: `Requested id ${reqId} NOT found` });
  posts[index].title = req.body.title || posts[index].title;
  posts[index].content = req.body.content || posts[index].content;
  posts[index].author = req.body.author || posts[index].author;
  posts[index].date = date;
  res.json(posts[index]);
});

app.delete("/post/:id", (req, res) => {
  const date = new Date();
  const reqId = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === reqId);
  if (index === -1)
    res.status(404).json({ error: `Requested id ${reqId} NOT found` });
  posts.splice(index, 1);
  res.json({ success: `Successfully deleted item with id: ${reqId}` });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];
