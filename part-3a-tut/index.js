const express = require("express");
const app = express();
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  /* we need the if statement to send the response with a status code of 404 if there is 
  no note because normally the server will respond with status code 200 even though note is undefined
  */
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
  response.json([123]);
  response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  /* 204 status code indicates that the server successfully fulfilled the request
  and that there is no additional content to send in the response content
  */
  response.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };
  console.log(notes, note, typeof notes, typeof note);
  notes = notes.concat(note);

  response.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/sayhi", (request, response) => {
  const test = [1, 2, 3];
  const obj = { hi: "hello" };
  console.log(test.concat(obj));
});

