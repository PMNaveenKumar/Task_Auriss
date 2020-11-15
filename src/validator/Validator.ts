import { ErrorMessage } from "../interfaces/errormessage";
import { UserProfile } from "../interfaces/userprofile";

export class Validator {
    public static IsValidMobileNumber(mobileNumber: string): ErrorMessage {
        const mobileNumberRegEx = new RegExp('^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[6789]\\d{9}$');
        const isValid = mobileNumberRegEx.test(mobileNumber);
        return { valid: isValid, errorMessage: isValid ? null : "Invalid Mobile Number" };
    }

    public static IsValidUserName(userName: UserProfile['userName']): ErrorMessage {
        if (!userName) {
            return { valid: false, errorMessage: "Invalid Username" };
        }
        if (userName.match(/^ *$/) !== null) {
            return { valid: false, errorMessage: "Invalid Username" };
        }
        return { valid: true, errorMessage: null };
    }

    public static IsValidEmail(email: UserProfile['email']): ErrorMessage {
        const emailRegEx = /^[a-z][a-z0-9_\.\-]*@[a-z0-9\.\-]+\.[a-z]{2,4}$/i;
        const isValid = emailRegEx.test(email);
        return { valid: isValid, errorMessage: isValid ? null : "Invalid email" };
    }

    public static IsValidAddress(address: UserProfile['address']): ErrorMessage {
        if (address.address1 && address.address1.match(/^ *$/) !== null) {
            return { valid: false, errorMessage: false ? null : "Invalid address1" };
        }
        
        if (address.address2 && address.address2.match(/^ *$/) !== null) {
            return { valid: false, errorMessage: false ? null : "Invalid address2" };
        }

        if (address.pincode) {
            const pincodeRegEx = new RegExp('^[1-9][0-9]{5}$');
            const isValid = pincodeRegEx.test(address.pincode.toString());
            return { valid: isValid, errorMessage: isValid ? null : "Invalid pincode" };
        }
        
        return { valid: true, errorMessage: null };
    }

    public static IsValidPassword(userName: UserProfile['password']): ErrorMessage {
        if (!userName) {
            return { valid: false, errorMessage: "Invalid Password" };
        }
        if (userName.match(/^ *$/) !== null) {
            return { valid: false, errorMessage: "Invalid Password" };
        }
        return { valid: true, errorMessage: null };
    }

    public static isValidUserId(id: number): ErrorMessage {

        const validUserId = new RegExp('^[0-9]+$');
        const isValid = validUserId.test(id.toString());

        if(!id || !isValid) {
            return { valid: false, errorMessage: "Invalid user id" };
        }

        return { valid: true, errorMessage: null };        
    }
}