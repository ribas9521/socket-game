
export interface PlayerProps extends Position {
  id: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Movement {
  direction: string;
  id: string;
}
