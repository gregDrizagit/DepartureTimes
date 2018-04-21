const _            = require('lodash');
const express      = require('express');
const cors  = require('cors')
const bodyParser   = require('body-parser');
const config  = require('./knexfile.js');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
var request = require('request'); 

// Initialize Express.
const app = express();
app.use(express.static(__dirname + '/public'))
   .use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

// Configure & Initialize Bookshelf & Knex.
console.log('Running in environment: ' + "Development");
// console.log(config["development"])
const knex = require('knex')(config["development"]);
// console.log(knex)
const bookshelf = require('bookshelf')(knex);





// ***** Models ***** //

const Stop = bookshelf.Model.extend({
  tableName: 'stops',
  hasTimestamps: true
});

// const Tracks = bookshelf.Model.extend({
//   tableName: 'tracks',
//   hasTimestamps: true,
//   artist: function() {
//     return this.belongsTo(Artist);
//   },
//   genres: function() {
//       return this.hasMany(Genres)
//   },
// });

// const Albums = bookshelf.Model.extend({
//     tableName: 'album',
//     hasTimestamps: true,
//     tracks: function() {
//         return this.hasMany(Tracks);
//       },
//     artist: function() {
//       return this.belongsTo(Artist);
//     },
//   });

// const Genres = bookshelf.Model.extend({
//   tableName: 'genres',
//   hasTimestamps: true,
//   artist: function() {
//     return this.belongsTo(Artist);
//   },
//   artist: function() {
//     return this.belongsTo(Artist);
//   },
// });

exports.Stop = Stops;
// exports.Albums = Albums;
// exports.Genres = Genres;
// exports.Tracks = Tracks;


// // ***** Server ***** //

app.post('/stops', (req,res) => {
  console.log(req)
  res.send("hello")
});


  // app.post('/stops', (req, res) => {
  //   if (_.isEmpty(req.body)) {
  //     return res.sendStatus(400);
  //   }
  //   Album
  //     .forge(req.body)
  //     .save()
  //     .then((album) => {
  //       res.send({id: album.id});
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       return res.sendStatus(500);
  //     });
  // });

///////SPOTIFY AUTH////////




const listen = (port) => {
  return new Promise((resolve, reject) => {
    app.listen(port, () => {
      resolve();
    });
  });
};

exports.up = (justBackend) => {
  return knex.migrate.latest([process.env.NODE_ENV])
    .then(() => {
      return knex.migrate.currentVersion();
    })
    .then((val) => {
      console.log('Done running latest migration:', val);
      return listen(3000);
    })
    .then(() => {
      console.log('Listening on port 3000...');
    });
};