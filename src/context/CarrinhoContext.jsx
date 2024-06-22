import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { carrinhoReducer } from "../reducers/carrinhoReducers";
export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "CarrinhoContext";

const valorInicial = []

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, dispatch] = useReducer(carrinhoReducer, valorInicial) 
  const [quantidade, setQuantidade] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  // Essa função foi passada pra cá porque aqui é o ponto global de variaveis da aplicação, como o hook useCarrinhoContext apenas está repassando funções do useReducer, então essa função não fazia mais sentido lá, então foi passada para cá ppor manipular essas variaveis de forma mais direta.

  const { quantidadeTemp, totalTemp } = useMemo(() => {
    return carrinho.reduce((ac, produto) => ({
      quantidadeTemp: ac.quantidadeTemp + produto.quantidade,
      totalTemp: ac.totalTemp + produto.preco * produto.quantidade,
    }),
      {
        quantidadeTemp: 0,
        totalTemp: 0,
      }
    );
  }, [carrinho])

  useEffect(() => {
    setQuantidade(quantidadeTemp)
    setValorTotal(totalTemp)
  })

  // value é o responsavel por guardar a props do contexto que serão utilizadas em outros componentes.
  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        dispatch,
        quantidade,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
