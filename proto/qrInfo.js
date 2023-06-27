/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.TslQRInfo = (function() {

    /**
     * Namespace TslQRInfo.
     * @exports TslQRInfo
     * @namespace
     */
    var TslQRInfo = {};
	console.log("TslQRInfo")

    TslQRInfo.QRInfo = (function() {

        /**
         * Properties of a QRInfo.
         * @memberof TslQRInfo
         * @interface IQRInfo
         * @property {string|null} [deviceId] QRInfo deviceId
         * @property {number|Long|null} [projectId] QRInfo projectId
         * @property {number|Long|null} [timestamp] QRInfo timestamp
         */

        /**
         * Constructs a new QRInfo.
         * @memberof TslQRInfo
         * @classdesc Represents a QRInfo.
         * @implements IQRInfo
         * @constructor
         * @param {TslQRInfo.IQRInfo=} [properties] Properties to set
         */
        function QRInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QRInfo deviceId.
         * @member {string} deviceId
         * @memberof TslQRInfo.QRInfo
         * @instance
         */
        QRInfo.prototype.deviceId = "";

        /**
         * QRInfo projectId.
         * @member {number|Long} projectId
         * @memberof TslQRInfo.QRInfo
         * @instance
         */
        QRInfo.prototype.projectId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * QRInfo timestamp.
         * @member {number|Long} timestamp
         * @memberof TslQRInfo.QRInfo
         * @instance
         */
        QRInfo.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new QRInfo instance using the specified properties.
         * @function create
         * @memberof TslQRInfo.QRInfo
         * @static
         * @param {TslQRInfo.IQRInfo=} [properties] Properties to set
         * @returns {TslQRInfo.QRInfo} QRInfo instance
         */
        QRInfo.create = function create(properties) {
            return new QRInfo(properties);
        };

        /**
         * Encodes the specified QRInfo message. Does not implicitly {@link TslQRInfo.QRInfo.verify|verify} messages.
         * @function encode
         * @memberof TslQRInfo.QRInfo
         * @static
         * @param {TslQRInfo.IQRInfo} message QRInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QRInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceId);
            if (message.projectId != null && Object.hasOwnProperty.call(message, "projectId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.projectId);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified QRInfo message, length delimited. Does not implicitly {@link TslQRInfo.QRInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof TslQRInfo.QRInfo
         * @static
         * @param {TslQRInfo.IQRInfo} message QRInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QRInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QRInfo message from the specified reader or buffer.
         * @function decode
         * @memberof TslQRInfo.QRInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TslQRInfo.QRInfo} QRInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QRInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TslQRInfo.QRInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.deviceId = reader.string();
                    break;
                case 2:
                    message.projectId = reader.int64();
                    break;
                case 3:
                    message.timestamp = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a QRInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof TslQRInfo.QRInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {TslQRInfo.QRInfo} QRInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QRInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a QRInfo message.
         * @function verify
         * @memberof TslQRInfo.QRInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        QRInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                if (!$util.isString(message.deviceId))
                    return "deviceId: string expected";
            if (message.projectId != null && message.hasOwnProperty("projectId"))
                if (!$util.isInteger(message.projectId) && !(message.projectId && $util.isInteger(message.projectId.low) && $util.isInteger(message.projectId.high)))
                    return "projectId: integer|Long expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a QRInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof TslQRInfo.QRInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {TslQRInfo.QRInfo} QRInfo
         */
        QRInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.TslQRInfo.QRInfo)
                return object;
            var message = new $root.TslQRInfo.QRInfo();
            if (object.deviceId != null)
                message.deviceId = String(object.deviceId);
            if (object.projectId != null)
                if ($util.Long)
                    (message.projectId = $util.Long.fromValue(object.projectId)).unsigned = false;
                else if (typeof object.projectId === "string")
                    message.projectId = parseInt(object.projectId, 10);
                else if (typeof object.projectId === "number")
                    message.projectId = object.projectId;
                else if (typeof object.projectId === "object")
                    message.projectId = new $util.LongBits(object.projectId.low >>> 0, object.projectId.high >>> 0).toNumber();
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a QRInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof TslQRInfo.QRInfo
         * @static
         * @param {TslQRInfo.QRInfo} message QRInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        QRInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.deviceId = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.projectId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.projectId = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                object.deviceId = message.deviceId;
            if (message.projectId != null && message.hasOwnProperty("projectId"))
                if (typeof message.projectId === "number")
                    object.projectId = options.longs === String ? String(message.projectId) : message.projectId;
                else
                    object.projectId = options.longs === String ? $util.Long.prototype.toString.call(message.projectId) : options.longs === Number ? new $util.LongBits(message.projectId.low >>> 0, message.projectId.high >>> 0).toNumber() : message.projectId;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            return object;
        };

        /**
         * Converts this QRInfo to JSON.
         * @function toJSON
         * @memberof TslQRInfo.QRInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QRInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return QRInfo;
    })();

    return TslQRInfo;
})();

module.exports = $root;
