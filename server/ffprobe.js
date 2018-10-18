const ffprobe = require('ffprobe'),
	ffprobeStatic = require('ffprobe-static');

const getDataAboutVideoFile = async(filepath) => {
	const info = await ffprobe(filepath, {path: ffprobeStatic.path});
	const audioStream = info.streams.find((stream) => stream.codec_type === 'audio');
	const videoStream = info.streams.find((stream) => stream.codec_type === 'video');

	let frameRate;
	try {
		frameRate = videoStream.r_frame_rate.split('/')[0];
	} catch (e) {
		frameRate = videoStream.r_frame_rate;
	}
	return {
		container: "AVI",
		audio: audioStream ? audioStream.codec_name : '',
		videoCodec: {
			name: videoStream.codec_name,
			profile: videoStream.profile,
		},
		resolution: {
			width: videoStream.width,
			height: videoStream.height,
		},
		frameRate: parseInt(frameRate),
		bitRate: videoStream.bit_rate / 1024 / 1024,
	}
};

module.exports = getDataAboutVideoFile;
