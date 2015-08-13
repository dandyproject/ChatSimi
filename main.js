var recognition;
window.addEventListener("load", init);

var speech;
var simsimi;
function init() {

	var btMulai = document.querySelector("#mulai");
	var consEl = document.querySelector("#consEl");

	btMulai.addEventListener("click", mulaiNgobrol);

	speech = new SpeechAPI();
	simsimi = new Simsimi();

	if (!('webkitSpeechRecognition' in window)) {
		alert("USE CHROME OR UPDATE YOUR BROWSER MEN, IT IS 2015!");
	} else {

		console.log("SUPPORT");

		recognition = new webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;

		recognition.lang = "id-ID";

		recognition.addEventListener("start", onStart);
		recognition.addEventListener("result", onResult);
		recognition.addEventListener("error", onError);
		recognition.addEventListener("end", onEnd);
	}

	function onStart() {
		console.log("%cstart", "color: red");
	}

	var final_transcript = "";
	function onResult(res) {
		var interim_transcript = '';

		for (var i = res.resultIndex; i < res.results.length; ++i) {
			if (res.results[i].isFinal) {
				final_transcript = res.results[i][0].transcript;
				cons("<pre class='blue'>" + final_transcript + "</pre>");

				recognition.stop();
				simsimi.get(final_transcript).then(function(res) {
					cons("<pre class='purple'>" + res + "</pre>");
					//console.log("Simsimi : %c" + res, "color: purple");
					speech.speak(res).then(function() {
						recognition.start();
					}, function() {
						recognition.start();
					})
				}, function(err) {
					cons("<pre class='red'>" + "Simsimi Error : " + err + "</pre>");
					//console.warn("Simsimi Error", err);
					//alert("Simsimi Error", err);
					recognition.start();
				});

			} else {
				interim_transcript += res.results[i][0].transcript;
				//console.log("%c" + interim_transcript, "color: green");
				cons("<pre class='green'>" + interim_transcript + "</pre>");
			}
		}
	}
	function onError(err) {
		console.warn("ERROR GAES", err);
	}
	function onEnd() {
		cons("<pre class='red'>" + "Recognition Stop" + "</pre>");
	}

	function mulaiNgobrol() {
		btMulai.removeEventListener("click", mulaiNgobrol);
		recognition.start();
	}
	function cons(el) {
		consEl.innerHTML = el + consEl.innerHTML;
	}

};