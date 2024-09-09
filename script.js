const container = document.querySelector("#container")
const carrinhoQuantidade = document.querySelector("#carrinhoQuantidade")
const carrinhoIcone = document.querySelector("#carrinho img")

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

async function buscarRoupas() {
  try {
    const response = await fetch("https://fakestoreapi.com/products")
    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.status)
    }
    const dados = await response.json()

    dados.forEach((element) => {
      const card = document.createElement("div")
      card.className = "card"
      card.addEventListener("click", () => showDetails(element))

      const texto = document.createElement("p")
      texto.textContent = element.title
      texto.className = "texto"

      const imagem = document.createElement("img")
      imagem.src = element.image
      imagem.className = "imagem"

      const preco = document.createElement("h2")
      preco.textContent = `R$ ${element.price}`

      const botaoAdicionar = document.createElement("button")
      botaoAdicionar.textContent = "Comprar"
      botaoAdicionar.className = "botao-adicionar"
      botaoAdicionar.addEventListener("click", (event) => {
        event.stopPropagation()
        adicionarAoCarrinho(element)
      })

      card.append(texto, imagem, preco, botaoAdicionar)
      container.appendChild(card)
    })
  } catch (error) {
    console.log(error)
    container.textContent =
      "Erro ao abrir o site. Por favor, verifique a URL"
  }
}

function adicionarAoCarrinho(produto) {
  const produtoNoCarrinho = carrinho.find((item) => item.id === produto.id)

  if (produtoNoCarrinho) {
    produtoNoCarrinho.quantidade += 1
  } else {
    carrinho.push({ ...produto, quantidade: 1 })
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho))
  atualizarQuantidadeCarrinho()
}

function atualizarQuantidadeCarrinho() {
  const quantidade = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0)
  carrinhoQuantidade.textContent = quantidade
}

function showDetails(product) {
  const modal = document.createElement("div")
  modal.id = "productModal"
  modal.className = "modal"

  modal.innerHTML = `
        <div class="modal-content">
            <span class="close">×</span>
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${
    product.title
  }" class="modal-image">
            <p>${product.description || "Descrição não disponível"}</p>
            <h3>Preço: R$ ${product.price}</h3>
            <button class="botao-adicionar" id="addToCart">Adicionar ao Carrinho</button>
        </div>
    `
  document.body.appendChild(modal)

  const closeButton = modal.querySelector(".close")
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modal)
  })

  const addToCartButton = modal.querySelector("#addToCart")
  addToCartButton.addEventListener("click", () => {
    adicionarAoCarrinho(product)
    document.body.removeChild(modal)
  })

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      document.body.removeChild(modal)
    }
  })
}
carrinhoIcone.addEventListener("click", () => {
  window.location.href = "carrinho.html"
})

buscarRoupas()
atualizarQuantidadeCarrinho()