import { expect } from 'chai';
import * as mocha from 'mocha';
import { suite, test } from 'mocha-typescript';
import { readID3Tags } from '../lib/index';
import * as path from 'path';
import * as fs from 'fs';

const pathFileNoTags: string = path.resolve(__dirname , '../../src/test/no_tags.mp3');
const pathFileWithTags: string = path.resolve(__dirname, '../../src/test/with_tags.mp3');
const pathFileWithTags2: string = path.resolve(__dirname, '../../src/test/with_tags2.mp3');


@suite('Check if the tags of a MP3-File are read correct')
class ReadID3Tags {
   
    @test('Check if file without id3-Tags is read correct as stream') 
    read_file_without_tags_stream(done: Function) {
        const file: fs.ReadStream = fs.createReadStream(pathFileNoTags);

        // Try to read the file
        readID3Tags(file).then((data) => {
            expect(data).to.be.not.undefined;
            expect(data).to.be.a('object');

            expect(data.title).to.be.equal('');

            expect(data.artist).to.be.a('array');
            expect(data.artist.length).to.be.equal(0);

            expect(data.albumartist).to.be.a('array');
            expect(data.albumartist.length).to.be.equal(0);

            expect(data.album).to.be.equal('');
            expect(data.year).to.be.equal('');
            
            expect(data.track).to.be.a('object');
            expect(data.track.no).to.be.equal(0),
            expect(data.track.of).to.be.equal(0);
            
            expect(data.disk).to.be.a('object');
            expect(data.disk.no).to.be.equal(0);
            expect(data.disk.of).to.be.equal(0);
            
            expect(data.picture).to.be.a('array');
            expect(data.picture.length).to.be.equal(0);
            expect(data.duration).to.be.equal(1);
            
            expect(data.genre).to.be.a('array');
            expect(data.genre.length).to.be.equal(0);

            expect(data.featurings).to.be.a('array');
            expect(data.featurings.length).to.be.equal(0);

            done();
        }).catch((err) => {
           done(err); 
        });
    }

    @test('Check if file with tags is read correct as stream')
    read_file_with_tags_stream(done: Function) {
        const file: fs.ReadStream = fs.createReadStream(pathFileWithTags);

        readID3Tags(file).then((data) => {
            expect(data).to.be.not.undefined;
            expect(data).to.be.a('object');
            expect(data.title).to.be.equal('title');

            expect(data.artist).to.be.a('array');
            expect(data.artist.length).to.be.equal(1);
            expect(data.artist[0]).to.be.equal('artist');
            
            expect(data.albumartist).to.be.a('array');
            expect(data.albumartist.length).to.be.equal(1);
            expect(data.albumartist[0]).to.be.equal('artist');

            expect(data.album).to.be.equal('album');
            expect(data.year).to.be.equal('2017');

            expect(data.track).to.be.a('object');
            expect(data.track.no).to.be.equal(1),
            expect(data.track.of).to.be.equal(2);

            expect(data.disk).to.be.a('object');
            expect(data.disk.no).to.be.equal(1);
            expect(data.disk.of).to.be.equal(2);

            expect(data.picture).to.be.a('array');
            expect(data.picture.length).to.be.equal(1);
            expect(data.picture[0].data).to.be.not.undefined;
            expect(data.picture[0].format).to.be.equal('png');

            expect(data.duration).to.be.equal(1);

            expect(data.genre).to.be.a('array');
            expect(data.genre.length).to.be.equal(1);
            expect(data.genre[0]).to.be.equal('Rap');

            expect(data.featurings).to.be.a('array');
            expect(data.featurings.length).to.be.equal(1);
            expect(data.featurings[0]).to.be.equal('a1');

            done();
        }).catch((err) => {
            done(err);
        });
   
    }

    @test('Check if data is read when file is given as as path string')
    read_file_with_tags_path(done: Function) {
        readID3Tags(pathFileWithTags).then((data) => {
            expect(data).to.be.a('object');

            done();
        }).catch((err) => {
            done(err);
        })
    }

    @test('Check if error is thrown, when file path is given, but file is not found')
    read_not_existing_file(done: Function) {
        readID3Tags('Incorrect path').then((data) => {
            done(new Error('Error not thrown'));            
        }).catch((err: NodeJS.ErrnoException) => {
            expect(err).to.be.not.undefined;
            
            done();
        });
    }

    @test('Check if file with different featuring in the id3-tags is read correct')
    read_file_with_tags_stream2(done: Function) {
        const file: fs.ReadStream = fs.createReadStream(pathFileWithTags2);

        // Try to read the file
        readID3Tags(file).then((data) => {
            expect(data).to.be.not.undefined;
            expect(data).to.be.a('object');

            expect(data.title).to.be.equal('title');

            expect(data.artist).to.be.a('array');
            expect(data.artist.length).to.be.equal(1);
            expect(data.artist[0]).to.be.equal('artist');

            expect(data.featurings).to.be.a('array');
            expect(data.featurings.length).to.be.equal(2);
            expect(data.featurings[0]).to.be.equal('a1');
            expect(data.featurings[1]).to.be.equal('a2');

            done();
        }).catch((err) => {
           done(err); 
        });;
    }

}

