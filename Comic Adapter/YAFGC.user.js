// ==UserScript==
// @author			Rainbow-Spike
// @version			2020.01.30
// @name			Comic Adapter: YAFGC
// @include			http*://*yafgc.net*
// @icon			https://www.google.com/s2/favicons?domain=yafgc.net
// @grant			none
// @run-at			document-end
// ==/UserScript==

var sidebar = document.querySelector ( "#sidebar-header" ),
	prev = document.querySelector ( ".navi-prev" ),
	next = document.querySelector ( ".navi-next" ),
	content = document.querySelector ( ".post-content"),
		title = content.querySelector ( "h2" ),
			title_a = title.querySelector ( "a" ),
		chap = content.querySelector ( ".comic-chapter"),
			chap_a = chap.querySelector ( "a" ),
		char = content.querySelector ( ".comic-characters" ),
		loc = content.querySelector ( ".comic-locations"),
		ent = content.querySelector ( ".entry"),
	texter = '';

// IMAGELINK
var com_div = document.querySelector ( '#comic' ),
	com_a = com_div.querySelector ( 'a' ),
	com_img = com_div.querySelector ( 'img' );
if ( com_a == null ) {
	com_a = document.createElement ( 'a' );
	com_a.append ( com_img );
	com_div.append ( com_a );
};
com_a.href = com_img.src;

// SELECT
function selectblock ( name ) {
	var rng = document.createRange ( );
	rng.selectNode ( name );
	var sel = window.getSelection ( );
	sel.removeAllRanges ( );
	sel.addRange ( rng );
}

// ТИТУЛ
if ( title_a == undefined ) title_a = title; // если в заголовке нет ссылки, то сам заголовок
texter += title_a.innerHTML.replace ( /^(\d+):? (.*)$/, "== Yet Another Fantasy Gamer Comic $1 ==<br>**$2**<br>{cnav}<br>{{$1.jpg}}" );

// ГЛАВА
if ( chap != undefined ) texter = texter.replace ( "<br>**", "<br>**" + chap_a.innerHTML + ": " );

// ПЕРСОНАЖИ
if ( char != undefined ) {
	texter += "<br><br>" + char.innerHTML
		.replace ( "Characters:", "Персонажи:" )
		.replace ( /\<a href="https:\/\/www.yafgc.net\/character\/[^"]+" rel="tag"\>([^\<]+)\<\/a>/g, "[[/?do=search&id=ns%3Aru%3Agamer%3Ayet-another-fantasy-gamer-comic+$1|$1]]" ); // мусор после href
}

// МЕСТНОСТЬ
if ( loc != undefined ) {
	texter += ( char != undefined ) ? "\\\\<br>" : "<br><br>";
	texter += loc.innerHTML
		.replace ( "Location:", "Местность:" )
		.replace ( /\<a href="https:\/\/www.yafgc.net\/location\/[^"]+" rel="tag"\>([^\<]+)\<\/a>/g, "[[/?do=search&id=ns%3Aru%3Agamer%3Ayet-another-fantasy-gamer-comic+$1|$1]]" ); // мусор после href
}

// ПРОЧЕЕ
if ( ent != undefined ) {
	texter += ( loc == undefined ) ? "<br>" : "";
	texter += "<br>" + ent.innerHTML
		.replace ( /\<br\>/g, "\\\\<br>" )
		.replace ( /\<a [^/>]+ href="([^"]+)"\>([^\<]+)\<\/a>/g, "[[$1|$2]]" ) // мусор до href
		.replace ( /\<img src="([^"]+)"[^/>]+\>/g, "{{$1}}" ) // после src идёт alt
		.replace ( /\<em>([^\<]+)\<\/em>/g, "//$1//" )
		.replace ( /\<strong>([^\<]+)\<\/strong>/g, "**$1**" )
//		.replace ( /Cowboys and Crossovers”\<\/p\>\n\<p\>http:\/\/cowboysandcrossovers.thecomicseries.com\/comics\/\<\/p\>\n\<p\>Drawn/, '[[http://cowboysandcrossovers.thecomicseries.com/comics/|Cowboys and Crossovers]]"\\\\<br>Drawn' )
	+ "{cnav}"; // докувикификация
} else {
	texter += "<br>{cnav}";
}
sidebar.innerHTML = texter;

selectblock ( sidebar );

// HOTKEYS
prev.accessKey = "z";
next.accessKey = "x";
