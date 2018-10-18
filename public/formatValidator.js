
function loadJSON() {
	return new Promise((resolve) => {
		const xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', 'supported-formats.json', true); // Replace 'my_data' with the path to your file
		xobj.onreadystatechange = function () {
			if (xobj.readyState === 4 && xobj.status === 200) {
				// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
				resolve(JSON.parse(xobj.responseText));
			}
		};
		xobj.send(null);
	});
}

const sampleResponse1 = {
	container: "AVI",
	audio: "ac3",
	videoCodec: {
		name: "H.264",
		profile: "mainProfile",
	},
	resolution: {
		width: 1920,
		height: 1080,
	},
	frameRate: 60,
	bitRate: 40,
};

const filterValidResolution = (list, currentResolution) => {
	return list.filter((resolution) => {
		const widthValid = currentResolution.resolution.width <= resolution.maxWidth;
		const heightValid = currentResolution.resolution.height <= resolution.maxHeight;
		const frameRateValid = currentResolution.frameRate <= resolution.frameRate;
		const bitRateValid = currentResolution.bitRate <= resolution.bitRate;
		return (widthValid && heightValid && frameRateValid && bitRateValid);
	});
};

const getSupportedPlatforms = (allPlatforms, videoFormat) => {
	const filtered = Object.keys(allPlatforms).filter((format) => {
		const formatObj = allPlatforms[format];
		const platformSupported = formatObj.filter((variant) => {
			const containerValid = variant.container.indexOf(videoFormat.container) >= 0;
			if (containerValid === false) {
				return false;
			}
			const audioValid = variant.audioCodec.indexOf(videoFormat.audio) >= 0;
			if (audioValid === false) {
				return false;
			}
			const availableCodecs = variant.videoCodec.filter((vidCodec) => {
				const nameValid = vidCodec.name === videoFormat.videoCodec.name;
				if (nameValid === false) {
					return false;
				}
				const profileValid = vidCodec.profiles.indexOf(videoFormat.videoCodec.profile) >= 0;
				if (profileValid === false) {
					return false;
				}
				const resolutions = filterValidResolution(vidCodec.resolution, videoFormat);
				return (resolutions.length > 0);
			});
			return (availableCodecs.length > 0);
		});
		return (platformSupported.length > 0);
	});
	console.log(filtered);
};

const example = async() => {
	const formats = await loadJSON();
	const supportedPlatforms = getSupportedPlatforms(formats, sampleResponse1);
};
