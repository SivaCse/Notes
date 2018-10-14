## Purpose of NOsql selection

* Ease of scaling
* a document can hold complex hiararchical record within a single document but but row cant in relational database
* developers who came from object oriented languages and familiar with Arrays, objects can easily work


### Mongodb Features

* indexing
* aggregation
* special collection types
	* sessions
	* fixed size collections
* file storage


## fixed size collections


if user is aware about data size to be stored then he/she can create capped collection. it 
will give performance by occupying less space.

following will limit maximum no of records as 3000

```js

db.createCollection("cappedCollectionForCache",{capped:true,size:20000,max:3000})

```

case sensitive
==============
yes it is


Querying Operators
==================

Insert 
-----
```js
db.foo.insert({"bar" : "baz"})
```
Batch Insert
------------
```js
db.foo.batchInsert([{"_id" : 0}, {"_id" : 1}, {"_id" : 2}])
```

Remove
------
```js
db.foo.remove()

db.mailing.list.remove({"opt-out" : true})
```

Find One
--------
```js
db.users.findOne({"name" : "joe"});
```

find
----
```js
find() will return all rows


db.people.find()

```
update
------

```js
db.people.update({"_id" : ObjectId("4b2b9f67a1f631733d917a7c")}, joe)
```

# update value
```js
{
"_id" : ObjectId("4b253b067525f35f94b60a31"),
"url" : "www.example.com",
"pageviews" : 52
}


db.analytics.update({"url" : "www.example.com"},
{"$inc" : {"pageviews" : 1}})
```
# then output would be
```js
{
"_id" : ObjectId("4b253b067525f35f94b60a31"),
"url" : "www.example.com",
"pageviews" : 53
}

```
# Aggregate


## Group by and Calculate a Sum
```js
{ _id: 1, cust_id: "abc1", ord_date: ISODate("2012-11-02T17:04:11.102Z"), status: "A", amount: 50 }
{ _id: 2, cust_id: "xyz1", ord_date: ISODate("2013-10-01T17:04:11.102Z"), status: "A", amount: 100 }
{ _id: 3, cust_id: "xyz1", ord_date: ISODate("2013-10-12T17:04:11.102Z"), status: "D", amount: 25 }
{ _id: 4, cust_id: "xyz1", ord_date: ISODate("2013-10-11T17:04:11.102Z"), status: "D", amount: 125 }
{ _id: 5, cust_id: "abc1", ord_date: ISODate("2013-11-12T17:04:11.102Z"), status: "A", amount: 25 }


db.orders.aggregate([
                     { $match: { status: "A" } },
                     { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
                     { $sort: { total: -1 } }
                   ])

```
# output
```js

{ "_id" : "xyz1", "total" : 100 }
{ "_id" : "abc1", "total" : 75 }

```


# Aggregation Example 2

```js

db.transactions.aggregate([
  { 
    $match: {
      transactionDate: {
        $gte: ISODate("2017-01-01T00:00:00.000Z"),
        $lt: ISODate("2017-01-31T23:59:59.000Z")
      }    
    }
  }, {
    $group: {
      _id: null,
      total: {
        $sum: "$amount"
      },
      average_transaction_amount: {
        $avg: "$amount"
      },
      min_transaction_amount: {
        $min: "$amount"
      },
      max_transaction_amount: {
        $max: "$amount"
      }
    }
  }
]);

```
# Transformations used in aggregation pipeline


* $geoNear: outputs documents in order of nearest to farthest from a specified point

* $match: filters input record set by any given expressions

* $project: creates a resultset with a subset of input fields or computed fields

* $redact: restricts the contents of the documents based on information from the document

* $unwind: takes an array field with n elements from a document and returns n documents with each element added to each document as a field replacing that array

* $group: groups by one or more columns and perform aggregations on other columns

* $limit: picks first n documents from input sets (useful for percentile calculations, etc.)

* $skip: ignores first n documents from input set

* $sort: sorts all input documents as per the object given

* $out: takes all the documents returned from previous stage and writes them to a collection


# Expressions used in aggregation



* $sum	Summates the defined values from all the documents in a collection
* $avg	Calculates the average values from all the documents in a collection
* $min	Return the minimum of all values of documents in a collection
* $max	Return the maximum of all values of documents in a collection
* $addToSet	Inserts values to an array but no duplicates in the resulting document
* $push	Inserts values to an array in the resulting document
* $first	Returns the first document from the source document
* $last	Returns the last document from the source document




# add new property with $set

```js

db.users.update({"_id" : ObjectId("4b253b067525f35f94b60a31")},
... {"$set" : {"favorite book" : "War and Peace"}})
```

# set value to the nested property

```js

db.blog.posts.update({"author.name" : "joe"},
... {"$set" : {"author.name" : "joe schmoe"}})

```


# remove  property with $unset

```js

db.users.update({"name" : "joe"},
... {"$unset" : {"favorite book" : 1}})

```

# Array modifiers

```js

db.blog.posts.findOne()
{
"_id" : ObjectId("4b2d75476cc613d5ee930164"),
"title" : "A blog post",
"content" : "...",
"comments" : [
{
"name" : "joe",
"email" : "joe@example.com",
"content" : "nice post."
}
]
}

```

## here use $push to add another comment
```js
db.blog.posts.update({"title" : "A blog post"},
... {"$push" : {"comments" :
... {"name" : "bob", "email" : "bob@example.com",
... "content" : "good post."}}})

```
# output

```js

"comments" : [
{
"name" : "joe",
"email" : "joe@example.com",
"content" : "nice post."
},
{
"name" : "bob",
"email" : "bob@example.com",
"content" : "good post."
}
]

```

## Prevent duplicates

```js

db.users.findOne({"_id" : ObjectId("4b2d75476cc613d5ee930164")})
{
"_id" : ObjectId("4b2d75476cc613d5ee930164"),
"username" : "joe",
"emails" : [
"joe@example.com",
"joe@gmail.com",
"joe@yahoo.com",
]
}


db.users.update({"_id" : ObjectId("4b2d75476cc613d5ee930164")},
... {"$addToSet" : {"emails" : "joe@hotmail.com"}})

```

# output

```js

db.users.findOne({"_id" : ObjectId("4b2d75476cc613d5ee930164")})
{
"_id" : ObjectId("4b2d75476cc613d5ee930164"),
"username" : "joe",
"emails" : [
"joe@example.com",
"joe@gmail.com",
"joe@yahoo.com",
"joe@hotmail.com"
]
}

```

## prevent duplicates and add multiple values

```js

db.users.update({"_id" : ObjectId("4b2d75476cc613d5ee930164")}, {"$addToSet" :
... {"emails" : {"$each" :
... ["joe@php.net", "joe@example.com", "joe@python.org"]}}})

```

## output

```js

{
"_id" : ObjectId("4b2d75476cc613d5ee930164"),
"username" : "joe",
"emails" : [
"joe@example.com",
"joe@gmail.com",
"joe@yahoo.com",
"joe@hotmail.com"
"joe@php.net"
"joe@python.org"]
}

```

## Removing Elements

```js

db.lists.insert({"todo" : ["dishes", "laundry", "dry cleaning"]})

db.lists.update({}, {"$pull" : {"todo" : "laundry"}})

```

# output

```js

db.lists.find()
{
"_id" : ObjectId("4b2d75476cc613d5ee930164"),
"todo" : [
"dishes",
"dry cleaning"
]
}

```

Note : $pull will remove all matching elements for example [1, 1, 2, 1] if pull 1 means remaining is 2 only.


# distinct

```js

{ "_id": 1, "dept": "A", "item": { "sku": "111", "color": "red" }, "sizes": [ "S", "M" ] }
{ "_id": 2, "dept": "A", "item": { "sku": "111", "color": "blue" }, "sizes": [ "M", "L" ] }
{ "_id": 3, "dept": "B", "item": { "sku": "222", "color": "blue" }, "sizes": "S" }
{ "_id": 4, "dept": "A", "item": { "sku": "333", "color": "black" }, "sizes": [ "S" ] }


db.inventory.distinct( "dept" )

```

# output

```js

{ "_id": 1, "dept": "A", "item": { "sku": "111", "color": "red" }, "sizes": [ "S", "M" ] }
{ "_id": 3, "dept": "B", "item": { "sku": "222", "color": "blue" }, "sizes": "S" }

```

Positional array modifiers
--------------------------
```js
...
"comments" : [
{
"comment" : "good post",
"author" : "John",
"votes" : 0
},
{
"comment" : "i thought it was too short",
"author" : "Claire",
"votes" : 3
},
{
"comment" : "free watches",
"author" : "Alice",
"votes" : -1
}
]

```

If we want to increment the number of votes for the first comment, we can say the
following:

```js

> db.blog.update({"post" : post_id},
... {"$inc" : {"comments.0.votes" : 1}})

```

if we dont know the index use $ operator

```js

db.blog.update({"comments.author" : "John"},
... {"$set" : {"comments.$.author" : "Jim"}})

```

findAndModify Example

```js

ps = db.runCommand({"findAndModify" : "processes",
... "query" : {"status" : "READY"},
... "sort" : {"priority" : -1},
... "update" : {"$set" : {"status" : "RUNNING"}})

```

### we can also remove a field  using this,

```js
db.runCommand({"findAndModify" : "processes",
"query" : {"status" : "READY"},
"sort" : {"priority" : -1},
"remove" : true}).value

```

## specifies keys to return in find

```js

db.users.find({}, {"username" : 1, "email" : 1})

```


## prevent id from beign return

```js

db.users.find({}, {"username" : 1, "_id" : 0})

```

## conditonal querying example

```js

db.users.find({}, {"username" : 1, "_id" : 0})


> start = new Date("01/01/2007")
> db.users.find({"registered" : {"$lt" : start}})

db.raffle.find({"ticket_no" : {"$in" : [725, 542, 390]}})

db.raffle.find({"ticket_no" : {"$nin" : [725, 542, 390]}})

db.raffle.find({"$or" : [{"ticket_no" : 725}, {"winner" : true}]})


$or can contain nested conditions

db.raffle.find({"$or" : [{"ticket_no" : {"$in" : [725, 542, 390]}},
{"winner" : true}]})

db.users.find({"id_num" : {"$mod" : [5, 1]}})

db.users.find({"id_num" : {"$not" : {"$mod" : [5, 1]}}})

```

## type specific queries

```js

db.c.find({"y" : null})

```

## Regular Expressions

```js

db.users.find({"name" : /joey?/i})

```

## Querying Arrays

```js

db.food.insert({"fruit" : ["apple", "banana", "peach"]})

db.food.find({"fruit" : "banana"})


```


## find all rows contain both using $all

```js

db.food.find({fruit : {$all : ["apple", "banana"]}})

```
## query value with given size $size

```js

db.food.find({"fruit" : {"$size" : 3}})

```

## $slice

```js

db.blog.posts.findOne(criteria, {"comments" : {"$slice" : 10}})

we can use below for last ten comments

db.blog.posts.findOne(criteria, {"comments" : {"$slice" : -10}})

```


## following will be very useful for pagination

```js 
db.blog.posts.findOne(criteria, {"comments" : {"$slice" : [23, 10]}})

```
## Querying on Embedded docs
```js

db.people.find({"name.first" : "Joe", "name.last" : "Schmoe"})

```
## sort using sot()

```js

db.c.find().sort({username : 1, age : -1})

```

## index 

```js
db.users.ensureIndex({"username" : 1})
```

## compund index

```js

db.users.find().sort({"age" : 1, "username" : 1})

```

## indexing object
```js

db.users.ensureIndex({"loc.city" : 1})

```

## indexing specific Array

```js

db.blog.ensureIndex({"comments.10.votes": 1}) 

```


## unique index

```js

db.users.ensureIndex({"username" : 1}, {"unique" : true})

```


## removing or dropping duplicates names by index

```js

db.people.ensureIndex({"username" : 1}, {"unique" : true, "dropDups" : true})

```


## select not in list

```js

db.inventory.find( { qty: { $nin: [ 5, 15 ] } } )

```

This query will select all documents in the inventory collection where the qty field value does not equal 5 nor 15. The selected documents will include those documents that do not contain the qty field.


## $nor

```js

db.inventory.find( { $nor: [ { price: 1.99 }, { sale: true } ]  } )

```

This query will return all documents that:

contain the price field whose value is not equal to 1.99 and contain the sale field whose value is not equal to true or
contain the price field whose value is not equal to 1.99 but do not contain the sale field or
do not contain the price field but contain the sale field whose value is not equal to true or
do not contain the price field and do not contain the sale field
$nor and Additional Comparisons


## $exists

```js

db.inventory.find( { qty: { $exists: true, $nin: [ 5, 15 ] } } )

```

This query will select all documents in the inventory collection where the qty field exists and its value does not equal 5 or 15.


## $type

```js

db.grades.insertMany(
   [
      { "_id" : 1, name : "Alice King" , classAverage : 87.333333333333333 },
      { "_id" : 2, name : "Bob Jenkins", classAverage : "83.52" },
      { "_id" : 3, name : "Cathy Hart", classAverage: "94.06" },
      { "_id" : 4, name : "Drew Williams" , classAverage : 93 }
   ]
)


db.grades.find( { "classAverage" : { $type : [ "string" , "double" ] } } );

```

## output

```js
{ "_id" : 1, name : "Alice King" , classAverage : 87.333333333333333 }
{ "_id" : 2, name : "Bob Jenkins", classAverage : "83.52" }
{ "_id" : 3, name : "Cathy Hart", classAverage: "94.06" }
```


## Application design


Two kinds of design

1 Embedding
	* best for small documents
	* best for data changing less often
	* best for where need fast reads
2 Reference
	* best for large documents
	* best for where need fast writes

## Queries and What They Match

### Queries

- `{a: 10}` - Docs where a is 10, or an array containing the value 10.
- `{a: 10, b: "hello"}` -  Docs where a is 10 and b is "hello".
- `{a: {$gt: 10}}` -  Docs where a is greater than 10. Also available: `$lt (<), $gte (>=), $lte (<=), and $ne (!=)`
- `{a: {$in: [10, "hello"]}}` -  Docs where a is either 10 or "hello". 
- `{a: {$all: [10, "hello"]}}` -  Docs where a is an array containing both 10 and "hello".
- `{"a.b": 10}` -  Docs where a is an embedded document with b equal to 10.
- `{a: {$elemMatch: {b: 1, c: 2}}}` -  Docs where a is an array that contains an element with both b equal to 1 and c equal to 2. 
- `{$or: [{a: 1}, {b: 2}]}` -  Docs where a is 1 or b is 2.
- `{a: /^m/}` -  Docs where a begins with the letter m.
- `{a: {$mod: [10, 1]}}` -  Docs where a mod 10 is 1.
- `{a: {$type: 2}}` -  Docs where a is a string (see bsonspec.org for more)

The following queries cannot use indexes as of MongoDB v2.0. These query forms should normally be 
accompanied by at least one other query term which does use an index:

- `{a: {$nin: [10, "hello"]}}` -  Docs where a is anything but 10 or "hello".
- `{a: {$size: 3}}` -  Docs where a is an array with exactly 3 elements.
- `{a: {$exists: true}}` -  Docs containing an a field.
- `{a: /foo.*bar/}` -  Docs where a matches the regular expression foo.*bar.
- `{a: {$not: {$type: 2}}}` -  Docs where a is not a string. $not negates any of the 
other query operators.

## Update Modifiers

- `{$inc: {a: 2}}` -  Increment a by 2.
- `{$set: {a: 5}}` -  Set a to the value 5.
- `{$unset: {a: 1}}` -  Delete the a key.
- `{$push: {a: 1}}` -  Append the value 1 to the array a.
- `{$push: {a: {$each: [1, 2]}}}` -  Append both 1 and 2 to the array a.
- `{$addToSet: {a: 1}}` -  Append the value 1 to the array a (if the value doesn’t already exist).
- `{$addToSet: {a: {$each: [1, 2]}}}` -  Append both 1 and 2 to the array a (if they don’t already exist).
- `{$pop: {a: 1}}` -  Remove the last element from the array a.
- `{$pop: {a: -1}}` -  Remove the first element from the array a.
- `{$pull: {a: 5}}` -  Remove all occurrences of 5 from the array a.
- `{$pullAll: {a: [5, 6]}}` -  Remove all occurrences of 5 or 6 from the array a

