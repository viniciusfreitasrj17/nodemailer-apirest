const app = require('express')()
const bodyParser = require('body-parser')
const base = require('./base')
const mailer = require('nodemailer')

const transporter = mailer.createTransport({
	host: "h37.servidorhh.com",
	port: 465,
	secure: true,
	auth: {
		user: "teste-mailer@vinicius17-node.meu-br.com",
		pass: "@L4cun4@"
	}
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/history', (req, res) => {
	res.send(base.getHistory())
})

app.get('/history/:id', (req, res) => {
	res.send(base.getHistoryOne(req.params.id))
})

app.post('/send-email', (req, res) => {
	const email = base.setSend({
		from: "teste-mailer@vinicius17-node.meu-br.com",
		to: req.body.to,
		subject: req.body.subject,
		text: req.body.text
	})
	transporter.sendMail(email, (req, res) => {
		error ? res.status(400).send('Falhou') : res.status(200).send('E-mail Enviado')
	})
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
