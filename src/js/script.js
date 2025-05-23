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

  fetch("https://script.google.com/macros/s/AKfycbxiecp4zRuQGuoOAQbAaaKGBQFE1_m-Cwx_cJwTHtzcd2qL6Zjd1tjTr9ZNAA3Zt4GVDw/exec", {
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
