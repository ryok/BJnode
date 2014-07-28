/*
 *	Webとネイティブ(iPhone/iPad)とのデータ連携処理
*/

var webNative = {};
webNative.userCallback = null;

// ユーザIDをiPhone/iPadに保存
webNative.saveUserID = function(userID) {
	var agent = navigator.userAgent;
	// iPhone/iPadの場合
	if(agent.indexOf('iPhone') != -1 || agent.indexOf('iPad') != -1) {
		document.location = "rehack.app.local://saveUserID_" + userID;
	}
};

// iPhone/iPadからユーザIDを取得
// ユーザIDがない場合: Failed が返る
// iPhone/iPad以外からアクセスした場合: PC_ACCESS が返る
webNative.getUserID = function(callback) {
	var agent = navigator.userAgent;

	// iPhone/iPadの場合
	if(agent.indexOf('iPhone') != -1 || agent.indexOf('iPad') != -1) {
		webNative.userCallback = callback;
		document.location = "rehack.app.local://getUserID";
	// それ以外の場合(テストIDを使用)
	} else {
		callback("52a4961cf9d6ee6a59000001");
	}
}

// iPhone/iPadに保存されたユーザIDを更新(今回は使用しないと思います)
webNative.updateUserID = function(userID) {
	var agent = navigator.userAgent;

	// iPhone/iPadの場合
	if(agent.indexOf('iPhone') != -1 || agent.indexOf('iPad') != -1) {
		webNativeCallback = callback;
		document.location = "rehack.app.local://updateUserID_" + userID;
	}
}

// iPhone/iPadからユーザIDを受け取る処理(iPhone/iPadから実行される処理)
var setUserID = function(userID) {
	webNative.userCallback(userID);
}
