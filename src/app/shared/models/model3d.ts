import { ICard } from 'src/app/interfaces/card.interface';
import { File } from './file';
import { User } from './user';

export interface Model3d extends ICard {
  id: string;
  name: string;
  price: number;
  createdAt?: Date;
  files?: Array<File>;
  user?: User;
}
