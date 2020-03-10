const express = require("express");
const shortid = require("shortid");
const port = 5000;

const server = express();

server.use(express.json());

const users = [
    {
        id: shortid.generate(),
        name: "John Smith",
        bio: "Didn't actually marry Pocohontas"
    },
    {
        id: shortid.generate(),
        name: "John Rolfe",
        bio: "The John that DID marry Pocohontas"
    }
];

server.get("/api/users", (req, res) => {
    res.status(200).json(users);

    // if there were an error retrieving data from database
    // res.status(500).send({ errorMessage: "The users' information could not be retrieved" })
});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;

    const userIndex = users.findIndex(person => person.id === id);

    res.status(200).json(users[userIndex]);

    // if there were an error retrieving data from database
    // res.status(500).send({ errorMessage: "The user's information could not be retrieved" })
});

server.post("/api/users", (req, res) => {
    const newUser = {
        ...req.body,
        id: shortid.generate()
    };

    if (newUser.name && newUser.bio) {
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send({
            errorMessage: "Please provide name and bio for the user"
        });
    }

    // if there were an error saving to database
    // res.status(500).send({ errorMessage: "There was an error while saving the user to the database" })
});

server.listen(port, () => console.log(`server listening on port ${port}`));
