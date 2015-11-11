Pico speaker (TTS) module for node js
===

## Synopsis

PicoSpeaker is a TTS module for node.
I created this module for my personal assistant project on a Raspberry Pi (raspbian). I use picoSpeaker to have my raspberry talk to me.

## Requirements
This module works on a linux based OS (raspbian, Ubuntu, Debian...)  using alsa for audio.

## Installation

This module requires pico tools and a alsa-utils to be installed.
```bash
sudo apt-get install libttspico0 libttspico-utils libttspico-data alsa-utils
```
You can simply add this module to your node.js project with
```bash
// sudo might be required depending on your system
npm install --save pico-speaker
```

## Usage

There are four public methods you can use:
- picoSpeaker.init(picoConfig);
=> this needs to be called to initialize clap detection. The picoConfig object is not mandatory but you can use it to overwrite the default configuration (see next section)
- picoSpeaker.speak(text)
=> read text and returns a promise that is resolved when the sentenced is finished
- picoSpeaker.repeat()
=> repeat last sentence returns a promise that is resolved when the sentenced is finished
- picoSpeaker.shutUp()
=> interrupt all sentences being spoken at the moment

```bash
// Require the module
var picoSpeaker = require('pico-speaker');

// Define configuration
var picoConfig = {
   AUDIO_DEVICE: 'default:CARD=PCH',
   LANGUAGE: 'fr-FR'
};

// Initialize with config
picoSpeaker.init(picoConfig);

// Say hello
speaker.speak('Hello !').then(function() {
       // console.log("done");
    }.bind(this));
```

## Configuration

You can pass a configuration object at the initialisation time (picoSpeaker.init(yourConfObject)). If you don't the following config will be used.

```bash
/* DEFAULT CONFIG */
    var CONFIG = {
        AUDIO_DEVICE: null, // will use default alsa device
        LANGUAGE: 'en-US'
    };
```

## Tests

These will be added soon. Please do not hesitate to add some !

## About the Author

I am a full-stack Javascript developer based in Lyon, France.

[Check out my website](http://www.thomschell.com)

## License

pico-speaker is dual licensed under the MIT license and GPL.
For more information click [here](https://opensource.org/licenses/MIT).