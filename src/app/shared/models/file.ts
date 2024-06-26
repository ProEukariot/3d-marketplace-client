export interface File {
  id: string;
  name: string;
  size: number;
  target: string;
  access: 'private' | 'public';
}
