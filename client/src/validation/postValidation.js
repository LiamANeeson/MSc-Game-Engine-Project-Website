import * as yup from 'yup';

export const createPostSchema = yup.object().shape({
    title: yup.string().required("Please enter a title"),
    description: yup.string().required("Please enter description"),
    tags: yup.string().required("Please enter tag"),
});

export const createAnswerSchema = yup.object().shape({
    answer: yup.string().required("Please enter your answer"),
});
