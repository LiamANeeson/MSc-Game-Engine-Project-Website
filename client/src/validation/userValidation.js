import * as yup from 'yup';

export const userSignUpSchema = yup.object().shape({
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
    email: yup.string().email("Invalid email").required("Please enter a Email"),
    password: yup.string().required('Please Enter your password')
        .matches(
            /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,\.])[0-9a-zA-Z!@#$%^&*,\.]{8,20}$/,
            "Password at least 8 characters, including numbers, upper and lower case letters and special characters three or more"
        ),
    password_confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const userSignInSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Please enter an email"),
    password: yup.string().required('Please Enter your password')
        .matches(
            /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,\.])[0-9a-zA-Z!@#$%^&*,\.]{8,20}$/,
            "Password at least 8 characters, including numbers, upper and lower case letters and special characters three or more"
        ),
});

export const userResetPasswordSchema = yup.object().shape({
    oldpassword: yup.string().required('Please Enter your password')
        .matches(
            /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,\.])[0-9a-zA-Z!@#$%^&*,\.]{8,20}$/,
            "Password at least 8 characters, including numbers, upper and lower case letters and special characters three or more"
        ),
    newpassword: yup.string().required('Please Enter your password')
        .matches(
            /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,\.])[0-9a-zA-Z!@#$%^&*,\.]{8,20}$/,
            "Password at least 8 characters, including numbers, upper and lower case letters and special characters three or more"
        ),
});