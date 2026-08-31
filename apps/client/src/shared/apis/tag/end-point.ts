export const TAG_END_POINT = {
  GET_TAG: 'api/v1/tag',
  POST_TAG: 'api/v1/tag',
  GET_PARENT_TAGS: 'api/v1/tag/parents',
  GET_CHILD_TAGS: (parentTagId: number) =>
    `api/v1/tag/parents/${parentTagId}/children`,
};
