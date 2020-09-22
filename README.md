# socket-game

Me desafiei a fazer um projeto que fosse diferente das aplicações web comuns e que envolvesse tecnologias que estou aprendendo.
O projeto que decidi fazer é um jogo online e em tempo real que envolva física.
Nesta primeira versão os jogadores conseguem se movimentar no campo e atirar. Cada movimento e projétil de cada jogador é percebido em tempo real por todos no campo. Caso um tiro acerte um jogador, ele é empurrado com força equivalente à velocidade e a massa do projétil.

Controles:
W.A.S.D: Movimentos
Mouse: Atira

No servidor utilizei Node.Js. A comunicação em tempo real ficou por conta do Socket.io, para a física, utilizei a biblioteca Matter.js.

No cliente, utilizei React.js
A linguagem escolhida foi o Typescript.

Para deploy automatizado utilizei o Docker e Docker Compose, Nginx, Git

Está sendo hospedado na AWS num servidor Ubuntu!

link da aplicação:
https://lnkd.in/diapEpk

Projeto no gitub:
https://lnkd.in/dR_ntnZ

Farei alguns artigos explicando o projeto.

Bora jogar?
#react #docker #aws #node #socket #typescript #matterjs
