const app = express()

app.get('/', (req, res) => {
    res.send("henlo")
})

app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`)
})