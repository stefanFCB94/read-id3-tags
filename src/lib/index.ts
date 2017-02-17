import * as fs from 'fs';
import * as mm from 'musicmetadata';
import * as feat from 'extract-featurings';

export interface id3Tags extends MM.Metadata {
    featurings?: Array<string>
};

export function readID3Tags(file: fs.ReadStream | string): Promise<id3Tags> {
    return new Promise<id3Tags>((resolve, reject) =>  {

        // If parameter is given as string, test if string represents a file
        if ( typeof file === 'string' ) {
            fs.stat(file, function(err, stats) {
                // Throws error ENOENT if the file doesn't exists
                if (err) return reject(err);

                // If no error exists: The file exists
                // Call the function with a stream this time
                const stream: fs.ReadStream = fs.createReadStream(file);
                readID3Tags(stream).then(val => {
                    resolve(val);
                }).catch(err => {
                    reject(err);
                });
            });

            // If a string was given, the promise is resolved or rejected
            // in the recursive callback
            return;
        }

        // Read tags always with duration
        const readOptions: MM.Options = {
            duration: true
        };

        // Read ID3-Tags always with duration from the stream
        mm(file, readOptions, (err: Error, metadata: MM.Metadata) => {
            // If an error appeary, reject the promise an end
            if (err) return reject(err);

            // Transfer type of tags
            let id3: id3Tags = metadata;

            if ( metadata.title != null ) {
                // Read featurings from title
                const f: feat.TitleFeaturing = feat.readTitleFeaturing(metadata.title);

                // Read featurings from artitst
                let cleanedArtist: Array<string> = [];
                metadata.artist.forEach((val) => {
                    const f2: feat.ArtistFeaturing = feat.reatArtistFeaturing(val);

                    cleanedArtist.push(f2.artist);
                    f.feat = f.feat.concat(f2.feat);
                });
                
                // Remove duplicates from array
                f.feat = f.feat.filter((item, pos, self) => {
                    return self.indexOf(item) == pos;
                });

                // Sort featurings in alphabetical order
                f.feat.sort();

                // Set cleaned title, artist and detected featurings
                id3.title = f.title;
                id3.artist = cleanedArtist;
                id3.featurings = f.feat;
            }

            resolve(id3);
        });

    });

}
