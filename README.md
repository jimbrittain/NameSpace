# NameSpace
Javascript Classes to create Namespace functionality and minimize global pollution.
## Usage
### NameSpaceCollection
Creates a singleton instance of the NameSpaceCollection which manages any all namespaces.
#### Methods
##### NameSpaceCollection.findId(name)
Method to find the Id reference for the namespace within NameSpaceCollection's existing namespaces, returns id 0> or -1 for not found
```
    var a = new window.NameSpaceCollection();
    a.add('immatureNS');
    a.findId('immatureNS') === 0;
```
##### NameSpaceCollection.find(name)
Method to find the NameSpace's object within NameSpaceCollection's existing namespaces, returns NameSpace Instance or null;
```
    var a = new window.NameSpaceCollection();
    a.add('immatureNS');
    a.find('cheese') === null;
```
### __imns
Uses the immatureNS namespace, a simplified single variable function call for framework creation;
```
    var dv = __imns('application.vars');
    dv.PHI = (1 + Math.sqrt(5))/2;
    console.log(dv.PHI) = 1.161803...
```
Within the immatureNS creates the util.classes object or returns it if already exists so that primitives, classes or functions can be attached for cleaner code organisation.
## Methodology
## Issues

* Still pollutes global namespace with NameSpace, NameSpaceCollection and __imns classes/functions, this could be further reduced
* Does not allow for mixing with ES6 namespacing/importing
* Needs full browser checks
