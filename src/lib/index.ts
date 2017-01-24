import * as fs from 'fs';
import * as mm from 'musicmetadata';
import {readFeaturing, Featuring} from 'extract-featurings';

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
                const feat: Featuring = readFeaturing(metadata.title);

                // Set cleaned title and detected featurings
                id3.title = feat.title;
                id3.featurings = feat.feat;
            }

            resolve(id3);
        });

    });

}
