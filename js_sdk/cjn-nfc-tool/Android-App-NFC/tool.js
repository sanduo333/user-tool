/*
 * desc：封装NFC功能，实现安卓设备对NFC标签读取卡号，支持android5.0及以上版本，仅支持 android 平台 
 * author：liangyisheng
 * date：2020/07/30 19:21:03
 * version：1.0.0
 */
// 包路径
const package_NdefRecord = 'android.nfc.NdefRecord';
const package_NdefMessage = 'android.nfc.NdefMessage';
const package_TECH_DISCOVERED = 'android.nfc.action.TECH_DISCOVERED';
const package_Intent = 'android.content.Intent';
const package_Activity = 'android.app.Activity';
const package_PendingIntent = 'android.app.PendingIntent';
const package_IntentFilter = 'android.content.IntentFilter';
const package_NfcAdapter = 'android.nfc.NfcAdapter';
const package_Ndef = 'android.nfc.tech.Ndef';
const package_NdefFormatable = 'android.nfc.tech.NdefFormatable';
const package_Parcelable = 'android.os.Parcelable';
const package_String = 'java.lang.String';

let NfcAdapter;
let NdefRecord;
let NdefMessage;
let techListsArray = [
	['android.nfc.tech.IsoDep'],
	['android.nfc.tech.NfcA'],
	['android.nfc.tech.NfcB'],
	['android.nfc.tech.NfcF'],
	['android.nfc.tech.Nfcf'],
	['android.nfc.tech.NfcV'],
	['android.nfc.tech.NdefFormatable'],
	['android.nfc.tech.MifareClassi'],
	['android.nfc.tech.MifareUltralight']
];
let readyRead = false;

export default {
	nfcGetId: function(obj) {
		let that = this;
		try {
			let main = plus.android.runtimeMainActivity();
			let Intent = plus.android.importClass('android.content.Intent');
			let Activity = plus.android.importClass('android.app.Activity');
			let PendingIntent = plus.android.importClass('android.app.PendingIntent');
			let IntentFilter = plus.android.importClass('android.content.IntentFilter');
			NfcAdapter = plus.android.importClass('android.nfc.NfcAdapter');
			let nfcAdapter = NfcAdapter.getDefaultAdapter(main);

			if (nfcAdapter == null) {
				uni.showToast({
					title: '设备不支持NFC！',
					icon: 'none'
				})
				return;
			}

			if (!nfcAdapter.isEnabled()) {
				uni.showToast({
					title: '请在系统设置中先启用NFC功能！',
					icon: 'none'
				});
				return;
			} 
			
			let intent = new Intent(main, main.getClass());
			intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
			let pendingIntent = PendingIntent.getActivity(main, 0, intent, 0);
			let ndef = new IntentFilter("android.nfc.action.TECH_DISCOVERED");
			ndef.addDataType("*/*");
			let intentFiltersArray = [ndef];

			plus.globalEvent.addEventListener('newintent', function() {
				console.log('newintent running');
				// 监听 NFC
				setTimeout(function() {
					NdefRecord = plus.android.importClass("android.nfc.NdefRecord");
					NdefMessage = plus.android.importClass("android.nfc.NdefMessage");
					let main = plus.android.runtimeMainActivity();
					let intent = main.getIntent();
					//let that = this;
					
					console.log("action type:" + intent.getAction());
					
					if (package_TECH_DISCOVERED == intent.getAction()) {
						if (readyRead) {
							uni.showToast({
								title: '请勿移开标签正在读取数据',
								icon: 'none'
							});
							//let that = this;
							// NFC id
							let bytesId = intent.getByteArrayExtra(NfcAdapter.EXTRA_ID);
							let nfc_id = that.byteArrayToHexString(bytesId);
							console.log('nfc_id:'+ nfc_id);
							obj.success(nfc_id);
							readyRead = false;
						}
					}	
				}, 1000);
			});
			plus.globalEvent.addEventListener('pause', function(e) {
				console.log('pause running');
				if (nfcAdapter) {
					//关闭前台调度系统
					//恢复默认状态
					nfcAdapter.disableForegroundDispatch(main);
				}
			});
			plus.globalEvent.addEventListener('resume', function(e) {
				console.log('resume running');
				if (nfcAdapter) {
					//开启前台调度系统
					nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray);
				}
			});
			nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray);
			
			// 监听事件，触发条件
			readyRead = true;
			uni.showToast({
				title: '请将NFC标签靠近！',
				icon: 'none'
			});
						
		} catch (e) {
			console.error(e);
			obj.fail(e);
		} finally{
			obj.complete();
		}
	},

	byteArrayToHexString: function(inarray) {
		let i, j, inn;
		let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
		let out = "";

		for (j = 0; j < inarray.length; ++j) {
			inn = inarray[j] & 0xff;
			i = (inn >>> 4) & 0x0f;
			out += hex[i];
			i = inn & 0x0f;
			out += hex[i];
		}
		return out;
	},

}

