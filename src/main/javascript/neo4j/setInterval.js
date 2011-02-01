/*
 * Copyright (c) 2002-2010 "Neo Technology,"
 * Network Engine for Objects in Lund AB [http://neotechnology.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

_.extend(neo4j, {

	/**
	 * This checks if there is there is a setInterval method available, delegates
	 * to that if possible, or provides its own implementation otherwise. 
	 */
	setInterval : function( expression, interval ) {
		if(typeof(setInterval) != "undefined") {
			return setInterval(expression, interval);
		} else if(typeof(setTimeout) != "undefined") {
			var id = (new Date()).getTime();
			
			function intervalCallback() {
				expression();
				neo4j._intervals[id] = setTimeout(intervalCallback, interval);
			}
			
			neo4j._intervals[id] = setTimeout(intervalCallback, interval);
			return id;
		} else {
			neo4j.log("No timeout or interval implementation found, unable to do timed tasks.");
		}
	},
	
	clearInterval : function(intervalId) {
		if(typeof(clearInterval) != "undefined") {
			clearInterval(intervalId);
		} else if (typeof(clearTimeout) != "undefined") {
			clearTimeout(neo4j._intervals[intervalId]);
		} else {
			neo4j.log("No timeout or interval implementation found, unable to do timed tasks.");
		}
	},
	
	_intervals : {}
});
