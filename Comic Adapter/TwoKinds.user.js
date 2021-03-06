// ==UserScript==
// @name			Comic Adapter: TwoKinds
// @version			2021.04.08
// @description		Extract Info for Comicslate
// @include			http*://*twokinds.keenspot.com*
// @icon			https://www.google.com/s2/favicons?domain=twokinds.keenspot.com
// @author			Rainbow-Spike
// @grant			none
// ==/UserScript==

var titler1 = parseInt ( document.querySelector ( 'meta[name*="title"]' ).getAttribute('content').split ( ': ' )[0] ),
	titler2 = document.querySelector ( "h1" ).innerHTML.split ( ': ' )[1],
	trans = document.querySelector ( ".transcript-content" ),
	trans_p = trans.querySelectorAll ( "p" ),
	last_p = trans_p[trans_p.length-1],
	texter = '';

// SELECT
function selectblock ( name ) {
	var rng = document.createRange ( );
	rng.selectNode ( name );
	var sel = window.getSelection ( );
	sel.removeAllRanges ( );
	sel.addRange ( rng );
}

if ( titler1 < 1000 ) titler1 = "0" + titler1;
texter += "== Twokinds " + titler1 + " ==<br>**" + titler2 + "**<br><br>{cnav}<br>{{" + titler1 + ".png}}<br>";

// ТРАНСКРИПТ
if ( trans != null ) {
	if ( last_p.innerHTML.match ( "Page transcript provided" ).length != 0 ) trans.removeChild ( last_p );
	texter += "&lt;!--<br>" + trans.innerHTML
		.replace ( /<p>/g, '' )
		.replace ( /<\/p>/g, '<br>' )
/*		.replace ( /<em>([^<]+)<\/em>/g, "//$1//" )
		.replace ( /<strong>([^<]+)<\/strong>/g, "**$1**" )
		.replace ( /<em>([^<]+)<\/em>/g, "//$1//" ) */
		+ "--&gt;<br>";
}

texter += "{cnav}";
trans.innerHTML = texter;

selectblock ( trans );
