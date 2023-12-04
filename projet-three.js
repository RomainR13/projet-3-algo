const prompt = require("prompt-sync")();

const player = {
    name: "Guerrier du Feu",
    pv: 100,
};

const computer = {
    name: "Sombre Lutin",
    pv: 100,
};

const attacks = [
    { name: "Frappe Rapide", power: 10, precision: 1 },
    { name: "Soin Léger", power: -15, precision: 0.5 },
    { name: "Coup Puissant", power: 20, precision: 0.5 },
    { name: "Frappe Dévastatrice", power: 30, precision: 0.35 },
];


function getRandomAttack() {
    return attacks[Math.floor(Math.random() * attacks.length)];
}

function showFightStatus() {
    console.log(`${player.name} (PV: ${player.pv}) vs ${computer.name} (PV: ${computer.pv})`);
}

function attacksChoice() {
    console.log("Selectionnez votre attaque : ");
    attacks.forEach((attacks, index) => console.log(`${index + 1}. ${attacks.name}`));

    const choice = prompt('Choisissez une attaque (1-4): ');

    if (choice < 1 || choice > 4 || isNaN(choice)) {
        console.log('Choix invalide. Veuillez choisir une attaque valide.');
        return attacksChoice();
    }

    return attacks[choice - 1];
}

function calculateDamage(attacks) {
    const touch = Math.random() < attacks.precision;

    if (touch) {
        return attacks.power;
    } else {
        return 0;
    }
}

function updatePv(attacker, target, damage, attack) {
    if (damage === 0) {
        console.log(`${attacker.name} a tenté ${attack.name}, mais l'attaque a échoué.`);
    } else if (attack.power < 0) {
        attacker.pv -= damage;
        console.log(`${attacker.name} lance ${attack.name}`);
        console.log(`${attacker.name} a été soigné de ${damage} points. PV restants : ${attacker.pv}`);
    } else {
        target.pv -= damage;
        if (target.pv < 0) {
            target.pv = 0;
        }
        console.log(`${attacker.name} lance ${attack.name}`);
        console.log(`${target.name} a subi ${Math.abs(damage)} points de dégâts. PV restants : ${target.pv}`);
    }
}



async function fight() {
    console.log("Le combat commence !");
    await sleep(1000)
    while (player.pv > 0 && computer.pv > 0) {

        showFightStatus();
        await sleep(1000)

        const playerAttack = attacksChoice();
        await sleep(1000)
        const playerDamage = calculateDamage(playerAttack);
        await sleep(1000)
        updatePv(player, computer, playerDamage, playerAttack);
        await sleep(1000)

        console.log(`${computer.name} prépare sa riposte...`);
        await sleep(1500)

        const computerAttack = getRandomAttack()
        await sleep(1000)
        const computerDamage = calculateDamage(computerAttack);
        await sleep(1000)
        updatePv(computer, player, computerDamage, computerAttack);


    }
    await sleep(1000)
    console.log("Le combat est terminé !");
    await sleep(1500)

    let winner;
    if (player.pv > 0) {
        winner = player.nom;
    } else {
        winner = computer.nom;
    }
    await sleep(1500)
    console.log(`Le vainqueur est ${winner} !`);
}


function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}



fight();