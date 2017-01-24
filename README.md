# Read ID3-Tags from a MP3-File

Reads all ID3-Tags from a MP3-File, which is given as:
* ReadStream
* Path

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Install the module with npm to use it in your project.
```
npm install --production read-id3-tags
```

To change the code or run tests of the module you can install it with its development dependencies:
```
npm install read-id3-tags
```


After installing, the module can be used the following way:
```typescript
import {readID3Tags} from 'read-id3-tags';

// Tags can be read from a string
const filePath: string = 'Path to file';

// Tags can be read from a stream
const fileStream: fs.createReadStream(filePath);

readID3Tags(filePath).then((data) => {
    // Logs the following data
    // data = { 
    //      title: '',
    //      artist: [],
    //      albumartist: [],
    //      album: '',
    //      year: '',
    //      track: { no: 0, of: 0 },
    //      genre: [],
    //      disk: { no: 0, of: 0 },
    //      picture: [],
    //      duration: 1,
    //      featurings: [] 
    // };
    console.log(data);

}).catch((err) => {
    // Something went wrong
    throw err;
})
```

## Testing the module

To test the module you can use the built in tests.
For testing, the frameworks mocha and chai are used. To check the code coverage the framework istanbul is used.

To run the test install all development dependencies, with following command:

```
npm install read-id3-tags
```

To start the tests run the following command:
```
gulp test
```

These test check different combinations of title and embeded featurings and if the output is correct.
The results of the code coverage are generated as HTML output in the folder "coverage".

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/stefanFCB94/read-id3-tags).

## Authors

* [**Stefan Läufle**](https://github.com/stefanFCB94)

## Built With

* [**musicmetadata**](https://www.npmjs.com/package/musicmetadata) - Parser for the ID3-Tags

## License

This project is licensed under the MIT License
