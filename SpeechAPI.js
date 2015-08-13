var SpeechAPI = function() {

	var isSupported = true;
	var msg = null;

	if (!('speechSynthesis' in window)) {
		isSupported = false;
	} else {
		msg = new SpeechSynthesisUtterance();
		msg.voiceURI = 'Google UK English Female';
		msg.volume = 1;
		msg.rate = 1;
		msg.pitch = 1;
		msg.lang = 'id-ID';		

	}

	this.speak = function(txt) {
		return new Promise(function(resolve, reject) {
			msg.text = txt;
			msg.addEventListener("end", onEnd);
			msg.addEventListener("error", onError);
			speechSynthesis.speak(msg);

			function onEnd(e) {
				msg.removeEventListener("end", onEnd);
				msg.removeEventListener("error", onError);
				resolve(e);
			}
			function onError() {
				msg.removeEventListener("end", onEnd);
				msg.removeEventListener("error", onError);
				reject();
			}
		});		
	}

	Object.defineProperty(this, "isSupported", {
		get: function() {			
			return isSupported;
		}
	});
	Object.defineProperty(this, "rate", {
		get: function() {			
			return msg.rate;
		},
		set: function(_rate) {
			msg.rate = _rate;
		}
	});

}