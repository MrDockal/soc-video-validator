const ffprobe = require('ffprobe'),
	ffprobeStatic = require('ffprobe-static');

const getDataAboutVideoFile = async(filepath) => {
	return await ffprobe(filepath, {path: ffprobeStatic.path});
};

module.exports = getDataAboutVideoFile;
