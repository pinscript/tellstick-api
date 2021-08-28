const polka = require('polka')
const fs = require('fs')
const { device } = require('./tdtool.js')

polka()
	.get('/device/list', async (req, res) => {
		const list = await device.list()
		const json = JSON.stringify(list)
		res.end(json)
	})
	.get('/device/on/:deviceId', async (req, res) => {
		await device.on(req.params.deviceId)
		res.end()
	})
	.get('/device/off/:deviceId', async (req, res) => {
		await device.off(req.params.deviceId)
		res.end()
	})
	.get('/', (req, res) => {
		fs.readFile('static/index.html', 'utf8', (err, data) => {
			res.end(data)
		})
	})
	.listen(3000, err => {
		if (err) throw err;
		console.log(`Listening on :3000`)
	})
