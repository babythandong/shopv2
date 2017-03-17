phx-pagination
=================

> ExpressJS + Mongoose ORM (ExpressJS/NodeJS/MongoDB) Document Query Pagination

## Install

```sh
$ npm install phx-pagination
```

## Usage 

```javascript

/**
 * basic example usage of `phx-pagination`
 **/
require('phx-pagination').init(app);

/** 
 * Action wich display a country list page
 */	
app.get('/', function (req, res) {
   var page = req.param('page') || 1;
   Country.paginate({limit: 15, page: page}, function (error, countries) {
     if (error) {
        console.error(error);
     } else {
        res.render('countries/index', { title: 'Country List', countries: countries });		
     }
   });
});

```

```html

<div id="main">
   <% countries.forEach(function (country) { %>
      <div class="span-two-thirds">
           country: <%= country.name %> 
      </div>
      <div class="span-one-third">
	<a href="/show/<%= country.id %>">Show</a>
	<a href="/delete/<%= country.id %>" onclick="return confirm('Are you sure you want to delete?')">Delete</a>
      </div>
    <% }); %>
    <%- paginate(countries) %>
</div>

```

## License
(The MIT License)

Copyright (c) 2012 [Physalix](http://www.physalix.com) < [fs@physalix.com](mailto:fs@physalix.com) > 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

