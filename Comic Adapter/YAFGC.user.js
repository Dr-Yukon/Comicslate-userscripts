// ==UserScript==
// @name			Comic Adapter: YAFGC
// @version			2020.10.04
// @description     Extract Info for Comicslate
// @include			http*://*yafgc.net*
// @icon			https://www.google.com/s2/favicons?domain=yafgc.net
// @author			Rainbow-Spike
// @grant			none
// ==/UserScript==

var sidebar = document.querySelector ( "#sidebar-header" ) || '',
	cont = document.querySelector ( ".post-content" ) || '',
		title = cont.querySelector ( "h2" ) || '',
			title_a = title.querySelector ( "a" ) || '',
		chap = cont.querySelector ( ".comic-chapter" ) || '',
			chap_a = chap.querySelector ( "a" ) || '',
		char = cont.querySelector ( ".comic-characters" ) || '',
			chart = char.textContent || '',
		loc = cont.querySelector ( ".comic-locations" ) || '',
			loct = loc.textContent || '',
		ent = cont.querySelector ( ".entry" ) || '',
			entt = ent.textContent || '',
	texter = '';

chart = chart.replace (/\s+/g, '') || '';
loct = loct.replace (/\s+/g, '') || '';
entt = entt.replace (/\s+/g, '') || '';

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
if ( title_a == '' ) title_a = title;
texter += title_a.innerHTML.replace ( /^(\d+):? (.*)$/, "== Yet Another Fantasy Gamer Comic $1 ==<br>**$2**<br><br>{cnav}<br>{{$1.jpg}}" );
if ( chap != undefined ) texter = texter.replace ( "<br>**", "<br>**" + chap_a.innerHTML + ": " );
if ( chart != '' || loct != '' || entt != '' ) texter += "<br><br>";

// ПЕРСОНАЖИ
if ( char != '' ) {
	texter += char.innerHTML
		.replace ( "Characters:", "Персонажи:" )
		.replace ( /\<a href="https:\/\/www.yafgc.net\/character\/[^"]+" rel="tag"\>([^\<]+)\<\/a>/g, "[[/?do=search&id=ns%3Aru%3Agamer%3Ayet-another-fantasy-gamer-comic+$1|$1]]" );
	if ( loct != '' || entt != '' ) texter += "\\\\<br>";
}

// МЕСТНОСТЬ
if ( loc != '' ) {
	texter += loc.innerHTML
		.replace ( "Location:", "Местность:" )
		.replace ( /\<a href="https:\/\/www.yafgc.net\/location\/[^"]+" rel="tag"\>([^\<]+)\<\/a>/g, "[[/?do=search&id=ns%3Aru%3Agamer%3Ayet-another-fantasy-gamer-comic+$1|$1]]" );
	if ( entt != '' ) texter += "\\\\<br>";
}

// ПРОЧЕЕ
if ( entt != '' ) {
	texter += ent.innerHTML
		.replace ( /\<br\>/g, "\\\\<br>" )
		.replace ( /\<a [^/>]+ href="([^"]+)"\>([^\<]+)\<\/a>/g, "[[$1|$2]]" )
		.replace ( /\<img src="([^"]+)"[^/>]+\>/g, "{{$1}}" )
		.replace ( /\<em>([^\<]+)\<\/em>/g, "//$1//" )
		.replace ( /\<strong>([^\<]+)\<\/strong>/g, "**$1**" )
		.replace ( /\<\/p>\s+<p>/g, "\\\\<br>" )
		.replace ( /\<\/?p>/g, "" )
		.replace ( /\<div class="clear"><\/div>/g, "" )
//		.replace ( /Cowboys and Crossovers”\<\/p\>\n\<p\>http:\/\/cowboysandcrossovers.thecomicseries.com\/comics\/\<\/p\>\n\<p\>Drawn/, '[[http://cowboysandcrossovers.thecomicseries.com/comics/|Cowboys and Crossovers]]"\\\\<br>Drawn' )
}

texter += "<br>{cnav}";
sidebar.innerHTML = texter;

selectblock ( sidebar );

// HOTKEYS
var prev = document.querySelector ( ".navi-prev" ),
	next = document.querySelector ( ".navi-next" );
if ( prev != null ) prev.accessKey = "z";
if ( next != null ) next.accessKey = "x";
