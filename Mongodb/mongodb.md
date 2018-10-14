# mongodb notes

## Create Database

use study  // here study is the database

then it will switch current reference into db

i.e access 

db.study......


 ## Create Collection
//here student is the table name.
 db.createCollection('student')

## Save Record

> db.student.insert({name:"Sekar",age:33,hobbies:['sleep','eat']})
WriteResult({ "nInserted" : 1 })
>

## Query database

### find()

> db.student.find()
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar", "age" : 33, "h
obbies" : [ "sleep", "eat" ] }
>

> db.student.find({name:"Sekar"})
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar", "age" : 33, "h
obbies" : [ "sleep", "eat" ] }
>

> db.student.find({name:/Se/})
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar", "age" : 33, "h
obbies" : [ "sleep", "eat" ] }
>

> db.student.find({hobbies:["a","b"]})
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar", "hobbies" : [
"a", "b" ] }
>

> db.student.find({hobbies:"a"})
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar", "hobbies" : [
"a", "b" ] }
{ "_id" : ObjectId("5bbb5d4d35f231e33b3c17fa"), "name" : "Siva", "hobbies" : [ "
a", "b", "c" ] }
>

## find with in 

> db.student.find({hobbies:{$in:["a","c"]}})
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar", "hobbies" : [
"a", "b" ] }
{ "_id" : ObjectId("5bbb5d4d35f231e33b3c17fa"), "name" : "Siva", "hobbies" : [ "
a", "b", "c" ] }
>

## find not in


> db.student.find({hobbies:{$nin:["c"]}})
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar", "hobbies" : [
"a", "b" ] }
>

## find nested property


> db.student.find({"products.cook.rice":"Basmati"})
{ "_id" : ObjectId("5bbb6b5a35f231e33b3c17fb"), "name" : "Pradeep", "products" :
 { "cook" : { "rice" : "Basmati" }, "bath" : { "soap" : "liril" } } }
>


## projection Ex Select name from student

> db.student.find({},{name:1})
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar" }
>

> db.student.find({},{name:1,_id:0})
{ "name" : "Sekar" }
>

## Sort()

> db.student.find().sort({age:-1})
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar", "age" : 33, "h
obbies" : [ "sleep", "eat" ] }
{ "_id" : ObjectId("5bbb3a4a35f231e33b3c17f2"), "name" : "Sameer", "age" : 31, "
hobbies" : [ "sleep", "eat" ] }
{ "_id" : ObjectId("5bbb3a4f35f231e33b3c17f3"), "name" : "Sameer", "age" : 30, "
hobbies" : [ "sleep", "eat" ] }


> db.student.find().sort({age:1})
{ "_id" : ObjectId("5bbb3a4f35f231e33b3c17f3"), "name" : "Sameer", "age" : 30, "
hobbies" : [ "sleep", "eat" ] }
{ "_id" : ObjectId("5bbb3a4a35f231e33b3c17f2"), "name" : "Sameer", "age" : 31, "
hobbies" : [ "sleep", "eat" ] }
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar", "age" : 33, "h
obbies" : [ "sleep", "eat" ] }
>


## limit()

> db.student.find().sort({age:1}).limit(2)
{ "_id" : ObjectId("5bbb3a4f35f231e33b3c17f3"), "name" : "Sameer", "age" : 30, "
hobbies" : [ "sleep", "eat" ] }
{ "_id" : ObjectId("5bbb3a4a35f231e33b3c17f2"), "name" : "Sameer", "age" : 31, "
hobbies" : [ "sleep", "eat" ] }
>

## skip() // used for pagination

> db.student.find().sort({age:1}).skip(2).limit(1)
{ "_id" : ObjectId("5bbb2e0635f231e33b3c17f1"), "name" : "Sekar", "age" : 33, "h
obbies" : [ "sleep", "eat" ] }
>


## Insert multiple Records

> db.student.insertMany([{name:"A"},{name:"B"},{name:"C"}])

## Sample nested record

>
> db.student.insert({name:"Pradeep",products:{cook:{rice:"Basmati"},bath:{soap:"
liril"}}})


## update if match found and create if not exist - upsert


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


## Update Record

> db.student.update({"name":"B"},{$set:{"name":"B- updated"}})

## Update multiple Records

> db.student.updateMany({name:"Updated Test"},{$set:{name:"Updated"}})

> db.student.updateMany({age:{$gt:1}},{$set:{name:"Updated Test"}})

## push array item using $push

> db.student.update({name:"Sekar"},{"$push":{"hobbies":"d"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.student.find()
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar", "hobbies" : [
"a", "b", "d" ] }
{ "_id" : ObjectId("5bbb5d4d35f231e33b3c17fa"), "name" : "Siva", "hobbies" : [ "
a", "b", "c" ] }
>


## increment by $inc

> db.study.update({_id:"5bbcb4bce596bc1c28c2bc8a"},{$inc:{age:1}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
>


## Replace One

> db.student.replaceOne({name:"Updated"},{name:"Updated Test"})
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
>


## Remove Record

> db.student.remove({name:"A"})

## Remove property / column

> db.student.update({name:"Sekar"},{"$unset":{"hobbies":1}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.student.find()
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar" }
{ "_id" : ObjectId("5bbb5d4d35f231e33b3c17fa"), "name" : "Siva", "hobbies" : [ "
a", "b", "c" ] }
>

## Remove last array item from property

> db.student.update({name:"Siva"},{"$pop":{"hobbies":1}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.student.find()
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar" }
{ "_id" : ObjectId("5bbb5d4d35f231e33b3c17fa"), "name" : "Siva", "hobbies" : [ "
a", "b" ] }
> db.student.update({name:"Siva"},{"$pop":{"hobbies":1}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
>
> db.student.find()
{ "_id" : ObjectId("5bbb5d3a35f231e33b3c17f9"), "name" : "Sekar" }
{ "_id" : ObjectId("5bbb5d4d35f231e33b3c17fa"), "name" : "Siva", "hobbies" : [ "
a" ] }
>



## Delete All

> db.student.remove({})
WriteResult({ "nRemoved" : 7 })
>

## drop table/collection

> db.student.drop()
true
>

## get collection names

> db.getCollectionNames()
[ ]
> db.createCollection('student')
{ "ok" : 1 }
> db.getCollectionNames()
[ "student" ]
>

## Show list Database

> show dbs
admin    0.000GB
config   0.000GB
local    0.000GB
sekar    0.000GB
sekardb  0.000GB
study    0.000GB
>

## distinct 

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

## Regular Expression based find 

> db.student.find()
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fc"), "name" : "Siva" }
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fd"), "name" : "Sekar" }
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fe"), "name" : "Siva" }

> db.student.find({name:/Si/})

{ "_id" : ObjectId("5bbb71de35f231e33b3c17fc"), "name" : "Siva" }
{ "_id" : ObjectId("5bbb71de35f231e33b3c17fe"), "name" : "Siva" }
>

## fetch Reg Exp by end value matching

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

## prevent duplicate array item insertion by $addToSet

> db.study.update(
   { _id: 1 },
   { $addToSet: { tags: { $each: [ "camera", "electronics", "accessories" ] } } }
 )
>

previously tags array conatins tags: [ "electronics", "supplies" ] 

modified is  "tags" : [ "electronics", "supplies", "camera", "
accessories" ] }
>

## remove specific item from array conditionally

> db.student.findOne({name:"Siva"})
{
        "_id" : ObjectId("5bbb71de35f231e33b3c17fc"),
        "name" : "Siva",
        "emails" : [
                "a@a.com",
                "b@b.com"
        ]
}
> db.student.update({_id:"5bbb71de35f231e33b3c17fc"},{"$pull":{"emails":"b@b.com
"}})
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

## Positional array modifiers

> db.study.find()
{ "_id" : 1, "name" : "Siva", "comments" : [ { "title" : "title 1", "body" : "bo
dy 1" }, { "title" : "title 2", "body" : "body 2" }, { "title" : "title 3", "bod
y" : "body 3" } ] }
> db.study.update({_id:1},{$set:{"comments.1.body": "modified body"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.study.find()
{ "_id" : 1, "name" : "Siva", "comments" : [ { "title" : "title 1", "body" : "bo
dy 1" }, { "title" : "title 2", "body" : "modified body" }, { "title" : "title 3
", "body" : "body 3" } ] }
>

## modifying dynamically

> db.study.find()
{ "_id" : 1, "name" : "Siva", "comments" : [ { "title" : "title 1", "body" : "bo
dy 1" }, { "title" : "title 2", "body" : "modified body" }, { "title" : "title 3
", "body" : "body 3" } ] }

> db.study.update({"comments.title":"title 1"},{$set:{"comments.$.body": "modifi
ed body"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

> db.study.find()
{ "_id" : 1, "name" : "Siva", "comments" : [ { "title" : "title 1", "body" : "mo
dified body" }, { "title" : "title 2", "body" : "modified body" }, { "title" : "
title 3", "body" : "body 3" } ] }
>

## less than using $lt

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

## find by size - $size

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

## $not

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

## $or 

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
## $all

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

## $slice - Projection

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

## $nor

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

## $exists

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

## - $type

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

## null filtering

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

## Aggregate

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

## Aggregate - Example 2

> db.student.find()
{ "_id" : 1, "name" : "Siva", "age" : 20, "items" : [ 1, 2, 3 ] }
{ "_id" : 2, "name" : "Siva", "age" : 21, "items" : [ 1 ] }
{ "_id" : 3, "name" : "Siva", "age" : 22, "items" : [ 1, 2 ] }
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }

> db.student.aggregate([{$match:{age:{$gt:21}}},{$group:{_id:"$name",total_ages:
{$sum:"$age"}}}])

{ "_id" : "Siva", "total_ages" : 45 }
>


## Aggregate - Example 3
> db.student.aggregate([{$match:{age:{$gt:21}}},{$group:{_id:"$age",total:{$sum:
"$age"}}}])
{ "_id" : 23, "total" : 23 }
{ "_id" : 22, "total" : 22 }
>

## Aggregate - Example - 4

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

## Aggregate - Example - 5

> db.student.aggregate([{$match:{age:{$gt:21}}},{$group:{_id:"$age",total:{$sum:
 "$age"}}},{$sort:{total:1}}])

{ "_id" : 22, "total" : 44 }
{ "_id" : 23, "total" : 46 }
>

## Aggregate - Example - 6

> db.student.aggregate([{$match:{age:{$gt:21}}},{$group:{_id:"$age",total:{$sum:
 "$age"}}},{$sort:{total:1}},{$project:{total:1,_id:0}}])
{ "total" : 44 }
{ "total" : 46 }
>

## Aggregate - Example - 7

> db.student.aggregate([{$match:{age:{$gt:21}}},{$group:{_id:"$age",total:{$sum:
 "$age"}}},{$sort:{total:1}},{$project:{total:1,_id:0}},{$limit:1}])
{ "total" : 44 }
>

## Aggregate - Example - 8

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

## Aggregate - Example - 9

> db.student.aggregate([{$match:{age:{$gt:10}}},{$group:{_id:"$age",total:{$sum:
 "$age"}}},{$sort:{total:1}},{$project:{total:1}},{$limit:10},{$skip:2},{$out:"d
ata"}])

> db.data.find()
> 
{ "_id" : 23, "total" : 46 }
{ "_id" : 21, "total" : 63 }
>

## Aggregate - Example - 10

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

## Aggregate - Example - 11

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
> db.student.aggregate([{$match:{age:{$gt:22}}},{$unwind:"$items"},{$project:{it
ems:1,_id:0}}])

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

## $redact - Example - 1

> db.student.aggregate(    [      { $redact: {         $cond: {            if: {
 $gt:["$age",22] },            then: "$$DESCEND",            else: "$$PRUNE"
      }        }      }    ] );
{ "_id" : 4, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
{ "_id" : 8, "name" : "Siva", "age" : 23, "items" : [ 1, 2, 3, 4, 5 ] }
>


## Aggregate - Example - 2

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

## Aggregate - Example - 3

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

### Map Reduce

