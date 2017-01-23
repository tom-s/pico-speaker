var _ = require('lodash');
var exec = require('child_process').exec;
var crypto = require('crypto');
var Q = require('q');

var speaker = (function() {
    /* DEFAULT CONFIG */
    var CONFIG = {
        AUDIO_DEVICE: null,
        LANGUAGE: 'en-US',
        NAME: null
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
            
            if(CONFIG.NAME){
                var fileName = CONFIG.NAME + '.wav';
            }else{
                var md5 = crypto.createHash('md5');
                var fileName = '/tmp/' + md5.update(text).digest('hex') + '.wav'; 
            }

            if(CONFIG.AUDIO_DEVICE) {
                var cmd = 'pico2wave -l ' + CONFIG.LANGUAGE + ' -w ' + fileName + ' " ' + text + '" && aplay -D ' + CONFIG.AUDIO_DEVICE + ' ' + fileName;
            } else {
                var cmd = 'pico2wave -l ' + CONFIG.LANGUAGE + ' -w ' + fileName + ' " ' + text + '" && aplay ' + fileName;
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
