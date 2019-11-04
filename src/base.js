const fs = require('fs')
let base = require('../db/db.json')

function fsUp(b){
	fs.writeFile(__dirname + '/../db/db.json', JSON.stringify(b), 'utf8', (err) => {
		console.log(err || 'Save data')
	})
}

function getHistory(){
	return base
}

function getHistoryOne(id){
	return base[id] || {}
}

function setSend(email){
	let i = (Object.keys(base).length ? Object.keys(base) : [0]).reduce((ult, num) => { return (ult > num) ? ult : num })
	if (!email.id) email.id = ++i
	base[email.id] = email

	fsUp(base)

	return email
}

function delHistory(id){
	const email = base[id]
	delete base[id]

	fsUp(base)

	return email
}

function delAll(){
	base = {}

	fsUp(base)

	return base
}

module.exports = { getHistory, getHistoryOne, setSend, delHistory, delAll }
