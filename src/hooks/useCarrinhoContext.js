// Criando um hook customizado para exportar funções de codigos complexos.
import { useContext } from "react"
import { CarrinhoContext } from "../context/CarrinhoContext"
import { ADD_PRODUTO, REMOVE_PRODUTO, UPDATE_QUANTIDADE } from "../reducers/carrinhoReducers"

// Aqui ficará todas as funções relacionadas ao carrinho, após importar o CarrinhoContext nós podemos manipular essa variavel de diversas formas através de funções.
export const useCarrinhoContext = () => {
  const { carrinho,
    dispatch,
    quantidade,
    valorTotal
  } = useContext(CarrinhoContext)

  const addProdutoAction = (novoProduto) => ({
    type: ADD_PRODUTO,
    payload: novoProduto
  })

  const removeProdutoAction = (produtoId) => ({
    type: REMOVE_PRODUTO,
    payload: produtoId
  })

  const updateQuantidadeAction = (produtoId, quantidade) => ({
    type: UPDATE_QUANTIDADE,
    payload: { produtoId, quantidade }
  })

  function adicionarProduto(novoProduto) {
    dispatch(addProdutoAction(novoProduto))
  }

  function removerProduto(id) {
    const produto = carrinho.find(item => item.id === id)
    
    if (produto && produto.quantidade > 1) {
      dispatch(updateQuantidadeAction(id, produto.quantidade - 1))
    } else {
      dispatch(removeProdutoAction(id))
    }
  }

  function removerProdutoCarrinho(id) {
    dispatch(removeProdutoAction(id))
  }

  return {
    carrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
    valorTotal,
    quantidade
  }
}