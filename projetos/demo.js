"use strict";
const examples = {"chamados":{"action":"Registrar atualização","rows":[["CH-001","Diagnóstico de conectividade","Pendente"],["CH-002","Acompanhamento de reparo","Em tratativa"],["CH-003","Validação do serviço","Pendente"]]},"cancelamentos":{"action":"Simular consulta","rows":[["SRV-001","Serviço de exemplo A","A consultar"],["SRV-002","Serviço de exemplo B","A consultar"],["SRV-003","Serviço de exemplo C","A consultar"]]},"parceiros":{"action":"Revisar cadastro","rows":[["SP-001","Parceiro Exemplo São Paulo","Em revisão"],["MG-002","Parceiro Exemplo Minas","Em revisão"],["RJ-003","Parceiro Exemplo Rio","Revisado"]]},"mapa":{"action":"Concluir tarefa","rows":[["PRJ-001","Planejar site institucional","Em andamento"],["PRJ-002","Construir interface responsiva","Em andamento"],["PRJ-003","Revisar publicação","Em andamento"]]}};
const kind = document.body.dataset.demo;
const example = examples[kind];
let rows = example.rows.map(row => [...row]);
const list = document.getElementById("demo-list");
const search = document.getElementById("demo-search");
const status = document.getElementById("demo-status");
function render() {
  list.replaceChildren();
  const visible = rows.filter(row => row.join(" ").toLocaleLowerCase("pt-BR").includes(search.value.toLocaleLowerCase("pt-BR")));
  for (const row of visible) {
    const card = document.createElement("article");
    card.className = "demo-row";
    const label = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = row[1];
    const detail = document.createElement("p");
    detail.textContent = row[0] + " · " + row[2];
    label.append(title, detail);
    const button = document.createElement("button");
    button.className = "button button-secondary";
    button.type = "button";
    button.textContent = row[3] ? "Concluído" : example.action;
    button.disabled = Boolean(row[3]);
    button.setAttribute("aria-label", button.textContent + ": " + row[1]);
    button.addEventListener("click", () => {
      row[2] = kind === "chamados" ? "Atualizado agora" : kind === "cancelamentos" ? (row[0] === "SRV-002" ? "Migração simulada" : "Cancelamento simulado") : kind === "parceiros" ? "Revisado" : "Concluído";
      row[3] = true;
      status.textContent = row[0] + ": " + row[2] + ". Apenas esta demonstração foi alterada.";
      render();
      document.getElementById("demo-reset").focus({preventScroll:true});
    });
    card.append(label, button);
    list.append(card);
  }
  if (!visible.length) {
    const empty = document.createElement("p");
    empty.textContent = "Nenhum registro encontrado. Tente outro termo.";
    list.append(empty);
  }
}
search.addEventListener("input", render);
document.getElementById("demo-reset").addEventListener("click", () => {
  rows = example.rows.map(row => [...row]);
  search.value = "";
  status.textContent = "Demonstração reiniciada. 3 registros fictícios disponíveis.";
  render();
});
document.getElementById("demo-export").addEventListener("click", () => {
  const csv = "\uFEFFCódigo;Descrição;Status\r\n" + rows.map(row => row.slice(0,3).map(value => '"' + value.replaceAll('"', '""') + '"').join(";")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], {type:"text/csv;charset=utf-8"}));
  const link = document.createElement("a");
  link.href = url;
  link.download = kind + "-dados-ficticios.csv";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = "CSV com os registros fictícios preparado para download.";
});
render();
