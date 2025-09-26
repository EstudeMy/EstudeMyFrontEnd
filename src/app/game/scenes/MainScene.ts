import * as Phaser from "phaser";
 
export default class MainScene extends Phaser.Scene {
  jogadorHP = 100;
  inimigoHP = 100;
  jogadorLabel!: Phaser.GameObjects.Text;
  inimigoLabel!: Phaser.GameObjects.Text;
 
  jogadorHPBar!: Phaser.GameObjects.Graphics;
  inimigoHPBar!: Phaser.GameObjects.Graphics;
  balao!: Phaser.GameObjects.Graphics;
  perguntaText!: Phaser.GameObjects.Text;
  opcoes: Phaser.GameObjects.Text[] = [];
 
  player!: Phaser.GameObjects.Sprite;
  enemy!: Phaser.GameObjects.Sprite;
 
  perguntas = [
    {
      pergunta: "Qual é a capital do Brasil?",
      opcoes: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador", "Fortaleza"],
      resposta: "Brasília",
    },
    {
      pergunta: "Qual é 2 + 2?",
      opcoes: ["3", "4", "5", "6", "7"],
      resposta: "4",
    },
    {
      pergunta: "Qual é a cor do céu?",
      opcoes: ["Verde", "Azul", "Vermelho", "Amarelo", "Preto"],
      resposta: "Azul",
    },
  ];
  perguntaAtual: any;
 
  readonly LETRAS = ["A", "B", "C", "D", "E"];
 
  constructor() {
    super("MainScene");
  }
 
  preload() {
    this.load.image("background", "/img/background-image-login-register.png");
    this.load.image("player", "/img/pixel_art_small (1).png");
    this.load.image("enemy", "/img/cavaleiro_inimigo.png");
  }
 
  get layout() {
    const { width, height } = this.scale;
    return {
      balaoX: width * 0.2,
      balaoY: height * 0.1,
      balaoWidth: width * 0.6,
      balaoHeight: height * 0.42,
      padding: width * 0.015,
      opcoesGap: height * 0.06,
      hpBarWidth: width * 0.15,
      hpBarHeight: height * 0.02,
      fontSize: Math.round(width * 0.018),
      btnFontSize: Math.round(width * 0.03),
    };
  }
 
  create() {
    this.createBackground();
    this.createSprites();
    this.createHP();
    this.createPerguntaBalao();
    this.loadPergunta();
   
    this.scale.on("resize", () => {
      this.reposicionarSprites();
      this.reposicionarBalao();
      this.reposicionarSprites();
      this.reposicionarHPBars();
      this.reposicionarHPLabels();
      if (this.perguntaAtual) {
      this.renderOpcoes(this.perguntaAtual.opcoes);
    }
    });
  }
 
  createBackground() {
    const bg = this.add.image(0, 0, "background").setOrigin(0, 0);
    bg.setDisplaySize(this.scale.width, this.scale.height);
 
    this.scale.on("resize", (gameSize: Phaser.Structs.Size) => {
      bg.setDisplaySize(gameSize.width, gameSize.height);
    });
  }
 
  createSprites() {
    const { width, height } = this.scale;
    this.player = this.add.sprite(width * 0.15, height * 1.0, "player")
      .setOrigin(0.5, 1)
      .setScale(width / 2000);
 
    this.enemy = this.add.sprite(width * 0.85, height * 0.9, "enemy")
      .setOrigin(0.5, 1)
      .setScale(width / 3000);
    this.scale.on("resize", () => {
      this.reposicionarSprites();
    });
  }
  reposicionarSprites() {
  const { width, height } = this.scale;
 
  this.player.setPosition(width * 0.15, height * 0.9);
  this.enemy.setPosition(width * 0.85, height * 0.9);
 
  // Se quiser ajustar a escala também:
  this.player.setScale(width / 2550);
  this.enemy.setScale(width / 3800);
}
 
  createHP() {
  const l = this.layout;
 
  // Salva os textos como propriedades para reposicionar depois
  this.jogadorLabel = this.add.text(20, 10, "Jogador", {
    fontSize: `${l.fontSize}px`,
    color: "#fff",
  });
 
  this.inimigoLabel = this.add.text(this.scale.width - l.hpBarWidth - 20, 10, "Inimigo", {
    fontSize: `${l.fontSize}px`,
    color: "#fff",
  });
 
  this.jogadorHPBar = this.add.graphics();
  this.inimigoHPBar = this.add.graphics();
  this.updateHPBars();
}

  reposicionarHPBars() {
  const l = this.layout;
 
  this.jogadorHPBar.clear();
  this.inimigoHPBar.clear();
 
  this.jogadorHPBar.fillStyle(0x00ff00, 1);
  this.jogadorHPBar.fillRect(20, 30, (this.jogadorHP / 100) * l.hpBarWidth, l.hpBarHeight);
 
  this.inimigoHPBar.fillStyle(0xff0000, 1);
  this.inimigoHPBar.fillRect(this.scale.width - l.hpBarWidth - 20, 30, (this.inimigoHP / 100) * l.hpBarWidth, l.hpBarHeight);
}
 
  updateHPBars() {
    const l = this.layout;
    this.jogadorHPBar.clear();
    this.inimigoHPBar.clear();
 
    this.jogadorHPBar.fillStyle(0x00ff00, 1);
    this.jogadorHPBar.fillRect(20, 30, (this.jogadorHP / 100) * l.hpBarWidth, l.hpBarHeight);
 
    this.inimigoHPBar.fillStyle(0xff0000, 1);
    this.inimigoHPBar.fillRect(this.scale.width - l.hpBarWidth - 20, 30, (this.inimigoHP / 100) * l.hpBarWidth, l.hpBarHeight);
  }
 
  reposicionarHPLabels() {
    const l = this.layout;
    this.jogadorLabel.setPosition(20, 10).setFontSize(l.fontSize);
    this.inimigoLabel.setPosition(this.scale.width - l.hpBarWidth - 20, 10).setFontSize(l.fontSize);
  }
 
  createPerguntaBalao() {
    const l = this.layout;
    this.balao = this.add.graphics();
    this.balao.fillStyle(0x222222, 0.8);
    this.balao.fillRoundedRect(l.balaoX, l.balaoY, l.balaoWidth, l.balaoHeight, 16);
 
    this.perguntaText = this.add.text(
      l.balaoX + l.padding,
      l.balaoY + l.padding,
      "Carregando pergunta...",
      {
        fontSize: `${l.fontSize}px`,
        color: "#fff",
        wordWrap: { width: l.balaoWidth - l.padding * 2 },
      }
    );
  }
  reposicionarBalao() {
  const l = this.layout;
 
  this.balao.clear();
  this.balao.fillStyle(0x222222, 0.8);
  this.balao.fillRoundedRect(l.balaoX, l.balaoY, l.balaoWidth, l.balaoHeight, 16);
 
  this.perguntaText.setPosition(l.balaoX + l.padding, l.balaoY + l.padding);
  this.perguntaText.setWordWrapWidth(l.balaoWidth - l.padding * 2);
  this.perguntaText.setFontSize(l.fontSize);
}
 
  loadPergunta() {
    const perguntasShuffle = Phaser.Utils.Array.Shuffle([...this.perguntas]);
    this.perguntaAtual = perguntasShuffle[0];
 
    this.perguntaText.setText(this.perguntaAtual.pergunta);
    this.renderOpcoes(this.perguntaAtual.opcoes);
  }
 
  renderOpcoes(opcoesArray: string[]) {
    const l = this.layout;
    this.opcoes.forEach((btn) => btn.destroy());
    this.opcoes = [];
 
    const startX = l.balaoX + l.padding;
    const startY = l.balaoY + l.padding * 3;
 
    opcoesArray.forEach((opcao, index) => {
      const btn = this.createButton(
        `${this.LETRAS[index]}: ${opcao}`,
        startX,
        startY + index * l.opcoesGap,
        () => this.verificarResposta(opcao),
        l.balaoWidth - l.padding * 2
      );
      this.opcoes.push(btn);
    });
  }
 
  createButton(text: string, x: number, y: number, callback: () => void, width?: number) {
    const l = this.layout;
    const btn = this.add.text(x, y, text, {
      fontSize: `${l.fontSize}px`,
      color: "#fff",
      backgroundColor: "#333",
      padding: { x: 10, y: 6 },
      fixedWidth: width,
    })
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", callback);
 
    return btn;
  }
 
  verificarResposta(resposta: string) {
    this.opcoes.forEach((btn) => btn.disableInteractive());
 
    if (resposta === this.perguntaAtual.resposta) {
      this.inimigoHP = Math.max(this.inimigoHP - Phaser.Math.Between(15, 25), 0);
      this.perguntaText.setText("✅ Acertou! Você atacou!");
      this.animaAtaque(this.player, this.enemy);
    } else {
      this.jogadorHP = Math.max(this.jogadorHP - Phaser.Math.Between(10, 20), 0);
      this.perguntaText.setText("❌ Errou! O inimigo atacou!");
      this.animaAtaque(this.enemy, this.player);
    }
 
    this.updateHPBars();
 
    if (this.jogadorHP <= 0 || this.inimigoHP <= 0) {
      this.time.delayedCall(1000, () => {
        this.mostrarTelaFinal(this.jogadorHP <= 0 ? "derrota" : "vitoria");
      });
    } else {
      this.time.delayedCall(1200, () => this.loadPergunta());
    }
  }
 
  animaAtaque(atacante: Phaser.GameObjects.Sprite, alvo: Phaser.GameObjects.Sprite) {
    this.tweens.add({
      targets: atacante,
      x: alvo.x - 50,
      y: atacante.y - 20,
      duration: 300,
      yoyo: true,
      ease: "Power1",
      onComplete: () => this.updateHPBars(),
    });
  }
 
  mostrarTelaFinal(tipo: "vitoria" | "derrota") {
    const { width, height } = this.scale;
    const l = this.layout;
 
    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0, 0)
      .setAlpha(0);
 
    this.tweens.add({ targets: overlay, alpha: 1, duration: 500 });
 
    const texto = tipo === "vitoria" ? "🎉 Você venceu!" : "💀 Você perdeu!";
    const cor = tipo === "vitoria" ? "#00ff00" : "#ff0000";
 
    const endText = this.add.text(width / 2, height / 2 - height * 0.1, texto, {
      fontSize: `${l.fontSize * 2}px`,
      color: cor,
    }).setOrigin(0.5);
  }
}