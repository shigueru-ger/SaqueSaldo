let saldo = 1000;

const notas = [100, 50, 20, 10, 5, 2];

const campoValor = document.getElementById("valor");

const botaoSacar = document.getElementById("btnSacar");
const botaoAdicionar = document.getElementById("btnAdicionar");

const resultado = document.getElementById("resultado");
const campoSaldo = document.getElementById("saldo");


// Atualiza o saldo na tela
function atualizarSaldo() {
    campoSaldo.textContent = `R$ ${saldo.toFixed(2).replace(".", ",")}`;
}


// ADICIONAR SALDO
botaoAdicionar.addEventListener("click", function () {

    const valor = Number(campoValor.value);

    resultado.innerHTML = "";


    if (valor <= 0 || isNaN(valor)) {

        resultado.innerHTML = `
            <p class="erro">
                Digite um valor válido.
            </p>
        `;

        return;
    }


    saldo += valor;

    atualizarSaldo();

    resultado.innerHTML = `
        <p class="sucesso">
            R$ ${valor.toFixed(2).replace(".", ",")} adicionados ao saldo!
        </p>
    `;

    campoValor.value = "";
});


// SACAR
botaoSacar.addEventListener("click", function () {

    const valor = Number(campoValor.value);

    resultado.innerHTML = "";


    if (valor <= 0 || isNaN(valor)) {

        resultado.innerHTML = `
            <p class="erro">
                Digite um valor válido.
            </p>
        `;

        return;
    }


    if (valor > saldo) {

        resultado.innerHTML = `
            <p class="erro">
                Saldo insuficiente.
            </p>
        `;

        return;
    }


    if (valor % 2 !== 0) {

        resultado.innerHTML = `
            <p class="erro">
                Não é possível realizar este saque.
            </p>

            <p>
                O valor não pode ser formado
                pelas notas disponíveis.
            </p>
        `;

        return;
    }


    let valorRestante = valor;

    let texto = `
        <p>
            <strong>Saque de R$ ${valor.toFixed(2).replace(".", ",")}</strong>
        </p>
    `;


    for (let nota of notas) {

        const quantidade = Math.floor(valorRestante / nota);


        if (quantidade > 0) {

            texto += `
                <p>
                    ${quantidade} nota(s) de R$ ${nota},00
                </p>
            `;

            valorRestante = valorRestante % nota;
        }
    }


    saldo -= valor;

    atualizarSaldo();


    resultado.innerHTML = texto;

    campoValor.value = "";
});