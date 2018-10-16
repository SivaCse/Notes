# mongodb notes

## Create Database

use study // here study is the database

then it will switch current reference into db

i.e access

db.study......

## Create Collection

//here student is the table name.

db.createCollection('student')

## Save Record

```js
> db.student.insert({name:"Sekar",age:33,hobbies:['sleep','eat']})
WriteResult({ "nInserted" : 1 })
>
```

## Query database

### find()

```js
> db.student.find()
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar", "age" : 33, "hobbies" : [ "sleep", "eat" ] }
>

> db.student.find({name:"Sekar"})
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar", "age" : 33, "hobbies" : [ "sleep", "eat" ] }
>

> db.student.find({name:/Se/})
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar", "age" : 33, "hobbies" : [ "sleep", "eat" ] }
>

> db.student.find({hobbies:["a","b"]})
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar", "hobbies" : ["a", "b" ] }
>

> db.student.find({hobbies:"a"})
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar", "hobbies" : ["a", "b" ] }
{ "_id" : ObjectId("5bbb5d4d35f231e33b3c17fa"), "name" : "Siva", "hobbies" : [ "a", "b", "c" ] }
>
```

## find with in

```js
> db.student.find({hobbies:{$in:["a","c"]}})
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar", "hobbies" : [
"a", "b" ] }
{ "_id" : ObjectId("5bbb5d4d35f231e33b3c17fa"), "name" : "Siva", "hobbies" : [ "a", "b", "c" ] }
>
```

## find not in

```js
> db.student.find({hobbies:{$nin:["c"]}})
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar", "hobbies" : ["a", "b" ] }
>
```

## find nested property

```js
> db.student.find({"products.cook.rice":"Basmati"})
{ "_id" : ObjectId("5bbb6b5a35f231e33b3c17fb"), "name" : "Pradeep", "products" :
 { "cook" : { "rice" : "Basmati" }, "bath" : { "soap" : "liril" } } }
>
```

## projection Ex Select name from student

```js
> db.student.find({},{name:1})
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar" }
>

> db.student.find({},{name:1,_id:0})
{ "name" : "Sekar" }
>
```

## Sort()

```js
> db.student.find().sort({age:-1})
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar", "age" : 33, "hobbies" : [ "sleep", "eat" ] }
{ "_id" : ObjectId("5bbb3a4a35f231e33b3c17f2"), "name" : "Sameer", "age" : 31, "hobbies" : [ "sleep", "eat" ] }
{ "_id" : ObjectId("5bbb3a4f35f231e33b3c17f3"), "name" : "Sameer", "age" : 30, "hobbies" : [ "sleep", "eat" ] }


> db.student.find().sort({age:1})
{ "_id" : ObjectId("5bbb3a4f35f231e33b3c17f3"), "name" : "Sameer", "age" : 30, "
hobbies" : [ "sleep", "eat" ] }
{ "_id" : ObjectId("5bbb3a4a35f231e33b3c17f2"), "name" : "Sameer", "age" : 31, "
hobbies" : [ "sleep", "eat" ] }
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar", "age" : 33, "hobbies" : [ "sleep", "eat" ] }
>
```

## limit()

```js
> db.student.find().sort({age:1}).limit(2)
{ "_id" : ObjectId("5bbb3a4f35f231e33b3c17f3"), "name" : "Sameer", "age" : 30, "
hobbies" : [ "sleep", "eat" ] }
{ "_id" : ObjectId("5bbb3a4a35f231e33b3c17f2"), "name" : "Sameer", "age" : 31, "
hobbies" : [ "sleep", "eat" ] }
>
```

## skip() // used for pagination

```js
> db.student.find().sort({age:1}).skip(2).limit(1)
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar", "age" : 33, "h
obbies" : [ "sleep", "eat" ] }
>
```

## Insert multiple Records

```js
> db.student.insertMany([{name:"A"},{name:"B"},{name:"C"}])

## Sample nested record

>
> db.student.insert({name:"Pradeep",products:{cook:{rice:"Basmati"},bath:{soap:"liril"}}})
```

## update if match found and create if not exist - upsert

```js
> db.student.replaceOne({name:"Ajai dev"},{name:"Ajai dev",age:21},{upsert:true}
)

> db.student.replaceOne({name:"Ajai"},{name:"Ajai",age:21},{upsert:true})


db.study.update({_id:"5bbcb4bce596bc1c28c2bc8a"},{$set:{age:30}},{upsert:true}
)
WriteResult({
        "nMatched" : 0,
        "nUpserted" : 1,
        "nModified" : 0,
        "_id" : "5bbcb4bce596bc1c28c2bc8a"
})
>
```

## Update Record

```js
> db.student.update({"name":"B"},{$set:{"name":"B- updated"}})
```

## Update multiple Records

```js
> db.student.updateMany({name:"Updated Test"},{$set:{name:"Updated"}})

> db.student.updateMany({age:{$gt:1}},{$set:{name:"Updated Test"}})
```

## push array item using $push

```js
> db.student.update({name:"Sekar"},{"$push":{"hobbies":"d"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.student.find()
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar", "hobbies" : [
"a", "b", "d" ] }
{ "_id" : ObjectId("5bbb5d4d35f231e33b3c17fa"), "name" : "Siva", "hobbies" : [ "
a", "b", "c" ] }
>
```

## increment by $inc

```js
> db.study.update({_id:"5bbcb4bce596bc1c28c2bc8a"},{$inc:{age:1}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
>
```

## Replace One

```js
> db.student.replaceOne({name:"Updated"},{name:"Updated Test"})
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
>
```

## Remove Record

```js
> db.student.remove({name:"A"})
```

## Remove property / column

```js
> db.student.update({name:"Sekar"},{"$unset":{"hobbies":1}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.student.find()
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar" }
{ "_id" : ObjectId("5bbb5d4d35f231e33b3c17fa"), "name" : "Siva", "hobbies" : [ "a", "b", "c" ] }
>
```

## Remove last array item from property

```js
> db.student.update({name:"Siva"},{"$pop":{"hobbies":1}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.student.find()
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar" }
{ "_id" : ObjectId("5bbb5d4d35f231e33b3c17fa"), "name" : "Siva", "hobbies" : [ "a", "b" ] }
> db.student.update({name:"Siva"},{"$pop":{"hobbies":1}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
>
> db.student.find()
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar" }
{ "_id" : ObjectId("5bbb5d4d35f231e33b3c17fa"), "name" : "Siva", "hobbies" : [ "a" ] }
>
```

## Delete All

```js
> db.student.remove({})
WriteResult({ "nRemoved" : 7 })
>
```

## drop table/collection

```js
> db.student.drop()
true
>
```

## get collection names

```js
> db.getCollectionNames()
[ ]
> db.createCollection('student')
{ "ok" : 1 }
> db.getCollectionNames()
[ "student" ]
>
```

## Show list Database

```js
> show dbs
admin    0.000GB
config   0.000GB
local    0.000GB
sekar    0.000GB
sekardb  0.000GB
study    0.000GB
>
```

## distinct

```js
> db.student.insertMany([{name:"Siva"},{name:"Sekar"},{name:"Siva"}])
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("5bbb71de35f231e33b3c17fc"),
                ObjectId("5bbb71de35f231e33b3c17fd"),
                ObjectId("5bbb71de35f231e33b3c17fe")
        ]
}
>

> db.student.distinct("name")
[ "Siva", "Sekar" ]
>
```

## Regular Expression based find

```js
> db.student.find()
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fc"), "name" : "Siva" }
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fd"), "name" : "Sekar" }
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fe"), "name" : "Siva" }

> db.student.find({name:/Si/})

{ "_id" : ObjectId("5bbb71de35f231e33b3c17fc"), "name" : "Siva" }
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fe"), "name" : "Siva" }
>
```

## fetch Reg Exp by end value matching

```js
> db.student.find({name:/va$/})
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fc"), "name" : "Siva" }
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fe"), "name" : "Siva" }
>

> db.student.find({name:/[^Se][r$]/gi})
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fd"), "name" : "Sekar" }

> db.student.find({name:/[^Se][va$]/gi})

{ "_id" : ObjectId("5bbb71de35f231e33b3c17fc"), "name" : "Siva" }
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fd"), "name" : "Sekar" }
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fe"), "name" : "Siva" }
>

> db.student.find({name:/[^Seven][va$]/gi})
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fc"), "name" : "Siva" }
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fd"), "name" : "Sekar" }
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fe"), "name" : "Siva" }
>
```

## prevent duplicate array item insertion by $addToSet

```js
> db.study.update(
   { _id: 1 },
   { $addToSet: { tags: { $each: [ "camera", "electronics", "accessories" ] } } }
 )
>

//previously tags array conatins tags: [ "electronics", "supplies" ]

modified is  "tags" : [ "electronics", "supplies", "camera", "
accessories" ] }
>
```

## remove specific item from array conditionally

```js
> db.student.findOne({name:"Siva"})
{
        "_id" : ObjectId("5bbb71de35f231e33b3c17fc"),
        "name" : "Siva",
        "emails" : [
                "a@a.com",
                "b@b.com"
        ]
}
> db.student.update({_id:"5bbb71de35f231e33b3c17fc"},{"$pull":{"emails":"b@b.com"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 0 })
> db.student.findOne({name:"Siva"})
{
        "_id" : ObjectId("5bbb71de35f231e33b3c17fc"),
        "name" : "Siva",
        "emails" : [
                "a@a.com"
                ]
}
>
```

## Positional array modifiers

```js
> db.study.find()
{ "_id" : 1, "name" : "Siva", "comments" : [ { "title" : "title 1", "body" : "body 1" }, { "title" : "title 2", "body" : "body 2" }, { "title" : "title 3", "body" : "body 3" } ] }
> db.study.update({_id:1},{$set:{"comments.1.body": "modified body"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.study.find()
{ "_id" : 1, "name" : "Siva", "comments" : [ { "title" : "title 1", "body" : "body 1" }, { "title" : "title 2", "body" : "modified body" }, { "title" : "title 3", "body" : "body 3" } ] }
>
```

## modifying dynamically

```js
> db.study.find()
{ "_id" : 1, "name" : "Siva", "comments" : [ { "title" : "title 1", "body" : "body 1" }, { "title" : "title 2", "body" : "modified body" }, { "title" : "title 3", "body" : "body 3" } ] }

> db.study.update({"comments.title":"title 1"},{$set:{"comments.$.body": "modified body"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

> db.study.find()
{ "_id" : 1, "name" : "Siva", "comments" : [ { "title" : "title 1", "body" : "modified body" }, { "title" : "title 2", "body" : "modified body" }, { "title" : "
title 3", "body" : "body 3" } ] }
>
```

## less than using $lt

```js
> db.study.insertMany(
   [{
   _id: 1,
   name: "Siva",
   age: 20
   },
   {
   _id: 2,
   name: "Siva",
   age: 21
   },
   {
   _id: 3,
   name: "Siva",
   age: 22
   },
   {
   _id: 4,
   name: "Siva",
   age: 23
   }]
 )

{ "acknowledged" : true, "insertedIds" : [ 1, 2, 3, 4 ] }

> db.study.find({age:{$lt:22}})
>
{ "_id" : 1, "name" : "Siva", "age" : 20 }
{ "_id" : 2, "name" : "Siva", "age" : 21 }
>
```

## find by size - $size

```js
db.study.insertMany(
   [{
   _id: 1,
   name: "Siva",
   age: 20,
   items: [1,2,3]
   },
   {
   _id: 2,
   name: "Siva",
   age: 21,
   items: [1]
   },
   {
   _id: 3,
   name: "Siva",
   age: 22,
   items: [1,2]
   },
   {
   _id: 4,
   name: "Siva",
   age: 23,
   items: [1,2,3,4,5]
   }]
 )



> db.study.find({items:{$size:2}})
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
> db.study.find({items:{$size:3}})
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
> db.study.find({items:{$size:5}})
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
>
```

## $not

```js
> db.study.find({})
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }

> db.study.find({items:{$not:{$eq:[1]}}})
>
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
>
```

## $or

```js
> db.study.find({})
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }

> db.study.find({$or:[{items:[1,2]},{items:[1,2,3,4,5]}]})
>
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
>
>
```

## $all

```js
> db.study.find({})
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }

> db.study.find({items:{$all:[3]}})
>
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
>
```

## $slice - Projection

```js
> db.study.find({})
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }

> db.study.find({},{"items":{"$slice":2}})
>
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2 ] }
>
```

## $nor

```js
> db.study.find({})
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }

> db.study.find({$nor:[{items:[1]},{items:[1,2]}]})
>
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
>
```

## $exists

```js
> db.study.find({})
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }

> db.study.find({items:{$exists:true}})
>
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }

> db.study.find({address:{$exists:true}})
>
```

## - $type

```js
> db.study.find({})
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
{ "_id" : 5, "name" : "Siva", "age" : 20, "items" : "1,2,3" }

> db.study.find({items:{$type:'array'}})
>
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }

> db.study.find({items:{$type:'string'}})
>
{ "_id" : 5, "name" : "Siva", "age" : 20, "items" : "1,2,3" }
>
```

## null filtering

```js
> db.study.find({})
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
{ "_id" : 5, "name" : "Siva", "age" : 20, "items" : "1,2,3" }
{ "_id" : 6, "name" : "Siva", "age" : 20, "items" : null }

> db.study.find({items:null})
>
{ "_id" : 6, "name" : "Siva", "age" : 20, "items" : null }
>
```

## Aggregate

```js
> db.student.find()
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }

> db.student.aggregate([{$match:{age:{$gt:21}}}])
>
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
>
```

## Aggregate - Example 2

```js
> db.student.find()
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }

> db.student.aggregate([{$match:{age:{$gt:21}}},{$group:{_id:"$name",total_ages:
{$sum:"$age"}}}])

{ "_id" : "Siva", "total_ages" : 45 }
>
```

## Aggregate - Example 3

```js
> db.student.aggregate([{$match:{age:{$gt:21}}},{$group:{_id:"$age",total:{$sum:
"$age"}}}])
{ "_id" : 23, "total" : 23 }
{ "_id" : 22, "total" : 22 }
>
```

## Aggregate - Example - 4

```js
> db.student.find()
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
{ "_id" : 5, "name" : "Siva", "age" : 21, "items" : [ 1, 2, 3 ] }
{ "_id" : 6, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 7, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
>
> db.student.aggregate([{$match:{age:{$gt:21}}},{$group:{_id:"$age",total:{$sum:
 "$age"}}}])

{ "_id" : 23, "total" : 46 }
{ "_id" : 22, "total" : 44 }
>
```

## Aggregate - Example - 5

```js
> db.student.aggregate([{$match:{age:{$gt:21}}},{$group:{_id:"$age",total:{$sum:
 "$age"}}},{$sort:{total:1}}])

{ "_id" : 22, "total" : 44 }
{ "_id" : 23, "total" : 46 }
>
```

## Aggregate - Example - 6

```js
> db.student.aggregate([{$match:{age:{$gt:21}}},{$group:{_id:"$age",total:{$sum:
 "$age"}}},{$sort:{total:1}},{$project:{total:1,_id:0}}])
{ "total" : 44 }
{ "total" : 46 }
>
```

## Aggregate - Example - 7

```js
> db.student.aggregate([{$match:{age:{$gt:21}}},{$group:{_id:"$age",total:{$sum:
 "$age"}}},{$sort:{total:1}},{$project:{total:1,_id:0}},{$limit:1}])
{ "total" : 44 }
>
```

## Aggregate - Example - 8

```js
> db.student.aggregate([{$match:{age:{$gt:10}}},{$group:{_id:"$age",total:{$sum:
 "$age"}}},{$sort:{total:1}},{$project:{total:1,_id:0}},{$limit:10}])
{ "total" : 20 }
{ "total" : 44 }
{ "total" : 46 }
{ "total" : 63 }
> db.student.aggregate([{$match:{age:{$gt:10}}},{$group:{_id:"$age",total:{$sum:
 "$age"}}},{$sort:{total:1}},{$project:{total:1,_id:0}},{$limit:10},{$skip:2}])
{ "total" : 46 }
{ "total" : 63 }
>
```

## Aggregate - Example - 9

```js
> db.student.aggregate([{$match:{age:{$gt:10}}},{$group:{_id:"$age",total:{$sum:
 "$age"}}},{$sort:{total:1}},{$project:{total:1}},{$limit:10},{$skip:2},{$out:"d
ata"}])

> db.data.find()
>
{ "_id" : 23, "total" : 46 }
{ "_id" : 21, "total" : 63 }
>
```

## Aggregate - Example - 10

```js
> db.student.find()
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
{ "_id" : 5, "name" : "Siva", "age" : 21, "items" : [ 1, 2, 3 ] }
{ "_id" : 6, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 7, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }

> db.student.aggregate([{$match:{age:{$gt:22}}},{$unwind:"$items"}])
>
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : 1 }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : 2 }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : 3 }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : 4 }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : 5 }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : 1 }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : 2 }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : 3 }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : 4 }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : 5 }
>
```

## Aggregate - Example - 11

```js
> db.student.find()
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
{ "_id" : 5, "name" : "Siva", "age" : 21, "items" : [ 1, 2, 3 ] }
{ "_id" : 6, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 7, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
>
> db.student.aggregate([{$match:{age:{$gt:22}}},{$unwind:"$items"},{$project:{items:1,_id:0}}])

{ "items" : 1 }
{ "items" : 2 }
{ "items" : 3 }
{ "items" : 4 }
{ "items" : 5 }
{ "items" : 1 }
{ "items" : 2 }
{ "items" : 3 }
{ "items" : 4 }
{ "items" : 5 }
>
```

## $redact - Example - 1

```js
> db.student.aggregate(    [      { $redact: {         $cond: {            if: {
 $gt:["$age",22] },            then: "$$DESCEND",            else: "$$PRUNE"
      }        }      }    ] );
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
>
```

## Aggregate - Example - 2

```js
> db.student.find()
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
{ "_id" : 5, "name" : "Siva", "age" : 21, "items" : [ 1, 2, 3 ] }
{ "_id" : 6, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 7, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
> db.student.aggregate(    [      { $redact: {         $cond: {            if: {
 $gt: [ { $size: { $setIntersection: [ "$items", [3] ] } }, 2 ] },            th
en: "$$DESCEND",            else: "$$PRUNE"          }        }      }    ] );
> db.student.aggregate(    [      { $redact: {         $cond: {            if: {
 $gt: [ { $size: { $setIntersection: [ "$items", [3] ] } }, 0 ] },            th
en: "$$DESCEND",            else: "$$PRUNE"          }        }      }    ] );
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
{ "_id" : 5, "name" : "Siva", "age" : 21, "items" : [ 1, 2, 3 ] }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
>
```

## Aggregate - Example - 3

```js
> db.student.find()
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
{ "_id" : 5, "name" : "Siva", "age" : 21, "items" : [ 1, 2, 3 ] }
{ "_id" : 6, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 7, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
> db.student.aggregate(    [      { $redact: {         $cond: {            if: {
$in:[5,"$items"]},            then: "$$DESCEND",            else: "$$PRUNE"
     }        }      }    ] );
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
>
```

## Map Reduce

### Example 1

```js
var mapFn = function() {
  emit(this.name, this.age);
};
var reduceFn = function(key, values) {
  return Array.sum(values);
};

var out_obj = {
  out: "out_data"
};

db.study.mapReduce(mapFn, reduceFn, out_obj);
```

### Example 2

```js
db.getCollection("purchase").insertMany([
  {
    name: "Siva",
    items: ["Soap", "Comp", "Mirror"]
  },
  {
    name: "Ram",
    items: ["Soap", "Mirror"]
  },
  {
    name: "Raj",
    items: ["Comp", "Mirror"]
  }
]);

var mapFn = function() {
  this.items.forEach(function(val) {
    emit(val, 1);
  });
};
var reduceFn = function(key, values) {
  return Array.sum(values);
};

var out_obj = {
  out: "out_data"
};

db.purchase.mapReduce(mapFn, reduceFn, out_obj);
```

### output is

```js
{
    "_id" : "Comp",
    "value" : 2.0
}

/* 2 */
{
    "_id" : "Mirror",
    "value" : 3.0
}

/* 3 */
{
    "_id" : "Soap",
    "value" : 2.0
}
```

### Example 3

```js
db.getCollection("books").insertMany([
  {
    name: "JS First Edition",
    authors: ["Siva", "Raj", "Ram", "Kumar"]
  },
  {
    name: "Node js 1st Edition",
    authors: ["Vivek", "Mano", "Ram", "Kumar"]
  },
  {
    name: "Mongodb Reference",
    authors: ["Mano", "Vivek", "Ram", "Siva"]
  }
]);

var mapFn = function() {
  var name = this.name;
  this.authors.forEach(function(val) {
    emit(val, name);
  });
};
var reduceFn = function(key, values) {
  return values.join(",");
};

var out_obj = {
  out: "out_data"
};

db.books.mapReduce(mapFn, reduceFn, out_obj);
```

### output is

```js
/* 1 */
{
    "_id" : "Kumar",
    "value" : "JS First Edition,Node js 1st Edition"
}

/* 2 */
{
    "_id" : "Mano",
    "value" : "Node js 1st Edition,Mongodb Reference"
}

/* 3 */
{
    "_id" : "Raj",
    "value" : "JS First Edition"
}

/* 4 */
{
    "_id" : "Ram",
    "value" : "JS First Edition,Node js 1st Edition,Mongodb Reference"
}

/* 5 */
{
    "_id" : "Siva",
    "value" : "JS First Edition,Mongodb Reference"
}

/* 6 */
{
    "_id" : "Vivek",
    "value" : "Node js 1st Edition,Mongodb Reference"
}
```

## Example 4

```js
db.getCollection('account').insertMany([
{
    name: "Siva",
    transaction:[{amount:100},{amount:200},{amount:400}]
    },
    {
    name: "Ram",
    transaction:[{amount:300}]
    },
    {
    name: "Siva",
    transaction:[{amount:300},{amount:1200},{amount:3400}]
    }

])



var mapFn = function(){
    var name = this.name;
    var sum = 0;
    this.transaction.forEach(function(val){
        sum += val.amount;
        })
    emit(name,sum)
    }
var reduceFn = function(key, values) {
    return Array.sum(values);
}

var out_obj = {
    out:'out_data'
    }

db.account.mapReduce(mapFn, reduceFn, out_obj);


### output


/* 1 */
{
    "_id" : "Ram",
    "value" : 300.0
}

/* 2 */
{
    "_id" : "Siva",
    "value" : 5600.0
}
```
