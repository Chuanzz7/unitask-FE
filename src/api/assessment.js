export const PUT_ASSESSMENT = "/assessment/update/";
export const LIST_ASSESSMENT = "/assessment/list";

export const GET_ASSESSMENT = (id) => {
    return `/assessment/${id}`
};

export const PUT_ASSESSMENT_FILE = (id) => {
    return `/assessment/update/${id}/file`;
};

export const DELETE_ASSESSMENT_FILE = (id) => {
    return `/assessment/file/${id}`;
};

export const LIST_ASSESSMENT_SUBMISSION = "/assessment-submission/list";

export const GET_ASSESSMENT_SUBMISSION = (id) => {
    return `/assessment-submission/${id}`
};

export const GRADE_ASSESSMENT = (id) => {
    return `/assessment-submission/grade/${id}`
};

export const RESUBMIT_ASSESSMENT = (id) => {
    return `/assessment-submission/resubmit/${id}`
};
