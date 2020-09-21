export default interface BulletInterface extends BulletProps {
  engine: Matter.Engine
  body: Matter.Body
  speed?: number
  move: (angle: number) => void;
  die: (miliseconds: number) => void;
  getSpawnedBody: () => Matter.Body
}

export interface BulletProps {
  id: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
}
