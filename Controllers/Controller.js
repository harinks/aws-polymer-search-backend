const mongo = require("../config/dbConnect");

exports.getRepo = (async (req, res) => {

    console.log(req.query)
    if (Object.keys(req.query).length === 0) {

        //console.log("in")

        let repos = await mongo.repo.find().toArray()
        res.status(200).send(repos)

    }
    else {
        var query = {}
        query['$and'] = [];

        for (let key in req.query) {
            //console.log(key, req.query[key])

            if (key === "stargazers_count" || key === "forks_count" || key === "watchers_count" || key === "open_issues_count") {

                values = req.query[key].split("-")

                values = values.map(a => parseInt(a))

                query['$and'].push({ [key]: { $lt: values[1], $gte: values[0] } })

            }
            else if (key === "license") {

                query['$and'].push({ "license.key": { $in: req.query[key].split("-") } })

            }
            else if (key === "has_wiki") {

                if (req.query[key] === 'true') query['$and'].push({ [key]: true })
                else query['$and'].push({ [key]: false })

            }
            else {

                query['$and'].push({ [key]: { $in: req.query[key].split(",") } })

            }
        }
        //console.log(query)

        let repos = await mongo.repo.find(query).toArray()
        //console.log(repos)
        res.status(200).send(repos)
    }
});

exports.getTags = (async (req, res) => {

    let language = await mongo.repo.aggregate([
        { $group: { _id: "$language", count: { $sum: 1 } } },
        { $project: { _id: 0, language: "$_id", count: 1 } }]).toArray()

    //console.log(language)
    res.send(language)
    
});