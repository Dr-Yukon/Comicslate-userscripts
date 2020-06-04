// ==UserScript==
// @name			Comicslate AutoSaveClicker
// @version			2020.06.04
// @description		Autoclick Save button
// @description:ru	Автоклик сохранения
// @include			http*://*comicslate.org/*
// @exclude			http*://*comicslate.org/*do=index*
// @exclude			http*://*comicslate.org/*idx=*
// @icon			https://www.google.com/s2/favicons?domain=comicslate.org
// @author			Rainbow-Spike
// @grant			none
// ==/UserScript==

var lever = 1, /* генератор страниц
				0 + Comicslate NaviClicker
				1 + Comicslate IndexEditor */
	sv = document.querySelector ( "#edbtn__save" ),
	timer = 2;

sv ? sv.click ( ) : ( lever ? setTimeout ( function ( ) { window.close ( ) }, timer * 1000 ) : '' )
