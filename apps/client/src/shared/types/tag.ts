import { components } from './schema';

type TagResponse = components['schemas']['TagResponse'];

export interface TagDisplayInfo {
  tagId: NonNullable<TagResponse['tagId']>;
  name: NonNullable<TagResponse['name']>;
  color: NonNullable<TagResponse['color']>;
}
