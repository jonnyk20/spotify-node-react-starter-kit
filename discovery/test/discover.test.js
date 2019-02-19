let expect = require('chai').expect;

let discover = require('../src/discover.mjs');
let sinon = require('sinon');
let absent = require('./fixtures/discover/absent_playlists');
let playlists = require('./fixtures/discover/playlists');
let discoveryOne = require('./fixtures/discover/discover1');
let bankOne = require('./fixtures/discover/bank1')
let bankTwo = require('./fixtures/discover/bank2')


// FIXME!!! Jest doesn't support ES Modules (.mjs)
test('should exit gracefully if bank or discovery do not exist', function () {
    let spotify = {
        getUserPlaylists: function(){
            return absent;
        },
        addTracksToPlaylist: jest.fn()
    };

    discover.saveDiscoverWeekly(spotify);
    expect(spotify.addTracksToPlaylist).not.toHaveBeenCalled();
});
test('should save all tracks if none are present in bank', function () {
    let spotify = {
        getUserPlaylists: function(){
            return playlists;
        },
        getPlaylistTracks: function(id){
            if(id == '1'){
                return discoveryOne;
            } else if (id == '8'){
                return bankOne;
            }
        },
        addTracksToPlaylist: jest.fn()
    };

    discover.saveDiscoverWeekly(spotify);
    let params = spotify.addTracksToPlaylist.mock.calls[0];

    // should save it to the bank
    expect(params[0]).toBe('8');

    // should have all discovery tracks
    discoveryOne.forEach(element => {
        expect(params[1]).toContain(element);
    });
});

test('should save any tracks that are not duplicated in bank', function () {
    let spotify = {
        getUserPlaylists: function(){
            return playlists;
        },
        getPlaylistTracks: function(id){
            if(id == '1'){
                return discoveryOne;
            } else if (id == '8'){
                return bankTwo;
            }
        },
        addTracksToPlaylist: jest.fn()
    };

    discover.saveDiscoverWeekly(spotify);
    let params = spotify.addTracksToPlaylist.mock.calls[0];
    expect(params[1].length).toBe(1);
    expect(param[1]).toContain("02")

});
test('should save nothing if all are duplicates', function () {
    let spotify = {
        getUserPlaylists: function(){
            return playlists;
        },
        getPlaylistTracks: function(id){
            if(id == '1'){
                return bankOne;
            } else if (id == '8'){
                return bankOne;
            }
        },
        addTracksToPlaylist: jest.fn()
    };

    discover.saveDiscoverWeekly(spotify);
    expect(spotify.getPlaylistTracks).toHaveBeenCalledTimes(2);
    expect(spotify.addTracksToPlaylist).not.toHaveBeenCalled();
});
