import React, { useEffect } from "react";
import Matter, { Constraint, Body, Engine } from "matter-js";
import socketIOClient from "socket.io-client";
import { PlayerProps } from "../Components/Player/types";
import Player from "../Components/Player/Player";
import Bullet from "../Components/Bullet/Bullet";
import { BulletProps } from "../Components/Bullet/types";
const ENDPOINT = "http://192.168.100.19:3333";

const Game: React.FC = () => {
  let playerId = "";
  let me: Matter.Body;
  let playerList: Player[] = [];
  let socket: SocketIOClient.Socket;
  let engine: Matter.Engine;

  const spawnPlayers = (_playerList: PlayerProps[]) => {
    for (const player of _playerList) {
      const _player = new Player(engine, {
        x: player.x,
        y: player.y,
        id: player.id,
      });
      Matter.World.add(engine.world, _player.body);
      _player.setMass(1);
      playerList.push(_player);
    }
  };

  const spawnPlayer = (player: PlayerProps) => {
    if (!playerAlreadySpawned(player)) {
      const _player = new Player(engine, player);
      Matter.World.add(engine.world, _player.body);
      _player.setMass(1);
      playerList.push(_player);
    }
  };

  const playerAlreadySpawned = (player: PlayerProps) => {
    return engine.world.bodies.some((body) => body.label === player.id);
  };

  const findPlayerById = (playerId: string): Player | undefined => {
    return playerList.find((_player) => _player.id === playerId);
  };

  const spawnWalls = () => {
    const rec1 = Matter.Bodies.rectangle(300, 0, 600, 20, {
      isStatic: true,
    });
    rec1.label = "wall";
    const rec2 = Matter.Bodies.rectangle(300, 600, 600, 20, {
      isStatic: true,
    });
    rec2.label = "wall";
    const rec3 = Matter.Bodies.rectangle(0, 300, 20, 600, {
      isStatic: true,
    });
    rec3.label = "wall";
    const rec4 = Matter.Bodies.rectangle(600, 300, 20, 600, {
      isStatic: true,
    });
    rec4.label = "wall";

    Matter.World.add(engine.world, [rec1, rec2, rec3, rec4]);
  };

  const getMe = () => {
    const myPlayer = playerList.find((_player) => _player.id === playerId);
    if (myPlayer) {
      me = myPlayer.getSpawnedBody();
    }
  };

  const spawnBullet = (bullet: BulletProps) => {
    const _bullet = new Bullet(engine, bullet);
    console.log(bullet);
    Matter.World.add(engine.world, _bullet.body);
    return bullet;
  };

  const setUpGame = () => {
    const gameRef = document.getElementById("gameDiv") as HTMLDivElement;

    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    engine = Engine.create({});
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    var render = Render.create({
      element: gameRef,
      engine: engine,
      options: {
        width: 600,
        height: 600,
        wireframes: false,
      },
    });
    spawnWalls();

    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0,
          render: {
            visible: false,
          },
        } as Constraint,
      });

    World.add(engine.world, mouseConstraint);

    socket = socketIOClient(ENDPOINT);

    socket.on("connect", () => {
      playerId = socket.id;
    });

    socket.on("player-list", (playerList: PlayerProps[]) => {
      spawnPlayers(playerList);
      getMe();
    });

    socket.on("update-position", (player: PlayerProps) => {
      const _player = findPlayerById(player.id);
      if (_player) {
        _player.setPosition(player);
      }
    });

    socket.on("bullet", (bullet: BulletProps) => {
      spawnBullet(bullet);
    });

    socket.on("add-player", (player: PlayerProps) => {
      spawnPlayer(player);
    });

    document.addEventListener("keydown", (event) => {
      const _player = findPlayerById(me.label);
      if (event.keyCode === 68) {
        _player?.moveRight();
      }
      if (event.keyCode === 65) {
        _player?.moveLeft();
      }
      if (event.keyCode === 87) {
        _player?.moveUp();
      }
      if (event.keyCode === 83) {
        _player?.moveDown();
      }
    });

    Matter.Events.on(mouseConstraint, "mousedown", (event) => {
      const bullet: BulletProps = {
        id: `bullet//${me?.label}`,
        x: me.position.x,
        y: me.position.y,
        angle: Matter.Vector.angle(me.position, mouse.position),
        distance: 30,
      };

      socket.emit("bullet", bullet);
    });

    Matter.Events.on(engine, "collisionEnd", (event) => {
      const collisions = event.pairs[0];
      if (collisions) {
        if (collisions.bodyA.label.includes("bullet")) {
          Matter.World.remove(engine.world, collisions.bodyA);
        }
        if (collisions.bodyB.label.includes("bullet")) {
          Matter.World.remove(engine.world, collisions.bodyB);
        }
        if (
          collisions.bodyA.label === "wall" &&
          collisions.bodyB.label === "player"
        ) {
          Matter.World.remove(engine.world, collisions.bodyB);
        }
        if (
          collisions.bodyA.label === "player" &&
          collisions.bodyB.label === "wall"
        ) {
          Matter.World.remove(engine.world, collisions.bodyA);
        }
      }
    });
    Engine.run(engine);

    Render.run(render);
  };

  const updatePosition = () => {
    if (me) {
      const myPlayer: PlayerProps = {
        id: me.label,
        x: me.position.x,
        y: me.position.y,
      };
      socket.emit("update-position", myPlayer);
    }
  };
  useEffect(() => {
    setUpGame();
    setInterval(updatePosition, 20);
  });

  return (
    <>
      <div id={"gameDiv"}></div>
    </>
  );
};

export default Game;
