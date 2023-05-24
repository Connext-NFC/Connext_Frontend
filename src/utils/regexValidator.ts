import dayjs, { Dayjs } from "dayjs";

// const { handleAlertChange } = useContext(AlertContext);

const REGEX_EMAIL: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const REGEX_PASSWORD: RegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,50}$/;
const REGEX_NAME: RegExp = /^[A-Z]{2,50}$/i;
const REGEX_PHONE: RegExp = /^0[0-9]{8,9}$/;
const REGEX_LINK: RegExp = /^(https?):\/\/[^\s/$.?#].[^\s]*$/;

/**
 *
 * \W mean [-+_!@#$%^&*.,?]
 * \d mean [0-9]
 *
 */

// TODO: complete validate service and create type.ts

// Link (condition): https://docs.google.com/spreadsheets/d/1-nNysbeuW7TwcETpD-qhaH2sUUq7HEduEp8e9Uw1Ndw/edit#gid=1848808472
const regexValidator = {
  email(email: string): boolean {
    return REGEX_EMAIL.test(email);
  },
  password(password: string): boolean {
    return REGEX_PASSWORD.test(password);
  },
  name(name: string): boolean {
    return REGEX_NAME.test(name);
  },
  bornDate(bornDate: Dayjs): boolean {
    let now = dayjs();
    console.log(now.diff(bornDate, "year"));
    return bornDate.isValid() && now.diff(bornDate, "year") >= 5;
    // Age >= 5 for register
  },
  phone(phoneNumber: string): boolean {
    return REGEX_PHONE.test(phoneNumber);
  },
  url(url: string): boolean {
    return REGEX_LINK.test(url);
  },
};

export { regexValidator };

/**
 *
 * const isCorrect:boolean = regexValidator.email("......")
 *
 */
