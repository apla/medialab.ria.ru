"use strict";

String.prototype.template = function (o) {
    return this.replace(
        /\${(.+?)}/g,
        function (_, k) { return o[k]; }
    );
};

(function () {
	var box = document.querySelector('#impress');

	var init = function () {
		var steps = box.querySelectorAll('.step');
		var menus = box.querySelectorAll('.menu');
		var menu1 = menus[0];
		var menu2 = menus[1];

		var currentStep;
		var currentItem;
		var defClick;
		var shaded = true;

		menu1.style.left = ~~(menu1.offsetParent.clientWidth / 2) + 'px';
		menu1.classList.remove('zoomed');

		menu1.addEventListener('click', function (e) {
			if (shaded) {
				menu1.classList.add('shaded');
				menu2.classList.remove('rotated');

				defClick();
			} else {
				menu1.classList.remove('shaded');
				menu2.classList.add('rotated');

				currentStep.classList.add('rotated');
				currentItem.classList.remove('active');
				currentStep = null;
				currentItem = null;
			}

			shaded = !shaded;
		}, false);

		[].forEach.call(
			menu2.querySelectorAll('.item'),
			function (el, i, items) {
				var onClick = function (e) {
					if (currentStep) {
						currentStep.classList.add('rotated');
					}
					currentStep = steps[i];
					currentStep.classList.remove('rotated');

					if (currentItem) {
						currentItem.classList.remove('active');
					}
					currentItem = items[i];
					currentItem.classList.add('active');
				};

				el.addEventListener('click', onClick, false);

				if (0 == i) {
					defClick = onClick;
				}
			}
		);
	};

	var applyTemplate = function (obj) {
		box.innerHTML = box.innerHTML.template(obj);

		var sides = box.querySelectorAll('div');
		var prevCls;
	};

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'data/articles.json', true);
	xhr.addEventListener('load', function () {
		var resp = xhr.responseText;
		var json = JSON.parse(resp);
		applyTemplate(json);
		init();
	});
	xhr.send();
}());