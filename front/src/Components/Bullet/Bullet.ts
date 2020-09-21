import BulletInterface, { BulletProps } from './types'
import Matter, { Vector } from "matter-js";

class Bullet implements BulletInterface {

  public x: number;
  public y: number;
  public id: string
  public body: Matter.Body
  public speed: number
  public engine: Matter.Engine
  public angle: number
  public distance: number


  constructor(engine: Matter.Engine, { x, y, id, angle, distance }: BulletProps) {
    this.engine = engine;
    this.x = x;
    this.y = y;
    this.id = id;
    this.speed = 10;
    this.angle = angle;
    this.distance = distance;
    let spawnPosition = Vector.create(x, y);
    spawnPosition.x += Math.cos(angle || 0) * distance;
    spawnPosition.y += Math.sin(angle || 0) * distance;
    this.body = Matter.Bodies.circle(
      spawnPosition.x,
      spawnPosition.y,
      10,
      {
        isStatic: false,
      }
    );
    this.body.label = id


    this.move(angle);
    this.die(1500);

  }

  setMass(mass: number) {
    Matter.Body.setMass(this.getSpawnedBody(), mass);

  }
  getSpawnedBody(): Matter.Body {
    return this.engine.world.bodies.filter((body) => body.label === this.id)[0]
  }
  move(angle: number) {
    Matter.Body.setVelocity(this.body, {
      x: Math.cos(angle) * this.speed,
      y: Math.sin(angle) * this.speed,
    });
  }
  die(miliseconds: number) {
    setTimeout(() => {
      Matter.World.remove(this.engine.world, this.body);
    }, miliseconds);
  }

}

export default Bullet