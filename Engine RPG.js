let estadoJogo = "explorando"
let jogoAtivo = true;

const personagem = {
    nome: "Slayer",
    classe: "Mercenário",
    nivel: 2,
    forca: 10,
    arma: {
    nome: "Espada Enferrujada",
    tipo: "arma",
    forca: 1
    },
    defesa: 10,
    armadura: null,
    vida: 100,
    vidaMaxima: 100,
    xpAtual:0,
    xpMax:10,
    moeda: 0,
    inventário: [
        {
        nome: "Poção de cura",
        tipo: "consumivel",
        cura: 20
    }

    ]
};

function exibirInventario(){
    for (let i = 0; i < personagem.inventário.length; i++) {
        const item = personagem.inventário[i];
        console.log(`${i}: ${item.nome} (${item.tipo})`);
    }
}

function usarItem(indice){
const item = personagem.inventário[indice]
if (item === undefined) {
    console.log("Você não possui este item");
    return;
}
if (item.tipo === "arma"){
    return equiparArma(item)
} else if (item.tipo === "armadura"){
    return equiparArmadura(item)
} else if (item.tipo === "consumivel"){
    return usarCura(item)
}
}

const produtos = [

{
    id: 1,
    nome: "Poção Pequena",
    tipo: "consumivel",
    cura: 20,
    preco: 15,
    quantidade: 10
},

{
    id: 2,
    nome: "Espada de Ferro",
    tipo: "arma",
    forca: 3,
    preco: 50,
    quantidade: 2
},

{
    id: 3,
    nome: "Armadura de Couro",
    tipo: "armadura",
    defesa: 2,
    preco: 40,
    quantidade: 2
}

];
function exibirLoja() {
    for (let i = 0; i < produtos.length; i++) {
        const item = produtos[i];

        let detalhe = "";

        if (item.tipo === "arma") detalhe = `Dano ${item.forca}`;
        if (item.tipo === "armadura") detalhe = `Defesa ${item.defesa}`;
        if (item.tipo === "consumivel") detalhe = `Recupera ${item.cura} HP`;

        console.log(`${i}: ${item.nome} (${item.tipo} ${detalhe}) - ${item.preco} moedas`);
    }
}


function comprarItem(indice){
    const item = produtos[indice]
    if (item === undefined) {
    console.log("Esse item não está disponivel");
    return;
    }

    if (personagem.moeda >= item.preco && item.quantidade > 0){
        console.log("Você pode comprar este item.")
        personagem.inventário.push({ ...item });
        personagem.moeda -= item.preco;
        item.quantidade -= 1
    } else {
        console.log("Você não pode comprar este item.")
    }

    if (item.quantidade <= 0) {
    console.log("Esgotado");
}

}

function calcularPreco(item) {
    const escassez = 1 - (item.quantidade / 10);
    return Math.max(1, Math.floor(item.preco * (1 + escassez)));
}




function forcaTotal() {
    return personagem.forca + personagem.arma.forca;
}

function defesaTotal() {

    let defesaArmadura = 0;

    if (personagem.armadura) {
        defesaArmadura = personagem.armadura.defesa;
    }

    return personagem.defesa + defesaArmadura;
}

function equiparArma(arma) {

    if (arma.tipo !== "arma") {
        console.log("Não é uma arma.");
        return;
    }

    const indice = personagem.inventário.indexOf(arma);

    if (indice === -1) {
        console.log("Arma não encontrada no inventário.");
        return;
    }

    const armaAntiga = personagem.arma;

    personagem.inventário.splice(indice, 1);

    if (armaAntiga) {
        personagem.inventário.push(armaAntiga);
    }

    personagem.arma = arma;

    console.log(`${arma.nome} equipada!`);
}

function equiparArmadura(armadura) {

    if (armadura.tipo !== "armadura") {
        console.log("Não é uma armadura.");
        return;
    }

    const indice = personagem.inventário.indexOf(armadura);

    if (indice === -1) {
        console.log("Armadura não encontrada.");
        return;
    }

    const armaduraAntiga = personagem.armadura;

    personagem.inventário.splice(indice, 1);

    if (armaduraAntiga) {
        personagem.inventário.push(armaduraAntiga);
    }

    personagem.armadura = armadura;

    console.log(`${armadura.nome} equipada!`);
}

function usarCura(consumivel){
 if (consumivel.tipo !== "consumivel"){
    console.log("Não é um consumivel.")
return
 }
const indice = personagem.inventário.indexOf(consumivel);

if (indice === -1){
    console.log("Você não possui consumiveis.")
} 
personagem.inventário.splice(indice, 1)

personagem.vida += consumivel.cura

if (personagem.vida > personagem.vidaMaxima){
    personagem.vida = personagem.vidaMaxima 
 }

 return `Foi recuperado ${consumivel.cura}HP`
 
 }

const capitulos = [
    { nome: "A Floresta Sombria", progressoatual: 0, progresso: 5 },
    { nome: "As Montanhas Geladas", progressoatual: 0, progresso: 5 },
    { nome: "A Caverna dos Trolls", progressoatual: 0, progresso: 5 },
    { nome: "A Floresta dos Ursos", progressoatual: 0, progresso: 5 }
];

let gerenciadorCapitulo = capitulos[0];


const inimigoGoblin = [
    ["Goblin", 1, 5, 30, 30, 2],
    ["Goblin Arqueiro", 1, 7, 25, 25, 1],
    ["Goblin Mago", 1, 6, 20, 20, 1],
];


const inimigoOrc = [
    ["Orc", 2, 8, 50, 50, 4],
    ["Orc Berserker", 2, 10, 40, 40, 3],
    ["Orc Xamã", 2, 9, 35, 35, 3],
];

const inimigoTroll = [
    ["Troll", 3, 12, 80, 80, 6],
    ["Troll Guerreiro", 3, 14, 70, 70, 5],
    ["Troll Mago", 3, 13, 60, 60, 5],
];

const inimigoUrso = [
    ["Urso", 4, 15, 100, 100, 8],
    ["Urso Berserker", 4, 18, 90, 90, 7],
    ["Urso Alpha", 4, 17, 80, 80, 7],
];

const chefes = {

    "A Floresta Sombria":
        criarInimigo("Goblin Rei", 5, 15, 150, 150, 8),

    "As Montanhas Geladas":
        criarInimigo("Orc Chefe", 8, 20, 250, 250, 12),

    "A Caverna dos Trolls":
        criarInimigo("Troll Ancião", 12, 28, 400, 400, 16),

    "A Floresta dos Ursos":
        criarInimigo("Urso Gigante", 15, 35, 600, 600, 20)
};

const drops = {

    //Goblin

    Goblin: [
        { nome: "Moedas", min: 3, max: 10, chance: 100, tipo: "ouro" },
        { nome: "Poção Pequena", chance: 25, tipo: "consumivel" },
        { nome: "Faca Cega", chance: 10, tipo: "arma", forca: 1 }
    ],

    "Goblin Arqueiro": [
        { nome: "Moedas", min: 5, max: 12, chance: 100, tipo: "ouro" },
        { nome: "Flechas", chance: 40, tipo: "material" },
        { nome: "Arco Simples", chance: 8, tipo: "arma", forca: 2 }
    ],

    "Goblin Mago": [
        { nome: "Moedas", min: 8, max: 15, chance: 100, tipo: "ouro" },
        { nome: "Fragmento Mágico", chance: 35, tipo: "material" },
        { nome: "Pergaminho Rasgado", chance: 15, tipo: "material" }
    ],

    "Goblin Rei": [
        { nome: "Moedas", min: 50, max: 50, chance: 100, tipo: "ouro" },
        { nome: "Coroa do Rei Goblin", chance: 15, tipo: "equipamento", defesa: 2 },
        { nome: "Espada Goblin Rara", chance: 25, tipo: "arma", forca: 5 }
    ],

    //Orc

    Orc: [
        { nome: "Moedas", min: 10, max: 20, chance: 100, tipo: "ouro" },
        { nome: "Machado Orc", chance: 20, tipo: "arma", forca: 4 },
        { nome: "Carne Curada", chance: 30, tipo: "consumivel", cura: 20 }
    ],

    "Orc Berserker": [
        { nome: "Moedas", min: 15, max: 25, chance: 100, tipo: "ouro" },
        { nome: "Machado Pesado", chance: 15, tipo: "arma", forca: 6 },
        { nome: "Poção de Força", chance: 20, tipo: "consumivel" }
    ],

    "Orc Xamã": [
        { nome: "Moedas", min: 15, max: 30, chance: 100, tipo: "ouro" },
        { nome: "Totem Rúnico", chance: 15, tipo: "material" },
        { nome: "Poção de Mana", chance: 20, tipo: "consumivel" }
    ],

    "Orc Chefe": [
        { nome: "Moedas", min: 100, max: 100, chance: 100, tipo: "ouro" },
        { nome: "Machado do Chefe", chance: 20, tipo: "arma", forca: 8 },
        { nome: "Armadura Orc", chance: 30, tipo: "armadura", defesa: 5 }
    ],

    //Troll

    Troll: [
        { nome: "Moedas", min: 20, max: 35, chance: 100, tipo: "ouro" },
        { nome: "Couro Grosso", chance: 40, tipo: "material" },
        { nome: "Poção Média", chance: 25, tipo: "consumivel", cura: 50 }
    ],

    "Troll Guerreiro": [
        { nome: "Moedas", min: 25, max: 40, chance: 100, tipo: "ouro" },
        { nome: "Clava Pesada", chance: 20, tipo: "arma", forca: 8 },
        { nome: "Escudo Reforçado", chance: 20, tipo: "escudo", defesa: 3 }
    ],

    "Troll Mago": [
        { nome: "Moedas", min: 30, max: 50, chance: 100, tipo: "ouro" },
        { nome: "Cristal Arcano", chance: 30, tipo: "material" },
        { nome: "Grimório Antigo", chance: 10, tipo: "material" }
    ],

    "Troll Ancião": [
        { nome: "Moedas", min: 200, max: 200, chance: 100, tipo: "ouro" },
        { nome: "Núcleo Arcano", chance: 25, tipo: "material" },
        { nome: "Armadura Troll", chance: 20, tipo: "armadura", defesa: 8 }
    ],

    //Urso

    Urso: [
        { nome: "Moedas", min: 30, max: 50, chance: 100, tipo: "ouro" },
        { nome: "Pele de Urso", chance: 40, tipo: "material" },
        { nome: "Garras", chance: 20, tipo: "material" }
    ],

    "Urso Berserker": [
        { nome: "Moedas", min: 40, max: 60, chance: 100, tipo: "ouro" },
        { nome: "Pele Espessa", chance: 35, tipo: "material" },
        { nome: "Coração de Fera", chance: 15, tipo: "material" }
    ],

    "Urso Alpha": [
        { nome: "Moedas", min: 50, max: 70, chance: 100, tipo: "ouro" },
        { nome: "Presa Alpha", chance: 20, tipo: "material" },
        { nome: "Essência Selvagem", chance: 10, tipo: "material" }
    ],

    "Urso Gigante": [
        { nome: "Moedas", min: 300, max: 300, chance: 100, tipo: "ouro" },
        { nome: "Manto do Alpha", chance: 20, tipo: "armadura", defesa: 10 },
        { nome: "Machado Selvagem", chance: 15, tipo: "arma", forca: 10 }
    ]
};

function gerarDrops(inimigo) {
    const tabela = drops[inimigo.nome];

    if (!tabela) {
        return [];
    }

    const itensObtidos = [];

    for (const item of tabela) {

        const sorteio = Math.random() * 100;

        if (sorteio <= item.chance) {

            if (item.tipo === "ouro") {

                const quantidade =
                    Math.floor(
                        Math.random() * (item.max - item.min + 1)
                    ) + item.min;

                itensObtidos.push({
                    nome: item.nome,
                    quantidade: quantidade,
                    tipo: "ouro"
                });

            } else {

                itensObtidos.push({
                    ...item
                });

            }
        }
    }

    return itensObtidos;
}

function adicionarDropsAoInventario(itens) {

    for (const item of itens) {

        if (item.tipo === "ouro") {

            personagem.moeda += item.quantidade;

            console.log(
                `${item.quantidade} moedas adicionadas. Total: ${personagem.moeda}`
            );

        } else {

            personagem.inventário.push(item);

            console.log(
                `${item.nome} foi adicionado ao inventário.`
            );

        }
    }
}

function criarInimigo(nome, nivel, dano, vida, vidaMaxima, defesa) {
    return { nome, nivel, dano, vida, vidaMaxima, defesa };
}



function atacar(inimigo) {
    const dado = Math.floor(Math.random() * 20) + 1;
    const danoBase = forcaTotal() + dado - inimigo.defesa;
    const danoTotal = Math.max(0, danoBase);

    if (dado < 5) return `O ataque de ${personagem.nome} falhou!`;
    if (danoTotal === 0) return `O ataque não causou dano!`;

    if (personagem.nivel < inimigo.nivel && dado >= 20) {
        inimigo.vida -= danoTotal * 1.5;
        return `Crítico contra inimigo forte! Dano ${danoTotal * 1.5}`;
    }

    if (personagem.nivel < inimigo.nivel) {
        inimigo.vida -= danoTotal * 0.5;
        return `Ataque fraco! Dano ${danoTotal * 0.5}`;
    }

    if (dado >= 18) {
        inimigo.vida -= danoTotal * 2;
        return `Crítico! Dano ${danoTotal * 2}`;
    }

    inimigo.vida -= danoTotal;
    return `Ataque normal! Dano ${danoTotal}`;
}

function inimigoAtacar(inimigo) {
    const dado = Math.floor(Math.random() * 20) + 1;
    const danoBase = inimigo.dano + dado - defesaTotal();
    const danoTotal = Math.max(0, danoBase);

    if (dado < 5) return `O ataque do ${inimigo.nome} falhou!`;
    if (danoTotal === 0) return `O ataque não causou dano!`;

    const danoFinal = dado >= 19 ? danoTotal * 1.5 : danoTotal;
    personagem.vida -= danoFinal;

    return `O ${inimigo.nome} causou ${danoFinal} de dano`;
}

function curar() {

    if (personagem.vida >= personagem.vidaMaxima) {
        console.log("Vida já está cheia!");
        return;
    }

    personagem.vida += 20;

    if (personagem.vida > personagem.vidaMaxima) {
        personagem.vida = personagem.vidaMaxima;
    }

    console.log(`${personagem.nome} recuperou 20 HP!`);
    console.log(`Vida: ${personagem.vida}/${personagem.vidaMaxima}`);
}

function zerarVida(obj) {
    if (obj.vida < 0) obj.vida = 0;
}

function statusPersonagem() {
    if (personagem.vida <= 0) return `${personagem.nome} foi derrotado!`;
    if (personagem.vida <= 10) return `${personagem.nome} está crítico! Vida: ${personagem.vida}`;
    if (personagem.vida < personagem.vidaMaxima) return `Vida: ${personagem.vida}`;
    return `${personagem.nome} está com vida cheia!`;
}

function statusInimigo(inimigo) {
    if (inimigo.vida <= 0) return `${inimigo.nome} foi derrotado!`;
    return `${inimigo.nome}: ${inimigo.vida} HP`;
}



function levelUp(inimigo) {
    if (inimigo.vida <= 0){
        const xpGanho = inimigo.nivel * 5
        personagem.xpAtual += xpGanho
        return `${personagem.nome} ganhou ${xpGanho} XP`;
    }
        
    }

function verificarLevelUp() {
    while (personagem.xpAtual >= personagem.xpMax) {

        personagem.xpAtual -= personagem.xpMax;

        personagem.nivel++;
        personagem.forca += 5;
        personagem.defesa += 5;
        personagem.vidaMaxima += 20;
        personagem.vida = personagem.vidaMaxima;

        personagem.xpMax = Math.floor(personagem.xpMax * 1.5);

        console.log(`${personagem.nome} subiu para o nível ${personagem.nivel}!`);
    }

    const falta = personagem.xpMax - personagem.xpAtual;
    return `Faltam ${falta} XP para o próximo nível.`;
}

function exibirXp(){

}


function sortearInimigo() {
    let lista = [];

    switch (gerenciadorCapitulo.nome) {
        case "A Floresta Sombria": lista = inimigoGoblin; break;
        case "As Montanhas Geladas": lista = inimigoOrc; break;
        case "A Caverna dos Trolls": lista = inimigoTroll; break;
        case "A Floresta dos Ursos": lista = inimigoUrso; break;
    }

    const escolhido = lista[Math.floor(Math.random() * lista.length)];
    return criarInimigo(...escolhido);
}



function batalha(inimigo) {
    let turno = "personagem";

    console.log(`\nUm ${inimigo.nome} apareceu!`);

    while (inimigo.vida > 0 && personagem.vida > 0) {
        if (turno === "personagem") {
            console.log(atacar(inimigo));
            console.log(statusInimigo(inimigo));
            turno = "inimigo";
        } else {
            console.log(inimigoAtacar(inimigo));
            console.log(statusPersonagem());
            turno = "personagem";
        }

        zerarVida(inimigo);
        zerarVida(personagem);
    }

    if (personagem.vida > 0) {

    console.log(levelUp(inimigo));
    console.log(verificarLevelUp());

    const loot = gerarDrops(inimigo);

    console.log("===== DROPS =====");

    if (loot.length === 0) {
        console.log("Nenhum item encontrado.");
    } else {

        for (const item of loot) {

            if (item.tipo === "ouro") {
                console.log(`${item.quantidade} moedas`);
            } else {
                console.log(item.nome);
            }

        }

        adicionarDropsAoInventario(loot);
    }

    return true;
}

    console.log("Game Over!");
    jogoAtivo = false;
    return false;
}



function progressoCapitulo() {

    gerenciadorCapitulo.progressoatual++;

    if (
        gerenciadorCapitulo.progressoatual ===
        gerenciadorCapitulo.progresso
    ) {

        console.log("\n===== CHEFE ENCONTRADO =====");

        const chefe =
            chefes[gerenciadorCapitulo.nome];

        const venceu = batalha(
            criarInimigo(
                chefe.nome,
                chefe.nivel,
                chefe.dano,
                chefe.vidaMaxima,
                chefe.vidaMaxima,
                chefe.defesa
            )
        );

        if (!venceu) {
            jogoAtivo = false;
            return;
        }

        console.log(
            `Capítulo concluído: ${gerenciadorCapitulo.nome}`
        );

        const index =
            capitulos.indexOf(gerenciadorCapitulo);

        if (index < capitulos.length - 1) {

            gerenciadorCapitulo =
                capitulos[index + 1];

            gerenciadorCapitulo.progressoatual = 0;

            console.log(
                `Novo capítulo: ${gerenciadorCapitulo.nome}`
            );

        } else {

            console.log(
                "Parabéns! Você zerou o jogo!"
            );

            jogoAtivo = false;
        }
    }
}


function iniciarJogo() {

    while (jogoAtivo) {

        if (estadoJogo === "explorando") {

            const inimigo = sortearInimigo();
            const venceu = batalha(inimigo);

            if (!venceu) {
                jogoAtivo = false;
                break;
            }

            progressoCapitulo();
        }
    }
}

iniciarJogo();
