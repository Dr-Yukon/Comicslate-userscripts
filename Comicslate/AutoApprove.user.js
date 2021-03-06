// ==UserScript==
// @name			Comicslate AutoApprove
// @version			2021.04.20
// @description		Автоодобрение правок
// @match			http*://*comicslate.org/*
// @exclude			http*://*comicslate.org/*do=*
// @exclude			http*://browsershots.org/*
// @icon			https://www.google.com/s2/favicons?domain=comicslate.org
// @author			Rainbow-Spike
// @grant			none
// @supportURL		https://github.com/Comicslate/Userscripts/issues
// @updateURL		https://github.com/Comicslate/Userscripts/raw/master/Comicslate/AutoApprove.user.js
// @downloadURL		https://github.com/Comicslate/Userscripts/raw/master/Comicslate/AutoApprove.user.js
// ==/UserScript==

var approve_link = document.querySelector ( ".approval_action a" ),
	self = "Robot Spike",
	lever = 1; // 0 - одобрять всё, 1 - только себя

if ( approve_link != null ) {
	( lever )
	? (
		( document.querySelectorAll ( ".pageinfo bdi" ) [ 1 ].innerHTML == self )
		? approve_link.click ( )
		: ''
	)
	: approve_link.click ( )
}
