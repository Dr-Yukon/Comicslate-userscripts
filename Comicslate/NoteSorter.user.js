// ==UserScript==
// @name			Comicslate NoteSorter
// @version			2020.11.30
// @description		Сортировка наклеек
// @match			http*://*comicslate.org/*do=edit*
// @match			http*://*comicslate.org/*do=draft*
// @exclude			http*://browsershots.org/*
// @icon			https://www.google.com/s2/favicons?domain=comicslate.org
// @author			Rainbow-Spike
// @grant			none
// ==/UserScript==

var wiki_text = document.querySelector ( '#wiki__text' ),
	wtext = wiki_text.textContent,
	math = 1;

if (
	!wtext.match ( 'Не_сортировать' )
	&&
	( wtext.match ( 'cotan' ) != null )
) {
	var cotan = wtext.split ( '{{cotan' );
	for ( var e = 1; e < cotan.length; e++ ) {
		var parts = cotan [ e ].split ( '\n{{<' ),
			end = parts.pop ( ),
			notes = parts [ 0 ].split ( '\n@' ), // разделение и зачистка
			begin = notes.shift ( ),
			num = notes.length - 1,
			centers = [ ],
			borders = [ ],
			new_notes = [ ];
		for ( var i = 0; i <= num; i++ ) { // создание списков
			var nparts = notes [ i ].split ( '\n' ),
				nontext = nparts.shift ( ).split ( ';' ),
				coords = nontext.shift ( ).split ( ',' ),
				coord = '',
				mark = nparts.toString ( ).charAt ( 0 );
			for ( var j = 0; j <= 3; j++ ) { // сложение-вычитание
				if ( coords [ j ].match ( /\+/g ) != null ) {
					coord = coords [ j ].split ( '+' );
					coords [ j ] = coord [ 0 ] * 1 + coord [ 1 ] * 1;
				} else if ( coords [ j ].match ( /\-/g ) != null ) {
					coord = coords [ j ].split ( '-' );
					coords [ j ] = coord [ 0 ] * 1 - coord [ 1 ] * 1;
				};
			};
			if ( math ) notes [ i ] = coords.join ( ',' ) + ( nontext != '' ? ';' + nontext : '' ) + '\n' + nparts.join ( '\n' );
			if ( mark == '#' ) { // для фонов
				var center = [ ];
				center.push ( i ); // изначальный notes-номер
				center.push ( i ); // сортировочный номер
				center.push ( Math.round ( coords [ 1 ] * 1 + coords [ 2 ] / 2 ) ); // центр фона по x
				center.push ( Math.round ( coords [ 0 ] * 1 + coords [ 3 ] / 2 ) ); // центр фона по y
				centers.push ( center );
			} else { // для текстов
				var border = [ ];
				border.push ( i ); // аналогично
				border.push ( ( i + 1 ) * 100 );
				border.push ( coords [ 1 ] * 1 ); // левая граница
				border.push ( coords [ 1 ] * 1 + coords [ 2 ] * 1 ); // правая
				border.push ( coords [ 0 ] * 1 ); // верхняя
				border.push ( coords [ 0 ] * 1 + coords [ 3 ] * 1 ); // нижняя
				borders.push ( border );
			}
		}
		for ( i = 0; i < borders.length; i++ ) { // проверка на вхождение центра фона в область действия текста
			for ( j = 0; j < centers.length; j++ ) {
				if (
					(
						( centers [ j ] [ 2 ] > borders [ i ] [ 2 ] ) // центр фона правее левой границы текста
						&&
						( centers [ j ] [ 2 ] < borders [ i ] [ 3 ] ) // левее правой
					)
					&&
					(
						( centers [ j ] [ 3 ] > borders [ i ] [ 4 ] ) // ниже верхней
						&&
						( centers [ j ] [ 3 ] < borders [ i ] [ 5 ] ) // выше нижней
					)
				) {
					centers [ j ] [ 1 ] = borders [ i ] [ 1 ] - 1; // сортировка фона за текст
					borders [ i ] [ 1 ] = borders [ i ] [ 1 ] + 1; // сдвиг текста
				}
			}
		}
		var end_array = [ ].concat ( centers, borders ); // слияние массивов фонов и текстов, пересортировка по индексам
		end_array.sort (
			function ( a, b ) {
				return a [ 1 ] - b [ 1 ];
			}
		)
		for ( var k = 0; k < end_array.length; k++ ) { // сборка конечного массива
			new_notes [ k ] = notes [ end_array [ k ] [ 0 ] ];
		}
		cotan [ e ] = ( begin + '\n@' + new_notes.join ( '\n@' ) + '\n{{<' + end ).replace ( /~\n\n@/g, '~\n@');
	}
	wiki_text.value = cotan.join ( '{{cotan' );
}
