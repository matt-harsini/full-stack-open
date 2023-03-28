const express = require("express");
const app = express();
app.use(express.json());
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `<h1>Phonebook has info for ${
      data.length
    } people</h1><br/>${date.toISOString()}`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = data.find((person) => id === person.id);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((person) => person.id !== id);
  response.status(204).send(data);
});

function generateId() {
  const maxId =
    data.length > 0 ? Math.max(...data.map((person) => person.id)) + 1 : 0;
  return maxId;
}

app.post("/api/persons/", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Content Missing",
    });
  }
  console.log(body.name);
  if (data.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "Cannot have duplicate name",
    });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  data = data.concat(person);
  response.json(data);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
