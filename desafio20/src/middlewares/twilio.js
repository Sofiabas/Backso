import twilio from "twilio";

const ADMIN_PHONE = process.env.adminPhone;

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const twilioPhoneNumber = process.env.twilioPhoneNumber;
const twilioWaNumber = process.env.twilioWaNumber;

const messageOptions = {
  from: twilioPhoneNumber,
};

const client = twilio(accountSid, authToken);

export { ADMIN_PHONE, twilioWaNumber, messageOptions, client };
