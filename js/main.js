"use strict";

String.prototype.template = function (o) {
    return this.replace(
        /\${(.+?)}/g,
        function (_, k) { return o[k]; }
    );
};

(function () {
	var box = document.querySelector('#impress');

	var applyTemplate = function (obj) {
		box.innerHTML = box.innerHTML.template(obj);

		var sides = box.querySelectorAll('div');
		var prevCls;

		impress().init();
	};

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'data/articles.json', true);
	xhr.addEventListener('load', function () {
		var resp = xhr.responseText;
		var json = JSON.parse(resp);
		applyTemplate(json);
	});
	xhr.send();
}());