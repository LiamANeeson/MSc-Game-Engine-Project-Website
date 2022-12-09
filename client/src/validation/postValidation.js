import * as yup from 'yup';

export const createPostSchema = yup.object().shape({
    title: yup.string().required("Please enter a title").matches(
        /^(?!(\s+$))/,
        "Please enter a title "
    ),
    description: yup.string().required("Please enter description").matches(
        /^(?!(\s+$))/,
        "Please enter a description "
    ),
    tags: yup.string().max(30, "Tags must not be longer than 30 characters").required("Please enter tag").matches(
        /^(?!,)(?!.*,$)[\a-zA-Z]+(?:[,][\a-zA-Z]+)*$/,
        "Tags must include only letters and be separated by commas"
    ),
});

export const createAnswerSchema = yup.object().shape({
    answer: yup.string().required("Please enter your answer"),
});

export const createCommentSchema = yup.object().shape({
    answer_comment: yup.string().required("Please enter your comment"),
});
