"use strict";
/* global NameSpace, window */
/**
    @module NameSpace
    @class NameSpaceCollection
    @constructor
    @singleton
*/
//var adr = window;
(function(){
    var adr = (function(){
                if(window !== undefined){
                    return window;
                } else {
                    var r = (function (){ return this; })();
                    return r; }})();
    if (!('__imns' in adr)){
        adr.NameSpaceCollection = function(){
            if(adr.NameSpaceCollection.prototype.singleton !== undefined){ return adr.NameSpaceCollection.prototype.singleton; }
            adr.NameSpaceCollection.prototype.singleton = this;
            this.existing = []; };
        /**
            @method findId
            @class NameSpaceCollection
            @param {String} name
            @return id 0+ or -1 for not found
         */
        adr.NameSpaceCollection.prototype.findId = function(name){
            if(typeof name !== 'string'){ return -1; }
            for(var i=0, imax = this.existing.length; i<imax; i+=1){ if(this.existing[i].name === name){ return i; }}
            return -1; };
        /**
            @method find
            @class NameSpaceCollection
            @param {String} name
            @return {NameSpace instance | null}
         */
        adr.NameSpaceCollection.prototype.find = function(name){
            var f = this.findId(name);
            return (f !== -1) ? this.existing[f] : null; };
        /**
            @method exists
            @class NameSpaceCollection
            @param {String} name
            @return {Boolean}
         */
        adr.NameSpaceCollection.prototype.exists = function(name){ return (this.findId(name) === -1) ? false : true; };
        /**
            @method add
            @class NameSpaceCollection
            @param {NameSpace} ns
            @return {Boolean} if added to master array;
         */
        adr.NameSpaceCollection.prototype.add = function(ns){
            if(ns instanceof NameSpace && this.findId(ns.name) === -1){
                this.existing.push(ns);
                return true; }
            return false; };
        /**
            @module NameSpace
            @class NameSpace
            @param {String} name
            @constructor
         */
        adr.NameSpace = function(name){
            if((new adr.NameSpaceCollection()).exists(name)){ return (new adr.NameSpaceCollection()).find(name); }
            this.name = name;
            (new adr.NameSpaceCollection()).add(this); };
        /**
            @method extend
            @class NameSpace
            @param {Object|String} source
            @requiries NameSpace.__extendString, NameSpace.__extendObject
            @return path
            @description if string creates/returns path, if object creates/merges object and returns path
         */
        adr.NameSpace.prototype.extend = function(source){
            if(typeof source === 'string'){ 
                return this.__extendString(source); 
            } else if(typeof source === 'object'){
                return this.__extendObject(this, source); }
            return this; };
        /**
            @method __extendObject
            @class NameSpace
            @param {Object} destination
            @param {Source} object
            @return path
         */
        adr.NameSpace.prototype.__extendObject = function(destination, source){
            if(typeof source !== 'object'){ return this; }
            var toString = Object.prototype.toString, objTest = toString.call({});
            for(var prop in source){
                if(source[prop] && objTest === toString.call(source[prop])){
                    destination[prop] = destination[prop] || {};
                    this.__extendObject(destination[prop], source[prop]);
                } else { destination[prop] = source[prop]; }}
            return destination; };
        /**
            @method __extendString
            @class NameSpace
            @param {String} namespaceAddress
            @return path
         */
        adr.NameSpace.prototype.__extendString = function(namespaceAddress){
            if(typeof namespaceAddress !== 'string'){ return this; }
            var parts = namespaceAddress.split('.'),
                parent = this;
                parts = (parts[0] === this.name) ? parts.slice(1) : parts;
            for(var i=0, imax = parts.length; i<imax; i+=1){
                var p = parts[i];
                if(parent[p] === undefined){ parent[p] = {}; }
                parent = parent[p]; }
            return parent; };
        /**
            @method __imns
            @global
            @param {String} dest
            @requiries NameSpace
         */
        adr.__imns = function(dest){ return (typeof adr.NameSpace !== 'undefined') ? (new adr.NameSpace('immatureNS')).extend(dest) : adr; };
    }
})();
