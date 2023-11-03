This is a chrome extension that logs all the actions of the page, you can run `npm run build` to try.

### record sample
```json
{
   "1698996430475-click":{
      "content":"All",
      "xPath":"/html[1]/body[1]/section[1]/footer[1]/ul[1]/li[1]/a[1]"
   },
   "1698996432142-click":{
      "content":"Active",
      "xPath":"/html[1]/body[1]/section[1]/footer[1]/ul[1]/li[2]/a[1]"
   },
   "1698996432960-click":{
      "content":"Completed",
      "xPath":"/html[1]/body[1]/section[1]/footer[1]/ul[1]/li[3]/a[1]"
   },
   "1698996446594-type":{
      "value":"nihao",
      "xPath":"/html[1]/body[1]/section[1]/header[1]/input[1]"
   }
}
```

### Features
Listen: Switch listening mode   
Export: Export data as a json file   
Clear: Clear listened data   

### Todo:
- [ ] Support for more page operations
- [ ] Optimize the popup page
- [ ] Support for turning operations into cypress cases
