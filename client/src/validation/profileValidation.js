import * as yup from 'yup';

export const profileSchema = yup.object().shape({
    userName: yup.string().min(4, "User name must be longer than 4 characters").max(20, "User name must not be longer than 20 characters").required("Please enter a user name").matches(
        /^(?!(\s+$))/,
        "Please enter a user name"
    ),
    firstName: yup.string().required("Please enter a first name").matches(
        /^(?!(\s+$))/,
        "Please enter a first name"
    ),
    lastName: yup.string().required("Please enter a last name").matches(
        /^(?!(\s+$))/,
        "Please enter a last name"
    ),
});

