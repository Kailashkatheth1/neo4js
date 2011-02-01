/*
 * Copyright (c) 2002-2011 "Neo Technology,"
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
/**
 * @class Interface to the console functionality of the REST server.
 * @extends neo4j.Service
 * @param db
 *            should be a neo4j.GraphDatabase object
 */
neo4j.services.ConsoleService = function(db) {

	neo4j.Service.call(this,db);

};

_.extend(neo4j.services.ConsoleService.prototype, neo4j.Service.prototype);

/**
 * Execute a command
 * 
 * @param cmd
 *            string command to execute.
 * @param engine
 *            engine to use to run script
 * @param callback
 *            will be called with the result
 * @function
 */
neo4j.services.ConsoleService.prototype.exec = neo4j.Service
    .resourceFactory({
        'resource' : 'exec',
        'method' : 'POST',
        'before': function(method, args) {
            method({
            	'command' : args[0],
            	'engine' : args[1]
            	}, args[2]);
        }
    }
);
