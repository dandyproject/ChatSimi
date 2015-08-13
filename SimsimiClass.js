var Simsimi = function() {

	this.get = function(res) {
		var prom = new Promise(function(resolve, reject) {
			fetch("http://192.168.88.14/speech/curl.php?text=" + res).then(function(res) {
				if (res.status == 200)
					return res.json();
				else
				reject("Network Error");
			}).then(function(res) {
				if (res.hasOwnProperty("response")) {
					resolve(res.response);
				} else {
					reject("No Response");
				}
			});
		});
		return prom;
	}
}