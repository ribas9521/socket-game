import PlayerInterface, { PlayerProps } from './types'
import Matter, { Vector } from "matter-js";

class Player implements PlayerInterface {

  public x: number;
  public y: number;
  public id: string
  public body: Matter.Body
  public speed: number
  public engine: Matter.Engine

  constructor(engine: Matter.Engine, { x, y, id }: PlayerProps) {
    this.engine = engine
    this.x = x;
    this.y = y;
    this.id = id;
    this.speed = 5;
    this.body = Matter.Bodies.circle(
      x,
      y,
      20,
      {
        isStatic: false,
      }
    );
    this.body.label = id
  }
  setMass(mass: number) {
    Matter.Body.setMass(this.getSpawnedBody(), mass);
  }
  getSpawnedBody(): Matter.Body {
    return this.engine.world.bodies.filter((body) => body.label === this.id)[0]
  }
  setPosition(position: Vector) {
    Matter.Body.setPosition(this.getSpawnedBody(), position)
  }
  moveUp(): void {
    const vector = Matter.Vector.create(0, -1 * this.speed);
    Matter.Body.setVelocity(this.getSpawnedBody(), vector);
  }
  moveDown(): void {
    const vector = Matter.Vector.create(0, 1 * this.speed);
    Matter.Body.setVelocity(this.getSpawnedBody(), vector);
  }
  moveLeft(): void {
    const vector = Matter.Vector.create(-1 * this.speed, 0);
    Matter.Body.setVelocity(this.getSpawnedBody(), vector);
  }
  moveRight(): void {
    const vector = Matter.Vector.create(1 * this.speed, 0);
    Matter.Body.setVelocity(this.getSpawnedBody(), vector);
  }
}

export default Player