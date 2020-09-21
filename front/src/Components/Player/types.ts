export default interface PlayerInterface extends PlayerProps {
  body: Matter.Body
  speed: number
  moveUp: () => void
  moveDown: () => void
  moveLeft: () => void
  moveRight: () => void
}

export interface PlayerProps extends Position {
  id: string;
}

export interface Position {
  x: number;
  y: number;
}
