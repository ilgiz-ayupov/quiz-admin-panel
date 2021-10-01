const express = require("express")
const multer = require("multer")
const firebase = require("./firebase")
const serveStatic = require("serve-static")
const path = require("path")
const cors = require("cors")

app = express()
app.use(serveStatic(path.join(__dirname, 'dist')))

const upload = multer({
    storage: multer.memoryStorage()
})

const corsOptions = {
    origin: "http://localhost:8080",
    optionsSuccessStatus: 200
}

// set GOOGLE_APPLICATION_CREDENTIALS=C:/PROJECTS/quizVueProject/quiz-project/quiz-db.json


const port = process.env.PORT || 5000
app.post('/upload', cors(corsOptions), upload.single('file'), (req, res) => {
    console.log(req);
    if(!req.file) {
        res.status(400).send("Error: No files found")
    } else {
        const blob = firebase.bucket.file(req.body.title)
        
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        })
        
        blobWriter.on('error', (err) => {
            console.log(err)
        })
        
        blobWriter.on('finish', () => {
            res.status(200).send("File uploaded.")
        })
        
        blobWriter.end(req.file.buffer)
    }
})

app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}`)
})

