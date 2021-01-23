const express = require("express");
const router = express.Router();
const {
  getCollectionsByUser,
  getProjectsByUser,
  getSongsBySearch
} = require("../helpers/dbHelpers");

module.exports = (db) => {

  // SEARCH FOR SONGS
  router.get("/search/:query", (req, res) => {
    const userID = [req.session.userId];
    if (!userID) {
      res.status(403).send(`lol fuck you`);
    } else {
      console.log(`query is`, req.params.query)
      getSongsBySearch(req.params.query, db)
        .then(result => {
          res.json(result.rows)
        })
        // filterThroughSongs(userID, db)
        //   .then((collectionsData) => {
        //     getProjectsByUser(userID, db).then((projectsData) => {
        //       const collections = collectionsData.rows;
        //       const projects = projectsData.rows;
        //       res.json({ collections, projects });
        //     });
        //   })
        .catch((err) => console.log(err));
    }
  });

  // Fetch Collections & Project Data for Home View
  router.get("/:id", (req, res) => {
    const userID = req.params.id;
    console.log("AHFUIAHFIA====", [req.session.userId])
    console.log(`userID is `, userID)
    if (!userID) {
      res.status(403).send(`lol fuck you`);
    } else {
      getCollectionsByUser(userID, db)
        .then((collectionsData) => {
          getProjectsByUser(userID, db)
          .then((projectsData) => {
            const collections = collectionsData.rows;
            const projects = projectsData.rows;
            res.json({ collections, projects });
          });
        })
        .catch((err) => console.log(err));
    }
  });



  return router;
};
