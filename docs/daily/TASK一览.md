## TASK

``` dataview
TASK FROM "daily" WHERE file.name != "template" AND !completed
SORT file.name ASC
```