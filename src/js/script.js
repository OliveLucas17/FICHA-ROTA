document.getElementById("Ficha").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;

  const data = {
    nome: form.nome.value,
    "Data de Nascimento": form["Data de Nascimento"].value,
    CPF: form.cpf.value,
    RG: form.rg.value,
    sangue: form.sangue.value,
    telefone: form.telefone.value,
    email: form.email.value,
    rua: form.rua.value,
    numero: form.numero.value,
    complemento: form.complemento.value,
    bairro: form.bairro.value,
    cidade: form.cidade.value,
    CEP: form.CEP.value,
    motoDetalhe: form.motoDetalhe.value,
    coletado: form.coletado.value,
    membroBoasNovas: form.membroBoasNovas.value,
    inicioBoasNovas: form.inicioBoasNovas?.value || "",
    igreja: form.igreja?.value || "",
    batizado: form.batizado.value,
    anoBatismo: form.anoBatismo?.value || "",
    tipo: form.tipo.value,
    motoDetalhe: form.motoDetalhe?.value || "",
    placa: form.placa?.value || "",
    temConvenio: form.temConvenio.value,
    convenio: form.convenio?.value || "",
    emergencia: form.emergencia.value,
    grauparentesco: form.grauparentesco.value ,
  };

  fetch("https://script.google.com/macros/s/AKfycbw45ccdn5qEPp3TRHxERlbpNC-OBDudLvt7x71G6OwAgp4CYqvePH2zTVQkO1M3wmWiXA/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      // Caso use "no-cors", esta parte não será executada.
      if (response.ok) {
        alert("Ficha enviada com sucesso!");
        form.reset();
      } else {
        alert("Erro ao enviar ficha. Tente novamente.");
      }
    })
    .catch(error => {
      console.error("Erro no fetch:", error);
      alert("Erro ao enviar ficha: " + error.message);
    });
});
document.getElementById("data-nascimento").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, '').slice(0, 8);
  if (value.length >= 5)
    e.target.value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
  else if (value.length >= 3)
    e.target.value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
});
/*input auto cep*/
document.querySelector('input[name="CEP"]').addEventListener('blur', function () {
  const cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (cep.length !== 8) {
      alert("CEP inválido. Deve conter 8 dígitos.");
      return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
          if (data.erro) {
              alert("CEP não encontrado.");
              return;
          }

          document.querySelector('input[name="rua"]').value = data.logradouro || '';
          document.querySelector('input[name="bairro"]').value = data.bairro || '';
          document.querySelector('input[name="cidade"]').value = data.localidade || '';
      })
      .catch(() => alert("Erro ao buscar o endereço. Tente novamente."));
});

document.addEventListener("DOMContentLoaded", function () {
  const tipoSelect = document.getElementById("tipo");
  const membroBoasNovas = document.getElementById("membroBoasNovas");
  const temConvenio = document.getElementById("temConvenio");

  tipoSelect.addEventListener("change", function () {
    document.getElementById("camposPiloto").style.display =
      this.value === "piloto" ? "block" : "none";
  });

  membroBoasNovas.addEventListener("change", function () {
    document.getElementById("campoBoasNovasSim").style.display =
      this.value === "sim" ? "block" : "none";
    document.getElementById("campoBoasNovasNao").style.display =
      this.value === "nao" ? "block" : "none";
  });

  temConvenio.addEventListener("change", function () {
    document.getElementById("campoConvenio").style.display =
      this.value === "sim" ? "block" : "none";
  });
});

document.getElementById("batismo").addEventListener("change", function () {
  const valor = this.value;
  document.getElementById("campoBatizadoSim").style.display = valor === "sim" ? "block" : "none";
  document.getElementById("campoBatizadoNao").style.display = valor === "nao" ? "block" : "none";
});