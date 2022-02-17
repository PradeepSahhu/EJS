
# EJS
~ejs.co for reference.~
## Modules.
- Node.js.
- body-parser.
- Express Route parameters for multiple routes. 
- EJS.
- Mongoose for db.
- lodash for uniformity.

### Usage
```
let ejs = require('ejs');
let people = ['geddy', 'neil', 'alex'];
let html = ejs.render('<%= people.join(", "); %>', {people: people});

```
### Example
```
let template = ejs.compile(str, options);
template(data);
// => Rendered HTML string

ejs.render(str, data, options);
// => Rendered HTML string

ejs.renderFile(filename, data, options, function(err, str){
    // str => Rendered HTML string
});
```
#### Making a view folder for file.ejs files.
```
app.set("view engine","ejs");
```
#### Making a public folder for other CSS files and images.
```
app.use(express.static("public"));
```

![server](https://user-images.githubusercontent.com/94203408/154043982-07196529-44e3-4b37-8393-c022f73b6ad2.png)


