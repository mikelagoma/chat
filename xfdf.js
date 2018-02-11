var xfdf = require('xfdf')

var builder = new xfdf({ pdf: 'Document.pdf' });

builder.addField('firstname', 'John');

console.log(builder.generate());
