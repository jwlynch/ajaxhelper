/*
 * yui-ext 0.33
 * Copyright(c) 2006, Jack Slocum.
 */


YAHOO.ext.grid.DefaultDataModel=function(data){YAHOO.ext.grid.DefaultDataModel.superclass.constructor.call(this);this.data=data;};YAHOO.extendX(YAHOO.ext.grid.DefaultDataModel,YAHOO.ext.grid.AbstractDataModel,{getRowCount:function(){return this.data.length;},getRowId:function(rowIndex){return this.data[rowIndex][0];},getRow:function(rowIndex){return this.data[rowIndex];},getRows:function(indexes){var data=this.data;var r=[];for(var i=0;i<indexes.length;i++){r.push(data[indexes[i]]);}
return r;},getValueAt:function(rowIndex,colIndex){return this.data[rowIndex][colIndex];},setValueAt:function(value,rowIndex,colIndex){this.data[rowIndex][colIndex]=value;this.fireCellUpdated(rowIndex,colIndex);},removeRows:function(startIndex,endIndex){endIndex=endIndex||startIndex;this.data.splice(startIndex,endIndex-startIndex+1);this.fireRowsDeleted(startIndex,endIndex);},removeRow:function(index){this.data.splice(index,1);this.fireRowsDeleted(index,index);},removeAll:function(){var count=this.getRowCount();if(count>0){this.removeRows(0,count-1);}},query:function(spec,returnUnmatched){var d=this.data;var r=[];for(var i=0;i<d.length;i++){var row=d[i];var isMatch=true;for(var col in spec){if(!isMatch)continue;var filter=spec[col];switch(typeof filter){case'string':case'number':case'boolean':if(row[col]!=filter){isMatch=false;}
break;case'function':if(!filter(row[col],row)){isMatch=false;}
break;case'object':if(filter instanceof RegExp){if(String(row[col]).search(filter)===-1){isMatch=false;}}
break;}}
if(isMatch&&!returnUnmatched){r.push(i);}else if(!isMatch&&returnUnmatched){r.push(i);}}
return r;},filter:function(query){var matches=this.query(query,true);var data=this.data;for(var i=0;i<matches.length;i++){data[matches[i]]._deleted=true;}
for(var i=0;i<data.length;i++){while(data[i]&&data[i]._deleted===true){this.removeRow(i);}}
return matches.length;},addRow:function(cellValues){this.data.push(cellValues);var newIndex=this.data.length-1;this.fireRowsInserted(newIndex,newIndex);this.applySort();return newIndex;},addRows:function(rowData){this.data=this.data.concat(rowData);var firstIndex=this.data.length-rowData.length;this.fireRowsInserted(firstIndex,firstIndex+rowData.length-1);this.applySort();},insertRow:function(index,cellValues){this.data.splice(index,0,cellValues);this.fireRowsInserted(index,index);this.applySort();return index;},insertRows:function(index,rowData){var args=rowData.concat();args.splice(0,0,index,0);this.data.splice.apply(this.data,args);this.fireRowsInserted(index,index+rowData.length-1);this.applySort();},applySort:function(suppressEvent){if(typeof this.sortColumn!='undefined'){this.sort(this.sortInfo,this.sortColumn,this.sortDir,suppressEvent);}},setDefaultSort:function(sortInfo,columnIndex,direction){this.sortInfo=sortInfo;this.sortColumn=columnIndex;this.sortDir=direction;},sort:function(sortInfo,columnIndex,direction,suppressEvent){this.sortInfo=sortInfo;this.sortColumn=columnIndex;this.sortDir=direction;var dsc=(direction&&direction.toUpperCase()=='DESC');var sortType=null;if(sortInfo!=null){if(typeof sortInfo=='function'){sortType=sortInfo;}else if(typeof sortInfo=='object'){sortType=sortInfo.getSortType(columnIndex);;}}
var fn=function(cells,cells2){var v1=sortType?sortType(cells[columnIndex],cells):cells[columnIndex];var v2=sortType?sortType(cells2[columnIndex],cells2):cells2[columnIndex];if(v1<v2)
return dsc?+1:-1;if(v1>v2)
return dsc?-1:+1;return 0;};this.data.sort(fn);if(!suppressEvent){this.fireRowsSorted(columnIndex,direction);}},each:function(fn,scope){var d=this.data;for(var i=0,len=d.length;i<len;i++){if(fn.call(scope||window,d[i],i)===false)break;}}});if(YAHOO.ext.grid.DefaultColumnModel){YAHOO.ext.grid.DefaultDataModel.sortTypes=YAHOO.ext.grid.DefaultColumnModel.sortTypes;}