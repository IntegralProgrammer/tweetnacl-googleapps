var window = {};
var libnacl = {};

function printTypedArray(arr) {
	var arr_str = "";
	for (var i = 0; i < arr.length; i++) {
		arr_str += arr[i] + " ";
	}
	Logger.log(arr_str);
}

function myFunction() {
	var Uint8Array = window.libs.Uint8Array;
	
	var box_key = new Uint8Array([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);
	var box_nonce = new Uint8Array([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]);
	
	var plain_msg = new Uint8Array([42,88,94,111,43,67]);
	printTypedArray(plain_msg);
	
	var protected_msg = libnacl.secretbox(plain_msg, box_nonce, box_key);
	printTypedArray(protected_msg);
	
	var recovered_msg = libnacl.secretbox.open(protected_msg, box_nonce, box_key);
	printTypedArray(recovered_msg);
}
