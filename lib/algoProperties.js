var bignum = require('bignum');
var multiHashing = require('multi-hashing');
var util = require('./util.js');

var diff1 = global.diff1 = 0x00000000ffff0000000000000000000000000000000000000000000000000000;

var algos = module.exports = global.algos = {

    sha256: {
        //Uncomment diff if you want to use hardcoded truncated diff
        //diff: '00000000ffff0000000000000000000000000000000000000000000000000000',
        hash: function () {
            return function () {
                return util.sha256d.apply(this, arguments);
            }
        }
    },
    sha256d: {
        //Uncomment diff if you want to use hardcoded truncated diff
        //diff: '00000000ffff0000000000000000000000000000000000000000000000000000',
        hash: function () {
            return function () {
                return multiHashing.sha256d.apply(this, arguments);
            }
        }
    },
    'scrypt': {
        //Uncomment diff if you want to use hardcoded truncated diff
        //diff: '0000ffff00000000000000000000000000000000000000000000000000000000',
        multiplier: Math.pow(2, 16),
        hash: function (coinConfig) {
            var nValue = coinConfig.nValue || 1024;
            var rValue = coinConfig.rValue || 1;
            return function (data) {
                return multiHashing.scrypt(data, nValue, rValue);
            }
        }
    },
    'scrypt-og': {
        //Aiden settings
        //Uncomment diff if you want to use hardcoded truncated diff
        //diff: '0000ffff00000000000000000000000000000000000000000000000000000000',
        multiplier: Math.pow(2, 16),
        hash: function (coinConfig) {
            var nValue = coinConfig.nValue || 64;
            var rValue = coinConfig.rValue || 1;
            return function (data) {
                return multiHashing.scrypt(data, nValue, rValue);
            }
        }
    },
    'scrypt-jane': {
        multiplier: Math.pow(2, 16),
        hash: function (coinConfig) {
            var nTimestamp = coinConfig.chainStartTime || 1367991200;
            var nMin = coinConfig.nMin || 4;
            var nMax = coinConfig.nMax || 30;
            return function (data, nTime) {
                return multiHashing.scryptjane(data, nTime, nTimestamp, nMin, nMax);
            }
        }
    },
    'scrypt-n': {
        multiplier: Math.pow(2, 16),
        hash: function (coinConfig) {

            var timeTable = coinConfig.timeTable || {
                "2048": 1389306217, "4096": 1456415081, "8192": 1506746729, "16384": 1557078377, "32768": 1657741673,
                "65536": 1859068265, "131072": 2060394857, "262144": 1722307603, "524288": 1769642992
            };

            var nFactor = (function () {
                var n = Object.keys(timeTable).sort().reverse().filter(function (nKey) {
                    return Date.now() / 1000 > timeTable[nKey];
                })[0];

                var nInt = parseInt(n);
                return Math.log(nInt) / Math.log(2);
            })();

            return function (data) {
                return multiHashing.scryptn(data, nFactor);
            }
        }
    },
    sha1: {
        hash: function () {
            return function () {
                return multiHashing.sha1.apply(this, arguments);
            }
        }
    },
    x11: {
        hash: function () {
            return function () {
                return multiHashing.x11.apply(this, arguments);
            }
        }
    },
    x13: {
        hash: function () {
            return function () {
                return multiHashing.x13.apply(this, arguments);
            }
        }
    },
    x15: {
        hash: function () {
            return function () {
                return multiHashing.x15.apply(this, arguments);
            }
        }
    },
    x16r: {
        multiplier: Math.pow(2, 8),
        hash: function () {
            return function () {
                return multiHashing.x16r.apply(this, arguments);
            }
        }
    },
    x17: {
        hash: function () {
            return function () {
                return multiHashing.x17.apply(this, arguments);
            }
        }
    },
    x25x: {
        hash: function () {
            return function () {
                return multiHashing.x25x.apply(this, arguments);
            }
        }
    },
    nist5: {
        hash: function () {
            return function () {
                return multiHashing.nist5.apply(this, arguments);
            }
        }
    },
    quark: {
        hash: function () {
            return function () {
                return multiHashing.quark.apply(this, arguments);
            }
        }
    },
    keccak: {
        multiplier: Math.pow(2, 8),
        hash: function (coinConfig) {
            if (coinConfig.normalHashing === true) {
                return function (data, nTimeInt) {
                    return multiHashing.keccak(multiHashing.keccak(Buffer.concat([data, new Buffer(nTimeInt.toString(16), 'hex')])));
                };
            }
            else {
                return function () {
                    return multiHashing.keccak.apply(this, arguments);
                }
            }
        }
    },
    allium: {
        multiplier: Math.pow(2, 8),
        hash: function () {
            return function () {
                return multiHashing.allium.apply(this, arguments);
            }
        }
    },
    blake: {
        multiplier: Math.pow(2, 8),
        hash: function () {
            return function () {
                return multiHashing.blake.apply(this, arguments);
            }
        }
    },
    skein: {
        hash: function () {
            return function () {
                return multiHashing.skein.apply(this, arguments);
            }
        }
    },
    groestl: {
        multiplier: Math.pow(2, 8),
        hash: function () {
            return function () {
                return multiHashing.groestl.apply(this, arguments);
            }
        }
    },
    fugue: {
        multiplier: Math.pow(2, 8),
        hash: function () {
            return function () {
                return multiHashing.fugue.apply(this, arguments);
            }
        }
    },
    shavite3: {
        hash: function () {
            return function () {
                return multiHashing.shavite3.apply(this, arguments);
            }
        }
    },
    hefty1: {
        hash: function () {
            return function () {
                return multiHashing.hefty1.apply(this, arguments);
            }
        }
    },
    neoscrypt: {
        multiplier: Math.pow(2, 5),
        hash: function () {
            return function () {
                return multiHashing.neoscrypt.apply(this, arguments);
            }
        }
    },
    lyra2: {
        multiplier: Math.pow(2, 8),
        hash: function () {
            return function () {
                return multiHashing.lyra2re.apply(this, arguments);
            }
        }
    },
    lyra2v2: {
        multiplier: Math.pow(2, 8),
        hash: function () {
            return function () {
                return multiHashing.lyra2rev2.apply(this, arguments);
            }
        }
    },
    lyra2v3: {
        multiplier: Math.pow(2, 8),
        hash: function () {
            return function () {
                return multiHashing.lyra2rev3.apply(this, arguments);
            }
        }
    },
    lyra2re: {
        multiplier: Math.pow(2, 7),
        hash: function () {
            return function () {
                return multiHashing.lyra2re.apply(this, arguments);
            }
        }
    },
    lyra2re2: {
        multiplier: Math.pow(2, 8),
        hash: function () {
            return function () {
                return multiHashing.lyra2re2.apply(this, arguments);
            }
        }
    },
    lyra2rev2: {
        multiplier: Math.pow(2, 8),
        hash: function () {
            return function () {
                return multiHashing.lyra2rev2.apply(this, arguments);
            }
        }
    },
    lyra2z: {
        multiplier: Math.pow(2, 8),
        hash: function () {
            return function () {
                return multiHashing.lyra2z.apply(this, arguments);
            }
        }
    },
    qubit: {
        hash: function () {
            return function () {
                return multiHashing.qubit.apply(this, arguments);
            }
        }
    },
    odo: {
        hash: function (coinConfig) {
            var odoKey = function (nTime) {
                return nTime - nTime % coinConfig.shapechangeInterval;
            };

            return function (data, nTime) {
                return multiHashing.odo(data, odoKey(nTime));
            }
        }
    },
    'yescryptR8': {
        multiplier: 65536,
        diff: parseInt('0x0007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
        hash: function () {
            return function () {
                return multiHashing.yespower_0_5_R8.apply(this, arguments);
            }
        }
    },
    'yescryptR8G': {
        multiplier: 65536,
        diff: parseInt('0x0007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
        hash: function () {
            return function () {
                return multiHashing.yespower_0_5_R8G.apply(this, arguments);
            }
        }
    },
    'yescryptR16': {
        multiplier: 65536,
        diff: parseInt('0x0007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
        hash: function () {
            return function () {
                return multiHashing.yespower_0_5_R16.apply(this, arguments);
            }
        }
    },
    'yescryptR24': {
        multiplier: 65536,
        diff: parseInt('0x0007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
        hash: function () {
            return function () {
                return multiHashing.yespower_0_5_R24.apply(this, arguments);
            }
        }
    },
    'yescryptR32': {
        multiplier: 65536,
        diff: parseInt('0x0007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
        hash: function () {
            return function () {
                return multiHashing.yespower_0_5_R32.apply(this, arguments);
            }
        }
    },
    'yespower': {
        multiplier: 65536,
        hash: function () {
            return function () {
                return multiHashing.yespower.apply(this, arguments);
            }
        }
    },
    'yespowerSUGAR': {
        multiplier: Math.pow(2, 16),
        hash: function (coinConfig) {
            var nValue = coinConfig.nValue || 2048;
            var rValue = coinConfig.rValue || 32;
            return function (data) {
                return multiHashing.yespower_sugar(data, nValue, rValue);
            }
        }
    },
	'yespowerMGPC': {
        multiplier: Math.pow(2, 16),
        hash: function (coinConfig) {
            var nValue = coinConfig.nValue || 2048;
            var rValue = coinConfig.rValue || 32;
            return function (data) {
                return multiHashing.yespower_mgpc(data, nValue, rValue);
            }
        }
    },
    'yespowerLTNCG': {
        multiplier: Math.pow(2, 16),
        hash: function (coinConfig) {
            var nValue = coinConfig.nValue || 2048;
            var rValue = coinConfig.rValue || 32;
            return function (data) {
                return multiHashing.yespower_ltncg(data, nValue, rValue);
            }
        }
    },
    'yespowerR16': {
        multiplier: 65536,
        hash: function () {
            return function () {
                return multiHashing.yespower_r16.apply(this, arguments);
            }
        }
    },
	'ghostrider': {
		multiplier: Math.pow(2,8),
		hash: function () {
			return function () {
				return multiHashing.ghostrider.apply(this, arguments);
			}
		}
	}
    /*'vipstar': {
        hash: function () {
            return function () {
                return multiHashing.sha256d.apply(this, arguments);
            }
        }
    }
    */
};


for (var algo in algos) {
    if (!algos[algo].multiplier)
        algos[algo].multiplier = 1;
}
