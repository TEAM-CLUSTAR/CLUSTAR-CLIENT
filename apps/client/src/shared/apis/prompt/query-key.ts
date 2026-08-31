export const PROMPT_KEY = {
  ALL: ['prompts'],
  CREATE: () => [...PROMPT_KEY.ALL, 'create'],
  DELETE: () => [...PROMPT_KEY.ALL, 'delete'],
};

export const AI_KEY = {
  ALL: ['ai'],
  CREATE: () => [...AI_KEY.ALL, 'create'],
  SAVE: () => [...AI_KEY.ALL, 'save'],
};
