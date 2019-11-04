const app = require('express')()
const bodyParser = require('body-parser')
const base = require('./base')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/history', (req, res) => {
	res.send(base.getHistory())
})

app.get('/history/:id', (req, res) => {
	res.send(base.getHistoryOne(req.params.id))
})

app.post('/send-email', (req, res) => {
	const email = base.setSend({
		id: req.params.id,
		name: req.body.name,
		value: req.body.value
	})
	res.send(email)
})

app.delete('/del/:id', (req, res) => {
	const email = base.delHistory(req.params.id)
	res.send(email)
})

app.delete('/del', (req, res) => {
	const email = base.delAll()
	res.send(email)
})

app.listen(3000, () => {
	console.log('Exec...')
})
