/* [nodename, id, name, navigationtext, href, isnavigation, childs[], templatename] */

function jdecode(s) {
    s = s.replace(/\+/g, "%20")
    return unescape(s);
}

var POS_NODENAME=0;
var POS_ID=1;
var POS_NAME=2;
var POS_NAVIGATIONTEXT=3;
var POS_HREF=4;
var POS_ISNAVIGATION=5;
var POS_CHILDS=6;
var POS_TEMPLATENAME=7;
var theSitetree=[ 
    ['PAGE','4436',jdecode('About+Us'),jdecode(''),'/4436.html','true',[],''],
    ['PAGE','47888',jdecode('The+Arts'),jdecode(''),'/47888.html','true',[],''],
    ['PAGE','47524',jdecode('Granola'),jdecode(''),'/47524.html','true',[],''],
    ['PAGE','4777',jdecode('Menu'),jdecode(''),'/4777.html','true',[],''],
    ['PAGE','47462',jdecode('Catering'),jdecode(''),'/47462.html','true',[],''],
    ['PAGE','47919',jdecode('Buy+Krista%26%23x27%3Bs+CD%21'),jdecode(''),'/47919.html','true',[],''],
    ['PAGE','47493',jdecode('Order+Info'),jdecode(''),'/47493.html','true',[],''],
    ['PAGE','47555',jdecode('Contact+Us'),jdecode(''),'/47555.html','true',[],'']];
var siteelementCount=8;
theSitetree.topTemplateName='Eatdrink';

theSitetree.getById = function(id, ar) {												
    if (typeof(ar) == 'undefined')                              
	ar = this;                                              
    for (var i=0; i < ar.length; i++) {                         
	if (ar[i][POS_ID] == id)                                
	    return ar[i];                                       
	if (ar[i][POS_CHILDS].length > 0) {                     
	    var result=this.getById(id, ar[i][POS_CHILDS]);     
	    if (result != null)                                 
		return result;                                  
	}									                    
    }                                                           
    return null;                                                
};                                                                

theSitetree.getParentById = function(id, ar) {											
    if (typeof(ar) == 'undefined')                              	
	ar = this;                                             		
    for (var i=0; i < ar.length; i++) {                        		
	for (var j = 0; j < ar[i][POS_CHILDS].length; j++) {   		
	    if (ar[i][POS_CHILDS][j][POS_ID] == id) {          		
		// child found                                 		
		return ar[i];                                  		
	    }                                                  		
	    var result=this.getParentById(id, ar[i][POS_CHILDS]);   
	    if (result != null)                                 	
		return result;                                  	
	}                                                       	
    }                                                           	
    return null;                                                	
}								                                    

theSitetree.getName = function(id) {                                                    
    var elem = this.getById(id);                                    
    if (elem != null)                                               
	return elem[POS_NAME];                                      
    return null;	                                                
};			                                                    
theSitetree.getNavigationText = function(id) {                                          
    var elem = this.getById(id);                                    
    if (elem != null)                                               
	return elem[POS_NAVIGATIONTEXT];                            
    return null;	                                                
};			                                                    

theSitetree.getHREF = function(id) {                                                    
    var elem = this.getById(id);                                    
    if (elem != null)                                               
	return elem[POS_HREF];                                      
    return null;	                                                
};			                                                    

theSitetree.getIsNavigation = function(id) {                                            
    var elem = this.getById(id);                                    
    if (elem != null)                                               
	return elem[POS_ISNAVIGATION];                              
    return null;	                                                
};			                                                    

theSitetree.getTemplateName = function(id, lastTemplateName, ar) {             		 
    
    if (typeof(lastTemplateName) == 'undefined')                                     
	lastTemplateName = this.topTemplateName;	                                 
    if (typeof(ar) == 'undefined')                                                   
	ar = this;                                                                   
    
    for (var i=0; i < ar.length; i++) {                                              
	var actTemplateName = ar[i][POS_TEMPLATENAME];                               
	
	if (actTemplateName == '')                                                   
	    actTemplateName = lastTemplateName;		                                 
	
	if (ar[i][POS_ID] == id) {                                			         
	    return actTemplateName;                                                  
	}	                                                                         
	
	if (ar[i][POS_CHILDS].length > 0) {                                          
	    var result=this.getTemplateName(id, actTemplateName, ar[i][POS_CHILDS]); 
	    if (result != null)                                                      
		return result;                                                       
	}									                                         
    }                                                                                
    return null;                                                                     
};                                                                               
/* EOF */					                                                            
