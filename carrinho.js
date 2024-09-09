document.addEventListener("DOMContentLoaded", () => {
  const carrinhoContainer = document.querySelector("#carrinhoContainer")
  const checkoutButton = document.querySelector("#checkoutButton")
  const backToShopButton = document.querySelector("#backToShopButton")

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

  function renderizarCarrinho() {
    if (carrinho.length === 0) {
      carrinhoContainer.innerHTML = `<p class="empty-message">Seu carrinho está vazio.</p>`
      checkoutButton.style.display = "none"
      return
    }
    carrinhoContainer.innerHTML = ""

    carrinho.forEach((item) => {
      const itemDiv = document.createElement("div")
      itemDiv.className = "item"

      const img = document.createElement("img")
      img.src = item.image || "path/to/default/image.jpg"
      img.alt = item.title

      const infoDiv = document.createElement("div")
      const title = document.createElement("h2")
      title.textContent = item.title
      const price = document.createElement("p")
      price.textContent = `R$ ${item.price.toFixed(2)}`
      const quantity = document.createElement("p")
      quantity.textContent = `Quantidade: ${item.quantidade}`

      infoDiv.append(title, price, quantity)

      const removeButton = document.createElement("button")
      removeButton.textContent = "Remover"
      removeButton.className = "remove-btn"
      removeButton.addEventListener("click", () => removerItem(item.id))

      itemDiv.append(img, infoDiv, removeButton)
      carrinhoContainer.appendChild(itemDiv)
    })

    checkoutButton.style.display = "block"
  }

  function removerItem(itemId) {
    carrinho = carrinho.filter((item) => item.id !== itemId)
    localStorage.setItem("carrinho", JSON.stringify(carrinho))
    renderizarCarrinho()
  }

  function finalizarCompra() {
    carrinho = []
    localStorage.setItem("carrinho", JSON.stringify(carrinho))

    carrinhoContainer.innerHTML = `<p class="empty-message">Obrigado pela sua compra!</p>`
    checkoutButton.style.display = "none"
    backToShopButton.style.display = "block"
  }

  checkoutButton.addEventListener("click", finalizarCompra)

  backToShopButton.addEventListener("click", () => {
    window.location.href = "index.html"
  })

  renderizarCarrinho()
})