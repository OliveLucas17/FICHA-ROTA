document.getElementById("Ficha").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;

  const data = {
    nome: form.nome.value,
    "Data de Nascimento": form["Data de Nascimento"].value,
    CPF: form["cpf"].value,
    RG: form["rg"].value,
    sangue: form.sangue.value,
    telefone: form.telefone.value,
    email: form.email.value,
    rua: form.rua.value,
    numero: form.numero.value,
    bairro: form.bairro.value,
    cidade: form.cidade.value,
    CEP: form.CEP.value,
    moto: form.moto.value,
    coletado: form.coletado.value,
  };

  fetch("https://script.google.com/macros/s/AKfycbyQHWmwSfGxWZYH_L2JzIhAD_uzLt7wGhE4KWVV3Kog4tWfy5brX724zxh4jNvCWGlzhQ/exec", {
    method: "POST",
    mode: "no-cors", // Evita erro CORS (não permite resposta visível)
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      alert("Ficha enviada com sucesso");
      form.reset();
    })      
    .catch(error => {
      console.error("Erro no fetch:", error);
      alert("Erro ao enviar ficha: " + error.message);
    });

})
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