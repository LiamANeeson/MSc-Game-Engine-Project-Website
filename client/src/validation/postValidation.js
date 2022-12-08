import * as yup from 'yup';

export const createPostSchema = yup.object().shape({
    title: yup.string().required("Please enter a title"),
    description: yup.string().required("Please enter description"),
    tags: yup.string().required("Please enter tag").matches(
        /^([\,a-zA-Z0-9]{1,30})$/,
        "tags must not be longer than 30 characters, only numbers and letters, separated by comma"
    ),
});

export const createAnswerSchema = yup.object().shape({
    answer: yup.string().required("Please enter your answer"),
});

export const createCommentSchema = yup.object().shape({
    answer_comment: yup.string().required("Please enter your comment"),
});
