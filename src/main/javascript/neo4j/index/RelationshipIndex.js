/*
 * Copyright (c) 2002-2011 "Neo Technology,"
 * Network Engine for Objects in Lund AB [http://neotechnology.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * A relationship index.
 * 
 * @param db Should be a GraphDatabase instance.
 * @param name Should be the index name
 */
neo4j.index.RelationshipIndex = function(db, name)
{

    neo4j.index.Index.call(this, db, name);

};

_.extend(neo4j.index.RelationshipIndex.prototype, neo4j.index.Index.prototype, {

    getType : function() {
        return "relationship_index";
    },
    
    getUriFor : function(itemPromise) {
        var db = this.db;
        return itemPromise.then(function(item, fulfill) {
            db.relUri(item).then(fulfill);  
        });
    },
    
    getObjectFor : function(unknownPromise) {
        var db = this.db;
        return unknownPromise.then(function(unknown, fulfill) {
            if(typeof(unknown.getSelf) != "undefined") {
                fulfill(unknown);
            } else {
                db.rel(unknown).then(function(rel) {
                   fulfill(rel); 
                });
            }  
        });
    },
    
    createObjectFromDefinition : function(def) {
        return new neo4j.models.Relationship(def, this.db);
    }


});
