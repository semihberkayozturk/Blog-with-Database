//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hello Everyone I'm Semih, and in this personal website, I do share blog posts about technology. You can also learn more about me and my projects up above. Thank you for your interest !"
const aboutContent = "Hello ! I'm Semih, and I live in Istanbul/Turkey. Currently I study Management Information Systems at Istanbul Bilgi University. On the other hand, I mostly spend my time working on Back-end Web Development and its components with various materials such as Harvard's CS50, freecodecamp, Postman and so forth.\nIf you want to learn more about me, check out my LinkedIn profile or send me an e-mail. Please free to contact me. Thank You."
const contactContent = "I've been developing projects with Python, HTML, CSS, JavaScript and Node.js for a while. Take a look at some of my projects and its GitHub links."

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let inputs = [];



app.get("/", function(req, res) {
    res.render("home", {
        startingContent: homeStartingContent,
        inputs: inputs
    })
})

app.get("/contact", function(req, res) {
    res.render("contact", { contactContent: contactContent });
})

app.get("/about", function(req, res) {
    res.render("about", { aboutContent: aboutContent });
})

app.get("/compose", function(req, res) {
    res.render("compose");
})

app.post("/compose", function(req, res) {
    const input = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    inputs.push(input);
    res.redirect("/");
})

app.get("/posts/:postName", (req, res) => {
    const requestedTitle = _.lowerCase(req.params.postName);
    inputs.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);
        if (requestedTitle === storedTitle) {
            res.render("post", {
                content: post.content,
                title: post.title
            });
        }
    })
});


app.listen(3000, function() {
    console.log("Server started on port 3000");
});