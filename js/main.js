"use strict";

String.prototype.template = function (o) {
    return this.replace(
        /\${(.+?)}/g,
        function (_, k) { return o[k]; }
    );
};

(function () {
	var box = document.querySelector('#box');

	var applyTemplate = function (obj) {
		box.innerHTML = box.innerHTML.template(obj);

		var sides = box.querySelectorAll('div');
		var prevCls;

		[].forEach.call(sides, function (el) {
			el.addEventListener('click', function () {
				var cls = el.className;

				if (prevCls !== cls) {
					if (prevCls) {
						box.classList.remove('show-' + prevCls);
					}
					box.classList.add('show-' + cls);
					prevCls = cls;
				}
			}, false);
		});
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