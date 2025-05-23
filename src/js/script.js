document.getElementById("Ficha").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;

  const data = {
    nome: form.nome.value,
    "Data de Nascimento": form["Data de Nascimento"].value,
    sangue: form.sangue.value,
    telefone: form.telefone.value,
    rua: form.rua.value,
    bairro: form.bairro.value,
    cidade: form.cidade.value,
    CEP: form.CEP.value,
    moto: form.moto.value,
    coletado: form.coletado.value,
  };

  fetch("https://script.google.com/macros/s/AKfycbxD7lWsPRdIWNz3tsMvrtwKYD33cvvSsT7a1oR0alchYXZnuzPqWXnOfgJTTP-mRAB9zA/exec", {
    method: "POST",
    mode: "no-cors", // Evita erro CORS (não permite resposta visível)
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  alert("Ficha enviada com sucesso!");
  form.reset();
});
document.getElementById("data-nascimento").addEventListener("input", function(e) {
  let value = e.target.value.replace(/\\D/g, '').slice(0, 8);
  if (value.length >= 5)
    e.target.value = value.replace(/(\\d{2})(\\d{2})(\\d{0,4})/, '$1/$2/$3');
  else if (value.length >= 3)
    e.target.value = value.replace(/(\\d{2})(\\d{0,2})/, '$1/$2');
});