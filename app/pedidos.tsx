import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Pressable, Modal, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Link, router } from "expo-router";

export default function Pedidos() {
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("tudo");
  const [itensFiltrados, setItensFiltrados] = useState<any[]>([]);
  const [contadores, setContadores] = useState<{[key: number]: number}>({});
  
  const categorias = [
    { id: "tudo", nome: "Tudo" },
    { id: "pizzas", nome: "Pizzas" },
    { id: "bebidas", nome: "Bebidas" },
    { id: "sobremesas", nome: "Sobremesas" }
  ];

  const produtos = {
    pizzas: [
      { id: 1, nome: 'Calabresa', preco: 30.0, categoria: 'pizzas', descricao: 'Queijo, calabresa e cebola', imagem: require('../assets/images/calabresa.jpg') },
      { id: 2, nome: 'Portuguesa', preco: 35.0, categoria: 'pizzas', descricao: 'Presunto, queijo, ervilha e ovos', imagem: require('../assets/images/portuguesa.jpg') },
      { id: 5, nome: 'Margherita', preco: 32.0, categoria: 'pizzas', descricao: 'Queijo, tomate e manjericão', imagem: require('../assets/images/calabresa.jpg') }
    ],
    bebidas: [
      { id: 3, nome: 'Coca-Cola', preco: 5.0, categoria: 'bebidas', descricao: 'Refrigerante 350ml', imagem: require('../assets/images/coca-cola.png') },
      { id: 4, nome: 'Guaraná', preco: 5.0, categoria: 'bebidas', descricao: 'Refrigerante 350ml', imagem: require('../assets/images/guaraba.jpg') },
      { id: 6, nome: 'Suco Natural', preco: 7.0, categoria: 'bebidas', descricao: 'Suco de laranja 300ml', imagem: require('../assets/images/coca-cola.png') }
    ],
    sobremesas: [
      { id: 7, nome: 'Pudim', preco: 8.0, categoria: 'sobremesas', descricao: 'Pudim de leite condensado', imagem: require('../assets/images/portuguesa.jpg') },
      { id: 8, nome: 'Sorvete', preco: 6.0, categoria: 'sobremesas', descricao: 'Bola de sorvete de chocolate', imagem: require('../assets/images/calabresa.jpg') }
    ]
  };


  const todosProdutos = [...produtos.pizzas, ...produtos.bebidas, ...produtos.sobremesas];

  useEffect(() => {
    filtrarItens();
  }, [pesquisa, categoriaSelecionada]);

  const filtrarItens = () => {
    let itensFiltrados = [...todosProdutos];
    
    
    if (categoriaSelecionada !== "tudo") {
      itensFiltrados = itensFiltrados.filter(item => item.categoria === categoriaSelecionada);
    }
    
 
    if (pesquisa.trim() !== "") {
      itensFiltrados = itensFiltrados.filter(item => 
        item.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        item.descricao.toLowerCase().includes(pesquisa.toLowerCase())
      );
    }
    
    setItensFiltrados(itensFiltrados);
  };

  const adicionarAoCarrinho = (item: any) => {
    setCarrinho((prevCarrinho) => [...prevCarrinho, item]);
    
   
    setContadores(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const removerDoCarrinho = (id: number) => {
    const index = carrinho.findIndex(item => item.id === id);
    if (index !== -1) {
      const novoCarrinho = [...carrinho];
      novoCarrinho.splice(index, 1);
      setCarrinho(novoCarrinho);
      
    
      if (contadores[id] > 0) {
        setContadores(prev => ({
          ...prev,
          [id]: prev[id] - 1
        }));
      }
    }
  };
  
  const limparCarrinho = () => {
    setCarrinho([]);
    setContadores({});
  };

  const removerTodosDoTipo = (id: number) => {
    
    const novoCarrinho = carrinho.filter(item => item.id !== id);
    setCarrinho(novoCarrinho);
    
  
    setContadores(prev => ({
      ...prev,
      [id]: 0
    }));
  };

  const renderItem = ({ item }: { item: any }) => {
    const quantidade = contadores[item.id] || 0;
    
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => adicionarAoCarrinho(item)}
      >
        <Image source={item.imagem} style={styles.image} />
        <View style={styles.itemInfo}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.descricao}>{item.descricao}</Text>
          <Text style={styles.preco}>R${item.preco.toFixed(2)}</Text>
        </View>
        {quantidade > 0 && (
          <View style={styles.contadorContainer}>
            <Text style={styles.contadorTexto}>{quantidade}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderCategoriaItem = ({ item }: { item: any }) => {
    const isSelected = categoriaSelecionada === item.id;
    
    return (
      <TouchableOpacity
        style={[styles.categoriaItem, isSelected ? styles.categoriaSelecionada : null]}
        onPress={() => setCategoriaSelecionada(item.id)}
      >
        <Text style={[styles.categoriaTexto, isSelected ? styles.categoriaTextoSelecionado : null]}>
          {item.nome}
        </Text>
      </TouchableOpacity>
    );
  };

  const calcularTotalCarrinho = () => {
    return carrinho.reduce((total, item) => total + item.preco, 0).toFixed(2);
  };
  
  const sair = () => {
    
    router.replace('/login');
  };

  const renderItemCarrinho = ({ item, index }: { item: any, index: number }) => {
   
    const itemsCount = carrinho.filter(cartItem => cartItem.id === item.id).length;
    
    
    const firstIndex = carrinho.findIndex(cartItem => cartItem.id === item.id);
    
    
    if (index === firstIndex) {
      return (
        <View style={styles.itemCarrinho}>
          <Image source={item.imagem} style={styles.imageCarrinho} />
          <View style={styles.itemCarrinhoInfo}>
            <Text style={styles.itemCarrinhoNome}>{item.nome}</Text>
            <Text style={styles.itemCarrinhoPreco}>
              R${item.preco.toFixed(2)} x {itemsCount} = R${(item.preco * itemsCount).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.botaoRemover}
            onPress={() => removerTodosDoTipo(item.id)}
          >
            <Text style={styles.botaoRemoverTexto}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  
  const agruparItensCarrinho = () => {
    const itemIds = new Set(carrinho.map(item => item.id));
    return Array.from(itemIds).map(id => 
      carrinho.find(item => item.id === id)
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/fundo.jpeg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logotipo.png')}
        />
      </View>
      
      <View style={styles.pesquisaContainer}>
        <TextInput
          style={styles.inputPesquisa}
          placeholder="Buscar..."
          value={pesquisa}
          onChangeText={setPesquisa}
          placeholderTextColor="gray"
        />
      </View>
      
      <FlatList
        horizontal
        data={categorias}
        renderItem={renderCategoriaItem}
        keyExtractor={(item) => item.id}
        style={styles.categoriasList}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.contentContainer}>
        <FlatList
          data={itensFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <Text style={styles.title}>Cardápio</Text>
          )}
          style={styles.itemPedido}
        />
      </View>

      <Pressable
        style={styles.botaoCarrinho}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.botaoTexto}>Ver Carrinho ({carrinho.length})</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seu Pedido</Text>
            
            {carrinho.length === 0 ? (
              <View style={styles.carrinhoVazio}>
                <Text style={styles.carrinhoVazioTexto}>Seu carrinho está vazio</Text>
                <Text style={styles.carrinhoVazioSubTexto}>Adicione itens para fazer seu pedido</Text>
              </View>
            ) : (
              <FlatList
                data={agruparItensCarrinho()}
                renderItem={({ item, index }) => (
                  <View style={styles.itemCarrinho}>
                    <Image source={item.imagem} style={styles.imageCarrinho} />
                    <View style={styles.itemCarrinhoInfo}>
                      <Text style={styles.itemCarrinhoNome}>{item.nome}</Text>
                      <View style={styles.quantidadeContainer}>
                        <Text style={styles.itemCarrinhoPreco}>
                          R${item.preco.toFixed(2)}
                        </Text>
                        <View style={styles.controlesQuantidade}>
                          <TouchableOpacity 
                            style={styles.botaoQuantidade}
                            onPress={() => removerDoCarrinho(item.id)}
                          >
                            <Text style={styles.botaoQuantidadeTexto}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.quantidadeTexto}>{contadores[item.id]}</Text>
                          <TouchableOpacity 
                            style={styles.botaoQuantidade}
                            onPress={() => adicionarAoCarrinho(item)}
                          >
                            <Text style={styles.botaoQuantidadeTexto}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.botaoRemover}
                      onPress={() => removerTodosDoTipo(item.id)}
                    >
                      <Text style={styles.botaoRemoverTexto}>X</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
            
            <View style={styles.totalContainer}>
              <Text style={styles.totalTexto}>Total:</Text>
              <Text style={styles.totalValor}>R${calcularTotalCarrinho()}</Text>
            </View>
            
            <View style={styles.botoesModal}>
              <Pressable
                style={styles.botaoFecharModal}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.botaoTexto}>Voltar</Text>
              </Pressable>
              
              <Pressable
                style={[styles.botaoFinalizarCompra, carrinho.length === 0 ? styles.botaoDesabilitado : null]}
                onPress={() => {
                  if (carrinho.length > 0) {
                    alert("Pedido finalizado com sucesso!");
                    limparCarrinho();
                    setModalVisible(false);
                  }
                }}
                disabled={carrinho.length === 0}
              >
                <Text style={styles.botaoTexto}>Finalizar Pedido</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable style={styles.botaoSair} onPress={sair}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Sair</Text>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  logoContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  pesquisaContainer: {
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 10,
  },
  inputPesquisa: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  categoriasList: {
    maxHeight: 50,
    marginBottom: 10,
  },
  categoriaItem: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    minWidth: 80,
    alignItems: 'center',
  },
  categoriaSelecionada: {
    backgroundColor: '#FF4500',
  },
  categoriaTexto: {
    fontWeight: 'bold',
    color: '#333',
  },
  categoriaTextoSelecionado: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  itemPedido: {
    backgroundColor: 'rgba(34, 1, 1, 0.8)',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    position: 'relative', 
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  nome: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  descricao: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 5,
  },
  preco: {
    fontSize: 16,
    color: '#FF4500',
    fontWeight: 'bold',
    marginTop: 5,
  },
  contadorContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FF4500',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contadorTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  botaoCarrinho: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  carrinhoVazio: {
    alignItems: 'center',
    padding: 30,
  },
  carrinhoVazioTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  carrinhoVazioSubTexto: {
    fontSize: 14,
    color: 'gray',
  },
  itemCarrinho: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imageCarrinho: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemCarrinhoInfo: {
    flex: 1,
    marginLeft: 10,
  },
  itemCarrinhoNome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemCarrinhoPreco: {
    fontSize: 14,
    color: '#FF4500',
    marginTop: 5,
  },
  botaoRemover: {
    backgroundColor: '#f0f0f0',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoRemoverTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  quantidadeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  controlesQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    overflow: 'hidden',
  },
  botaoQuantidade: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  botaoQuantidadeTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantidadeTexto: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  botoesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  botaoFecharModal: {
    backgroundColor: '#999',
    padding: 12,
    borderRadius: 8,
    width: '48%',
  },
  botaoFinalizarCompra: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    width: '48%',
  },
  botaoDesabilitado: {
    backgroundColor: '#95c9a0',
  },
  botaoSair: {
    backgroundColor: "red",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    alignItems: 'center',
  }
});