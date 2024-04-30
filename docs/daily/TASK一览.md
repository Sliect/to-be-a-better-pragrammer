## TASK

``` dataview
TASK FROM "docs/daily" 
WHERE 
	file.name != "template" 
	AND !completed
SORT file.name ASC
```

