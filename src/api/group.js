export const LIST_GROUP = "/group/list";
export const GET_GROUP = (id) => {
    return `/group/${id}`
};
export const GET_MEMBER = (assessmentId) => {
    return `/student-group/${assessmentId}/members`
};
export const PUT_GROUP = (id) => {
    return `/group/update/${id}`
};

export const GET_STUDENT_ASSESSMENT = (id) => {
    return `/group/studentAssignmentDropdown/${id}`
};
