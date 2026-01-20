export const PROMPT_KEY = {
  ALL: ['prompts'],
  CREATE: () => [...PROMPT_KEY.ALL, 'create'],
  DELETE: () => [...PROMPT_KEY.ALL, 'delete'],
};
