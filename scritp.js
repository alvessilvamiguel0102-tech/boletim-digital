// DADOS BRUTOS FICTÍCIOS — 8º ANO
const dadosDisciplinas = [
  { disciplina: "Língua Portuguesa", tri1: 82, tri2: "7,8", tri3: 85, faltas: [2, 1, 1] },
  { disciplina: "Matemática", tri1: 52, tri2: "5,8", tri3: null, faltas: [3, 2, 1] },
  { disciplina: "Ciências", tri1: "8,1", tri2: 76, tri3: 8.0, faltas: [1, 2, 0] },
  { disciplina: "História", tri1: 7.0, tri2: 84, tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Geografia", tri1: 68, tri2: 7.3, tri3: "7,9", faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa", tri1: 86, tri2: "8,1", tri3: 8.7, faltas: [1, 0, 0] },
  { disciplina: "Arte", tri1: 9.0, tri2: 92, tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Educação Física", tri1: 95, tri2: 9.0, tri3: "9,4", faltas: [0, 1, 0] },
  { disciplina: "Educação Digital", tri1: 88, tri2: 9.1, tri3: 93, faltas: [1, 0, 1] },
  { disciplina: "Educação Financeira", tri1: 74, tri2: "7,8", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Estudo Orientado", tri1: 8.0, tri2: 83, tri3: "8,5", faltas: [0, 1, 0] },
  { disciplina: "Redação e Leitura", tri1: 62, tri2: "6,8", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico", tri1: 48, tri2: 5.6, tri3: "6,0", faltas: [2, 2, 1] },
  { disciplina: "Literatura Arte e Movimento", tri1: "7,7", tri2: 80, tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Práticas Experimentais", tri1: 58, tri2: "6,2", tri3: 6.4, faltas: [1, 1, 1] }
];

// FUNÇÃO PARA NORMALIZAR NOTAS (Escala 0 a 10)
function normalizarNota(valor) {
  // Trata notas ausentes
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  // Converte vírgula para ponto se for string
  let valTexto = String(valor).replace(',', '.');
  let num = parseFloat(valTexto);

  // Se não for um número válido, descarta
  if (isNaN(num)) {
    return null;
  }

  // Ajusta valores na escala 0-100 para 0-10
  if (num > 10 && num <= 100) {
    num = num / 10;
  }

  // Valida se ficou dentro do limite de 0 a 10
  if (num >= 0 && num <= 10) {
    return num;
  }

  return null;
}

// FUNÇÃO PARA RENDERIZAR O BOLETIM NA TELA (DOM)
function processarBoletim() {
  const tbody = document.getElementById('tabela-boletim');
  tbody.innerHTML = '';

  let somaMediasGerais = 0;
  let qtdDisciplinasComMedia = 0;
  let totalFaltasGeral = 0;
  let qtdBomDesempenho = 0;
  let qtdAtencao = 0;

  // NOTA SOBRE A FREQUÊNCIA:
  // A frequência exibida no card (92%) é apenas DEMONSTRATIVA/FICTÍCIA para esta fase inicial.
  // Ela não é calculada a partir do total de faltas.

  dadosDisciplinas.forEach((item) => {
    // Normaliza notas dos 3 trimestres
    const n1 = normalizarNota(item.tri1);
    const n2 = normalizarNota(item.tri2);
    const n3 = normalizarNota(item.tri3);

    // Calcula soma das faltas
    const totalFaltasDisc = item.faltas.reduce((acc, f) => acc + f, 0);
    totalFaltasGeral += totalFaltasDisc;

    // Calcula média considerando apenas notas válidas
    const notasValidas = [n1, n2, n3].filter(n => n !== null);
    let media = null;
    let situacao = "Nota ainda não disponível";
    let classeSituacao = "situacao-indisponivel";

    if (notasValidas.length > 0) {
      const soma = notasValidas.reduce((acc, n) => acc + n, 0);
      media = soma / notasValidas.length;
      
      somaMediasGerais += media;
      qtdDisciplinasComMedia++;

      if (media >= 6.0) {
        situacao = "Bom desempenho";
        classeSituacao = "situacao-bom";
        qtdBomDesempenho++;
      } else {
        situacao = "Atenção";
        classeSituacao = "situacao-atencao";
        qtdAtencao++;
      }
    }

    // Formata exibição na tabela
    const formatarNota = (n) => (n !== null ? n.toFixed(1).replace('.', ',') : "—");
    const txtMedia = media !== null ? media.toFixed(1).replace('.', ',') : "—";

    // Cria a linha da tabela no HTML
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.disciplina}</td>
      <td>${formatarNota(n1)}</td>
      <td>${formatarNota(n2)}</td>
      <td>${formatarNota(n3)}</td>
      <td><strong>${txtMedia}</strong></td>
      <td>${totalFaltasDisc}</td>
      <td class="${classeSituacao}">${situacao}</td>
    `;
    tbody.appendChild(tr);
  });

  // Atualiza os cards de resumo
  const mediaGeralGeral = qtdDisciplinasComMedia > 0 ? (somaMediasGerais / qtdDisciplinasComMedia).toFixed(1).replace('.', ',') : "—";
  
  document.getElementById('media-geral').innerText = mediaGeralGeral;
  document.getElementById('total-faltas').innerText = totalFaltasGeral;
  document.getElementById('qtd-bom-desempenho').innerText = qtdBomDesempenho;
  document.getElementById('qtd-atencao').innerText = qtdAtencao;
}

// Executa a função assim que a página carrega
window.onload = processarBoletim;