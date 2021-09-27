import { IEntry } from 'app/shared/model/entry.model';

export interface ITag {
  id?: number;
  name?: string | null;
  entries?: IEntry[] | null;
}

export const defaultValue: Readonly<ITag> = {};
