var _ = require('lodash');
var exec = require('child_process').exec;
var Q = require('q');

var speaker = (function() {
    /* DEFAULT CONFIG */
    var CONFIG = {
        AUDIO_DEVICE: null,
        LANGUAGE: 'en-US'
    };
    var lastText = '';
    return {
        init: function (props) {
            if(props) {
                _.assign(CONFIG, props);
            }
        },
        speak: function(text) {
            var deferred = Q.defer();
            if(CONFIG.AUDIO_DEVICE) {
                var cmd = 'pico2wave -w output.wav " ' + text + '" && aplay -l ' + CONFIG.LANGUAGE + ' -D ' + CONFIG.AUDIO_DEVICE + ' output.wav';
            } else {
                var cmd = 'pico2wave -w output.wav " ' + text + '" && aplay -l ' + CONFIG.LANGUAGE + ' output.wav';
            }
            exec(cmd, function(error) {
                // command output is in stdout
                if(error) {
                    console.log('error while executing command ', cmd);
                }
                lastText = text;
                deferred.resolve();
            });
            return deferred.promise;
        },
        repeat: function() {
            this.speak(lastText);
        },
        shutUp: function() {
            var deferred = Q.defer();
            var cmd = 'killall aplay';
            exec(cmd, function(error, stdout, stderr) {
                // command output is in stdout
                if(error) {
                    console.log('error while executing command ', cmd);
                }
                deferred.resolve();
            });
            return deferred.promise;
        }
    };
})();

module.exports = speaker;