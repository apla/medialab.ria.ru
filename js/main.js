(function () {
	"use strict";

	function scrollTo(tab) {
		var hash = tab.hash;
		var panel = document.querySelector(hash);

		if (panel) {
			var box = panel.getBoundingClientRect();
			var body = document.body;
			var center = ~~((body.offsetWidth - box.width) / 2);
			var offset = box.left - center;

			var scrollLeft = body.scrollLeft;

			animate(body, {
				styles: {
					scrollLeft: {
						start: scrollLeft,
						end: scrollLeft + offset
					},

					scrollTop: {
						start: body.scrollTop,
						end: 0
					}
				},
				easing: 'easeInQuad',
				duration: 1000,
				callback: function () { console.log('Animation stopped'); }
			});
		}
	}

	function initTabs(el, selector, callback, cls) {
		cls = cls || 'selected';
		var currentTab = null;

		var onSelect = function (tab) {
			currentTab && currentTab.classList.remove(cls);
			currentTab = tab;
			currentTab.classList.add(cls);
			callback(tab);
		};

		var matches = function (el, selector) {
			var match = el.matchesSelector ||
				el.webkitMatchesSelector ||
				el.mozMatchesSelector ||
				el.oMatchesSelector ||
				el.msMatchesSelector;

			return match.call(el, selector);
		};

		el.addEventListener('click', function (e) {
			if (1 != e.which) { return; }

			if (matches(e.target, selector) && currentTab !== e.target) {
				onSelect(e.target);
				e.preventDefault();
			}
		}, false);

		var tabs = el.querySelectorAll(selector);
		var middle = tabs[~~(tabs.length / 2)];
		onSelect(middle);
	}

	initTabs(document, 'a[href^="/#"]', scrollTo);
}());
