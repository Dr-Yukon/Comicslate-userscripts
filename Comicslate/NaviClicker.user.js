// ==UserScript==
// @name			Comicslate NaviClicker
// @version			2021.04.15
// @description		Добавление "?do=edit" прямой ссылки в редактор к красным/зелёным ссылкам в навигаторе, автоклик на них
// @match			http*://*comicslate.org/*
// @exclude			http*://*comicslate.org/*do=*
// @exclude			http*://browsershots.org/*
// @icon			https://www.google.com/s2/favicons?domain=comicslate.org
// @author			Rainbow-Spike
// @grant			none
// @supportURL		https://github.com/Comicslate/Userscripts/issues
// @updateURL		https://github.com/Comicslate/Userscripts/raw/master/Comicslate/NaviClicker.user.js
// @downloadURL		https://github.com/Comicslate/Userscripts/raw/master/Comicslate/NaviClicker.user.js
// ==/UserScript==

var cnav = document.querySelector ( ".cnav" ),
	c_prev = 0,
	c_next = 1,
	c_green = 0,
	qs,
	timer = 2000;

if ( cnav != null ) {
	if ( c_green != 0 ) {
		document.querySelectorAll ( ".wikilink1#navnext:not([href$='do=edit']), .wikilink1#navprev:not([href$='do=edit'])" ).forEach (
			function ( e ) {
				e.href += ( e.href.search ( "\\?" ) != -1 ) ? '&' : '?';
				e.href += 'do=edit'
			}
		)
		if ( c_next != 0 ) qs = document.querySelector ( ".wikilink1#navnext" )
		if ( c_prev != 0 && qs == undefined ) qs = document.querySelector ( ".wikilink1#navprev" )
	}
	document.querySelectorAll ( ".wikilink2#navnext:not([href$='do=edit']), .wikilink2#navprev:not([href$='do=edit'])" ).forEach (
		function ( e ) {
			e.href += (( e.href.search ( "\\?" ) != -1 ) ? '&' : '?');
			e.href += 'do=edit'
		}
	)
	if ( c_next != 0 && qs == undefined ) qs = document.querySelector ( ".wikilink2#navnext" )
	if ( c_prev != 0 && qs == undefined ) qs = document.querySelector ( ".wikilink2#navprev" )
	if ( qs != null ) setTimeout ( function ( ) { qs.click ( ) }, timer );
}

// в сочетании с Comicslate AutoSaveClicker - генератор страниц
