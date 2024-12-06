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