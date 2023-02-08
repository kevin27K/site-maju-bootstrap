let banner = document.querySelector("#hero");

let bannerAtual = 0;
const listImg = ["url(../img/unhas1.jpg)", "url(../img/unhas2.jpg)", "url(../img/unhas3.jpg)", "url(../img/unhas4.jpg)", "url(../img/unhas5.jpg)"];

banner.style.background = listImg[0];
ajustaTela();
bannerAtual = 1;

function ajustaTela() {
	banner.style.backgroundRepeat = "no-repeat";
	banner.style.backgroundSize = "cover";
	banner.style.backgroundPosition = "center";
	banner.style.backgroundAttachment = 'fixed';
}

function trocaImg() {
	banner.style.background = listImg[bannerAtual];
	ajustaTela();
	bannerAtual++

	if (bannerAtual === listImg.length) {
		bannerAtual = 0;
	}
}

setInterval(trocaImg, 4000);

// ....................................

/*
let element = window.addEventListener('click', (el) => {
	let elAttr = el.target;
	console.log(`Elemento ${elAttr}`);
	const prop = elAttr.getBoundingClientRect()
	let newValue = prompt('digite o valor de width');
	elAttr.style.width = `${newValue}px`;
	console.log(`${prop.width}`);
});

*/


