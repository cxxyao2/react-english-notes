// The base64 encoded file should be converted to Blob before bing uploaded to server.
export function base64ToBlob(urlData, type) {
	let arr = urlData.split(',')
	// * 和 + 限定符都是贪婪的，因为它们会尽可能多的匹配文字，只有在它们的后面加上一个 ? 就可以实现非贪婪或最小匹配。
	let mime = arr[0].match(/:(.*?);/)[1] || type
	// 去掉url的头，并转化为byte
	// atob() function decodes a string of data which has been encoded using Base64 encoding. 解码
	// You can use the btoa() method to encode and transmit data which may otherwise cause communication problems,
	// then transmit it and use the atob() method to decode the data again

	let byteCharacters = atob(arr[1])
	let sliceSize = 512
	let byteArrays = []

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize)

		const byteNumbers = new Array(slice.length)
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i)
		}

		const byteArray = new Uint8Array(byteNumbers)
		byteArrays.push(byteArray)
	}

	const blob = new Blob(byteArrays, { type: mime })
	return blob
}

/**
 * save blob data to local file
 * @param {string} blobData
 * @param {string} localFileName
 * @param {string} fileType
 */
export function saveBlobtoLocalFile(
	blobData,
	localFileName,
	fileType = 'text/plain;charset=utf-8'
) {
	var file = new File([blobData], { type: fileType })
	const downloadAncher = document.createElement('a')
	downloadAncher.style.display = 'none'
	const fileURL = URL.createObjectURL(file)
	downloadAncher.href = fileURL
	downloadAncher.download = localFileName
	downloadAncher.click()
	URL.revokeObjectURL(fileURL) // free up storage
}

/**
 * convert a 2-d array to csv string
 * @param {Array<Array<string|number|boolean>>} contents
 * @param {string} fileName
 * @returns string
 */
export function makeText(contents, fileName) {
	let csv = ''
	contents.forEach((value) => {
		value.forEach((item, i) => {
			let innerValue = item === null ? '' : '' + item
			let result = innerValue.replace(/"/g, '""')
			// " , \n换行符  以上3个符号出现任何一个，表示一行结束
			if (result.search(/("|,|\n)/g) >= 0) {
				result = '"' + result + '"'
			}
			if (i > 0) {
				csv += ','
			}
			csv += result
		})
		csv += '\n'
	})
	saveBlobtoLocalFile(csv, fileName)
	return csv
}
