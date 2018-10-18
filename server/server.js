const express = require('express');
const app = express();
const port = 3000;
const fileUpload = require('express-fileupload');
const config = require('../config');
const getDataAboutVideoFile = require('./ffprobe');

app.use(fileUpload());
app.use(express.static('public'));

app.post('/get-file-info', (req, res) => {
	if (Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let sampleFile = req.files.sampleFile;

	// Use the mv() method to place the file somewhere on your server
	sampleFile.mv(`${config.staticUploadDir}/${sampleFile.name}`, async (err) => {
		if (err)
			return res.status(500).send(err);

		const info = await getDataAboutVideoFile(`${config.staticUploadDir}/${sampleFile.name}`);

		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(info));
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
