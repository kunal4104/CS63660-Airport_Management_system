window.addEventListener('load', function () {
	var links = document.getElementsByClassName('link');
	full_path = location.href.split('#')[0]; //Ignore hashes?
	// console.log(full_path);
	var current = document.getElementsByClassName('active');
	if (current.length > 0) {
		current[0].className = current[0].className.replace(' active', '');
	}

	for (var i = 0; i < links.length; i++) {
		// console.log(links[i].href);
		if (links[i].href === full_path) {
			links[i].className += ' active';
		}
	}
});
