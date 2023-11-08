const axios = require("axios").default;
const qs = require("qs");
const createInterface = require("node:readline/promises").createInterface;

require("dotenv").config({path: __dirname + "/.env"});
const clientId = process.env.SPOTIFY_API_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;


const authToken = Buffer.from(`${clientId}:${clientSecret}`, "utf-8").toString("base64");

const getAuth = async () => {
    try {
        const tokenUrl = "https://accounts.spotify.com/api/token";
        const data = qs.stringify({"grant_type": "client_credentials"});

        const response = await axios.post(tokenUrl, data, {
            headers: {
                "Authorization": `Basic ${authToken}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const getIdOfArtist = async (artist) => {
    let artistName;

    if (artist === undefined) {
        // Get the artist name from the user
        const rl = createInterface({ input: process.stdin, output: process.stdout});

        artistName = await rl.question("Type in the artist that you want to get the top tracks of\n");

        rl.close();
    } else {
        artistName = artist;
    }

    artistName = encodeURIComponent(artistName);


    try {
        let accessToken = await getAuth();
        let searchQuery = `q=${artistName}&type=artist`;
        const apiUrl = `https://api.spotify.com/v1/search?${searchQuery}`;
        console.log(apiUrl);

        const response = await axios.get(apiUrl, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        console.log(response.data.artists.items[0].id);
        return response.data.artists.items[0].id;
    } catch (error) {
        console.log(error);
        throw(error);
    }
}


const getTopTracksFromId = async (id) => {
    try {
        const accessToken = await getAuth();
        const apiUrl = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`;
        const response = await axios.get(apiUrl, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error
    }
}

const getTopTracksFromArtist = async (artist) => {
    try {
        const id = await getIdOfArtist(artist);
        const data = await getTopTracksFromId(id);
        const tracks = data.tracks;
        const names = tracks.map((track, index) => {
            return track.name;
        });
        return names;
    } catch (error) {
        console.log(error);
        throw error;
    }

    // return getIdOfArtist(artist)
    // .then(async (id) => {
    //     try {
    //         const data = await getTopTracksFromId(id);
    //         const tracks = data.tracks;
    //         const names = tracks.map((track, index) => {
    //             return track.name;
    //         });
    //         console.log(names);
    //         return names;
    //     } catch {
    //         console.log("Error at getTopTracksFromId");
    //     }
    // })
    // .catch(error => {
    //     console.log("Error at getIdOfArtist");
    // });
};


module.exports = { getTopTracksFromArtist };