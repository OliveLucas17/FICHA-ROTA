document.getElementById("Ficha").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;

  const data = {
    /* Dados pessoa */
    nome: form.nome.value,
    "Data de Nascimento": form["Data de Nascimento"].value,
    CPF: form.cpf.value,
    RG: form.rg.value,
    sangue: form.sangue.value,
    telefone: form.telefone.value,
    email: form.email.value,

    /*Endereco*/
    rua: form.rua.value,
    numero: form.numero.value,
    complemento: form.complemento?.value || "",
    bairro: form.bairro.value,
    cidade: form.cidade.value,
    CEP: form.CEP.value,

    /*Igreja*/
    membroBoasNovas: form.membroBoasNovas.value,
    inicioBoasNovas: form.inicioBoasNovas?.value || "",
    igreja: form.igreja?.value || "",

    /*Batismo*/
    batizado: form.batizado.value,
    anoBatismo: form.anoBatismo?.value || "",
    nbatizado: form.nbatizado?.value || "",

    /*Moto*/
    tipo: form.tipo.value,
    motoDetalhe: form.motoDetalhe?.value || "",
    placa: form.placa?.value || "",

    /*Colete*/
    coletado: form.coletado.value,
    anocoletamento: form.anocoletamento?.value || "", 

    /*Convenio*/
    temConvenio: form.temConvenio.value,
    convenio: form.convenio?.value || "",

    /*Doenca*/
    doenca: form.doenca.value|| "",
    tipodoenca: form.tipodoenca?.value || "",
    descricaodoenca: form.descricaodoenca?.value || "",

    /*Alergia*/
    alergia: form.alergia.value || "",
    tipoAlergia: form.tipoalergia?.value || "",

    /*Emergencia*/
    emergencia: form.emergencia.value,
    grauparentesco: form.grauparentesco.value ,
  };

 console.log("Dados enviados:", data);
 
  fetch("https://script.google.com/macros/s/AKfycbzVxf29VNq2KMZWIFWSD1zhj0EYBri45uHihRQ29nESKLyw0YsXoAAKVeFPGWMa30V4Mw/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
   .then(() => {
  // Mesmo sem confirmação, considera sucesso
  alert("Ficha enviada com sucesso!");
  form.reset();
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
  const batismo = document.getElementById("batismo");
  const coletado = document.getElementById("coletado"); 
  const doenca = document.getElementById("doenca");
  const doencasim = document.getElementById("doencasim");
  const tipodoenca = document.getElementById("tipodoenca")
  const outradoenca = document.getElementById("outradoenca");
  const alergia = document.getElementById("alergia");
  const alergiasim = document.getElementById("alergiasim");

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


  batismo.addEventListener("change", function () {
  const valor = this.value;
  document.getElementById("campoBatizadoSim").style.display = valor === "sim" ? "block" : "none";
  document.getElementById("campoBatizadoNao").style.display = valor === "nao" ? "block" : "none";
  });

  coletado.addEventListener("change", function(){
  const valor = this.value.toLowerCase();
  document.getElementById("coletadosim").style.display = valor == "sim" ? "block" : "none";
  });

  doenca.addEventListener("change", function(){
   doencasim.style.display = this.value === "sim" ? "block" : "none";
   outradoenca.style.display = "none"; // sempre retorna pro principal
  });

  tipodoenca.addEventListener ("change", function(){
    outradoenca.style.display = this.value === "outro" ? "block" : "none";
  });

  alergia.addEventListener("change", function () {
    alergiasim.style.display = this.value === "sim" ? "block" : "none";
  });

});

