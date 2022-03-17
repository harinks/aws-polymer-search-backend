const { MongoClient } = require("mongodb")

const client= new MongoClient(process.env.URL)

module.exports={
    db:null,

    repo:null,
 
   async connect()
   {
       await client.connect()
       this.db=client.db(process.env.NAME)
       console.log("Connected to DB -",process.env.NAME)
       this.repo=this.db.collection("repo")
   }
    
}