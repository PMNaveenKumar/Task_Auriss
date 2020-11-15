"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.IsValidMobileNumber = function (mobileNumber) {
        var mobileNumberRegEx = new RegExp('^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[6789]\\d{9}$');
        var isValid = mobileNumberRegEx.test(mobileNumber);
        return { valid: isValid, errorMessage: isValid ? null : "Invalid Mobile Number" };
    };
    Validator.IsValidUserName = function (userName) {
        if (!userName) {
            return { valid: false, errorMessage: "Invalid Username" };
        }
        if (userName.match(/^ *$/) !== null) {
            return { valid: false, errorMessage: "Invalid Username" };
        }
        return { valid: true, errorMessage: null };
    };
    Validator.IsValidEmail = function (email) {
        var emailRegEx = /^[a-z][a-z0-9_\.\-]*@[a-z0-9\.\-]+\.[a-z]{2,4}$/i;
        var isValid = emailRegEx.test(email);
        return { valid: isValid, errorMessage: isValid ? null : "Invalid email" };
    };
    Validator.IsValidAddress = function (address) {
        if (address.address1 && address.address1.match(/^ *$/) !== null) {
            return { valid: false, errorMessage: false ? null : "Invalid address1" };
        }
        if (address.address2 && address.address2.match(/^ *$/) !== null) {
            return { valid: false, errorMessage: false ? null : "Invalid address2" };
        }
        if (address.pincode) {
            var pincodeRegEx = new RegExp('^[1-9][0-9]{5}$');
            var isValid = pincodeRegEx.test(address.pincode.toString());
            return { valid: isValid, errorMessage: isValid ? null : "Invalid pincode" };
        }
        return { valid: true, errorMessage: null };
    };
    Validator.IsValidPassword = function (userName) {
        if (!userName) {
            return { valid: false, errorMessage: "Invalid Password" };
        }
        if (userName.match(/^ *$/) !== null) {
            return { valid: false, errorMessage: "Invalid Password" };
        }
        return { valid: true, errorMessage: null };
    };
    Validator.isValidUserId = function (id) {
        var validUserId = new RegExp('^[0-9]+$');
        var isValid = validUserId.test(id.toString());
        if (!id || !isValid) {
            return { valid: false, errorMessage: "Invalid user id" };
        }
        return { valid: true, errorMessage: null };
    };
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map