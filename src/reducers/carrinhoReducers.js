export const ADD_PRODUTO = 'ADD_PRODUTO'
export const REMOVE_PRODUTO = 'REMOVE_PRODUTO'
export const UPDATE_QUANTIDADE = 'UPDATE_QUANTIDADE'

export const carrinhoReducer = (state, action) => {
    // State = variavel que esta sendo usada o hook useReducer
    // action.type = maneira de controlar o tipo de ação q será executada dentro da estrutura switch.
    // action.payload = parâmetro que será enviado na execução da função dentro de switch.

    switch (action.type) {
        case ADD_PRODUTO:
            const novoProduto = action.payload
            const produto = state.findIndex(item => item.id === novoProduto.id)
            if (produto === -1) {
                // Sempre devemos rertornar um novo state, não podemos mexer direntamente no state atual, por isso sempre q formos modificar o state atual nós não alteramos ele diretamente e sim, substituimos ele por um novo usando o return.
                return [...state, { ...novoProduto, quantidade: 1 }]
            } else {
                // retornando item usando ternário: a cada item, verifique se o index do item percorrido é igual ao valor da variavel produto, que lá em cima recebe o index do produto atual caso ele exista, se sim "?" retorne {...item, acesse a quantidade desse item "quantidade:", e a modifique para quantidade atual + 1} se não for o mesmo id ":" apenas retorne o item do jeito q está.
                return state.map((item, index) => index === produto
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
                )
            }

        case REMOVE_PRODUTO:
            const produtoId = action.payload
            return state.filter(item => item.id !== produtoId)

        case UPDATE_QUANTIDADE:
            const { produtoId: id, quantidade } = action.payload
            return state.map(item => item.id === id
                ? { ...item, quantidade: quantidade } 
                : item
            )

        default:
            state
    }
} 