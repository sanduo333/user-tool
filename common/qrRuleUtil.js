import {
	Base64
} from 'js-base64';
import CryptoJS from "crypto-js";

function stringToBytes(string) {
	var array = new Array(string.length);
	for (var i = 0, l = string.length; i < l; i++) {
		array[i] = string.charCodeAt(i);
	}
	return array;
}

function byteToString(arr) {
	if (typeof arr === 'string') {
		return arr;
	}
	var str = '',
		_arr = arr;
	for (var i = 0; i < _arr.length; i++) {
		var one = _arr[i].toString(2),
			v = one.match(/^1+?(?=0)/);
		if (v && one.length == 8) {
			var bytesLength = v[0].length;
			var store = _arr[i].toString(2).slice(7 - bytesLength);
			for (var st = 1; st < bytesLength; st++) {
				store += _arr[st + i].toString(2).slice(2);
			}
			str += String.fromCharCode(parseInt(store, 2));
			i += bytesLength - 1;
		} else {
			str += String.fromCharCode(_arr[i]);
		}
	}
	return str;
}


function encrypt(word, keyStr) {
	let srcs = CryptoJS.enc.Utf8.parse(word);
	let key = CryptoJS.enc.Utf8.parse(keyStr);
	let ivHexStr = "0A010B05040F070917030106080C0D5B"
	let iv = CryptoJS.enc.Hex.parse(ivHexStr)
	let encrypted = CryptoJS.AES.encrypt(word, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	let encryptedBase64Data = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
	return encryptedBase64Data
	// return encrypted.toString();
}

function generateQRStr(token, aesKey) {
	console.log('初始token', token, aesKey)
	let tokenBytes = stringToByte2(token)
	var aesStr = aesKey
	let qrStr = encrypt(token, aesKey)
	console.log('二维码：', qrStr)

	return qrStr
}

// function encrypt(word, keyStr) {
// 	console.log('字节转字符串', byteToString(keyStr))
// 	let key = CryptoJS.enc.Utf8.parse(byteToString(keyStr));
// 	let srcs = CryptoJS.enc.Hex.parse(word);
// 	console.log('word转码', srcs)
// 	let ivHexStr = "0A010B05040F070917030106080C0D5B"
// 	let iv = CryptoJS.enc.Hex.parse(ivHexStr)
// 	let encrypted = CryptoJS.AES.encrypt(srcs, key, {
// 		iv: iv,
// 		mode: CryptoJS.mode.CBC,
// 		padding: CryptoJS.pad.Pkcs7
// 	});
// 	return encrypted.toString();
// }

// function generateQRStr(customInfo, aesKey) {
// 	// let timeBytes = stringToBytes(validTime.toString())
// 	console.log('初始token', customInfo, aesKey)
// 	// let tokenBytes = stringToByte2(Base64.decode(token))
// 	let customBytes = stringToBytes(customInfo)
// 	// let splitBytes = stringToBytes('-')
// 	// var infoArray = timeBytes.concat(splitBytes)
// 	// infoArray = infoArray.concat(tokenBytes)
// 	// infoArray = infoArray.concat(splitBytes)
// 	// infoArray = infoArray.concat(customBytes)
// 	let bodyStr = Bytes2Str(customBytes)

// 	var aesStr = aesKey
// 	let qrStr = encrypt(bodyStr, stringToBytes1(aesStr))
// 	console.log('二维码：', qrStr)

// 	return qrStr
// }

function stringToBytes1(string) {
	var array = new Array(string.length + 8);
	for (var i = 0, l = string.length + 8; i < l; i++) {
		i > 7 ? array[i] = 0x00 : array[i] = string.charCodeAt(i)
	}
	return array;
}

function Bytes2Str(arr) {
	var str = "";
	for (var i = 0; i < arr.length; i++) {
		var tmp = arr[i].toString(16);
		if (tmp.length == 1) {
			tmp = "0" + tmp;
		}
		str += tmp;
	}
	return str;
}

function stringToByte2(str) {
	var ch, st, re = [];
	for (var i = 0; i < str.length; i++) {
		ch = str.charCodeAt(i); // get char
		st = []; // set up "stack"

		do {
			st.push(ch & 0xFF); // push byte to stack
			ch = ch >> 8; // shift value down by 1 byte
		}
		while (ch);
		re = re.concat(st.reverse());
	}
	return re;
}
export default generateQRStr