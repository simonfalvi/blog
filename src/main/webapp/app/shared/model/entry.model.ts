import dayjs from 'dayjs';
import { IBlog } from 'app/shared/model/blog.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IEntry {
  id?: number;
  title?: string | null;
  content?: string;
  date?: string | null;
  blog?: IBlog | null;
  tags?: ITag[] | null;
}

export const defaultValue: Readonly<IEntry> = {};
