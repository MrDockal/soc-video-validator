import * as React from 'react';

interface OwnProps {
}

class App extends React.Component<OwnProps, {}> {

	public render() {
		return (
			<div>
				<input
					type="file"
					onChange={
						(e) => this.handleChange(e.target.files)}
				/>
			</div>
		);
	}

	private async handleChange(selectorFiles: FileList) {
		const file = selectorFiles[0];
		const start = await this.readBytes(file, 0, 512 * 1024);
		const end = await this.readBytes(file, file.size - 512 * 1024, file.size - 1);
		const joined = this.appendBuffer(start, end);
		const blob = new Blob([joined as ArrayBuffer], {type: "application/octet-stream"});
		const link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = "myFileName";
		link.click();
	}

	private readBytes(file: File, start: number, end: number) {
		return new Promise((resolve: (arrayBuffer: ArrayBuffer) => void, reject) => {
			const fileReader = new FileReader();
			fileReader.onloadend = () => {
				const result = fileReader.result;
				resolve(result as ArrayBuffer);
			};
			const chunk = file.slice(start, end);
			fileReader.readAsArrayBuffer(chunk);
		});
	}

	private appendBuffer(buffer1: ArrayBuffer, buffer2: ArrayBuffer) {
		const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
		tmp.set(new Uint8Array(buffer1), 0);
		tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
		return tmp.buffer;
	}
}

export default App;
